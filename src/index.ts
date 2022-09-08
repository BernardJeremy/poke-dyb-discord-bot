/* eslint-disable import/first */
import * as dotenv from 'dotenv';

dotenv.config();

import { ChannelType, Client, GatewayIntentBits } from 'discord.js';

import expressApp from './libs/express';
import setupHttpRoutes from './controllers/routes';

import * as usersModel from './models/users';
import botCommands from './commands';
import messageParser from './messages/messageParser';
import updateDataForUser from './store/dbUpdater';

import Command from './types/command.types';
import handleButtonInteractions from './interactions';

const main = async () => {
  setupHttpRoutes(expressApp);

  const client = new Client(
    {
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    },
  );

  const commands = botCommands.reduce((acc: any, curr: Command) => {
    acc[curr.name] = curr;

    if (curr.alias) {
      acc[curr.alias] = curr;
    }

    return acc;
  }, {});

  const TOKEN = process.env.BOT_TOKEN;

  client.login(TOKEN);

  client.once('ready', () => {
    console.info(`Logged in as ${client?.user?.tag}`);
  });

  client.on('interactionCreate', (interaction) => {
    handleButtonInteractions(interaction);
  });

  client.on('messageCreate', (message) => {
    if (message.author.bot) {
      return;
    }

    const messageContext = messageParser(message);

    let user = usersModel.getOneUser(messageContext.author.id);
    if (!user || user.isBan) {
      return;
    }
    user = updateDataForUser(user);

    const currentCommandObj: Command = commands[messageContext.command];
    if (!currentCommandObj) {
      return;
    }

    if (message.channel.type === ChannelType.GuildText && !user?.isAdmin) {
      if (
        currentCommandObj.allowedChannels
        && !currentCommandObj.allowedChannels.includes(message.channel.name)
      ) {
        message.reply('Cette commande ne peut pas être exécutée dans ce channel');
        return;
      }
    }

    try {
      commands[messageContext.command].execute(message, messageContext);
    } catch (error) {
      console.error(`There was an error trying to execute command : ${messageContext.command}`);
      console.error(error);
    }
  });
};

main();
