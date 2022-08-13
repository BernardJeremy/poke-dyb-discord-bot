/* eslint-disable import/first */
import * as dotenv from 'dotenv';

dotenv.config();

import { Client, GatewayIntentBits } from 'discord.js';

import expressApp from './libs/express';
import setupHttpRoutes from './controllers/routes';

import * as usersModel from './models/users';
import botCommands from './commands';
import messageParser from './messages/messageParser';
import Command from './types/command.types';

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

  client.on('messageCreate', (message) => {
    if (message.author.bot) {
      return;
    }

    const messageContext = messageParser(message);

    const user = usersModel.getOneUser(messageContext.author.id);
    if (!user) {
      usersModel.createUser(messageContext.author);
    }

    if (!commands[messageContext.command]) {
      return;
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
