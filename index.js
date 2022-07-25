require('dotenv').config();

const { Client, GatewayIntentBits } = require('discord.js');

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
    console.log(message.content);
  });
};

main();
