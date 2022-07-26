require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

const buildCard = require('./messages/cardBuilder');
const pokedex = require('./data/pokedex.json');

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

  const TOKEN = process.env.BOT_TOKEN;

  client.login(TOKEN);

  client.once('ready', () => {
    console.info(`Logged in as ${client.user.tag}`);
  });

  client.on('messageCreate', (message) => {
    if (message.author.bot) {
      return;
    }

    message.reply(buildCard(pokedex.at(149)));
  });
};

main();
