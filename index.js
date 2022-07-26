require('dotenv').config();

const { Client, Collection, GatewayIntentBits } = require('discord.js');

const botCommands = require('./commands');
const messageParser = require('./messages/messageParser');

const main = async () => {
  const client = new Client(
    {
      intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
      ],
    },
  );

  client.commands = new Collection();
  Object.keys(botCommands).map(
    (key) => client.commands.set(botCommands[key].name, botCommands[key]),
  );

  const TOKEN = process.env.BOT_TOKEN;

  client.login(TOKEN);

  client.once('ready', () => {
    console.info(`Logged in as ${client.user.tag}`);
  });

  client.on('messageCreate', (message) => {
    if (message.author.bot) {
      return;
    }
    const messageContext = messageParser(message);
    if (!client.commands.has(messageContext.command)) {
      return;
    }

    try {
      client.commands.get(messageContext.command).execute(message, messageContext);
    } catch (error) {
      console.error(`There was an error trying to execute command : ${messageContext.command}`);
      console.error(error);
      client.reply(`There was an error trying to execute command : ${messageContext.command}`);
    }
  });
};

main();
