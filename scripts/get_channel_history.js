/* eslint-disable no-await-in-loop */
const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');

const JSON_FILE_PATH = './message_history.json';
const TOKEN = 'MTAwMTA5NTM2MzAxNDQzMDgzMA.GDdogd._yyDg33J8RdMEK-o34rdDypCZ5IVY5As9e0Z5k';
const CHANNEL_ID = '1009034732497018981'; // SAFARI
// const CHANNEL_ID = '1007326599290556456'; // TOUR
// const CHANNEL_ID = '1002136256337158184'; // INVOC

const client = new Client(
  {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ],
  },
);

const fetchBatchMessage = async ({ limit, beforeMessageId }) => {
  const channel = client.channels.cache.get(CHANNEL_ID);

  const messages = await channel.messages
    .fetch({ limit, before: beforeMessageId })
    .then((fetchedMessages) => [...fetchedMessages.values()]);

  return { messages, lastMessage: messages.length ? messages.at(messages.length - 1) : null };
};

const main = async () => {
  const channel = client.channels.cache.get(CHANNEL_ID);
  let messagesList = [];
  let lastMessage = await channel.messages
    .fetch({ limit: 1 })
    .then((messagePage) => (messagePage.size === 1 ? messagePage.at(0) : null));

  let lastMessageDate = new Date(lastMessage.createdTimestamp);
  let flag = true;
  let i = 0;
  while (flag) {
    const currentBatchData = await fetchBatchMessage({
      limit: 100,
      beforeMessageId: lastMessage.id,
    });

    if (!currentBatchData.lastMessage) {
      flag = false;
    } else {
      lastMessage = currentBatchData.lastMessage;
      lastMessageDate = new Date(lastMessage.createdTimestamp);
      messagesList = [
        ...messagesList,
        ...currentBatchData.messages,
      ];

      i += 1;
      console.log(`Page #${i} done (Last message from ${lastMessageDate.toString()})`);
    }
  }
  console.log(`All messages retrieved (${i} pages)`);

  /* const json = JSON.stringify(messagesList.filter((message) => (
    (message.content.includes('!invoc') && !message.author.bot)
    || (message.content.includes('invoqué') && message.author.bot)
  ))); */

  /* const json = JSON.stringify(messagesList.filter((message) => (
    (message.content === '!tour' && !message.author.bot)
    || (message.content.includes('300') && message.author.bot)
  ))); */

  const json = JSON.stringify(messagesList.filter((message) => (
    (message.content === '!safari' && !message.author.bot)
    || (message.content.includes('réussi à attraper') && message.author.bot)
  )));

  fs.writeFileSync(JSON_FILE_PATH, json);
  process.exit(0);
};

client.login(TOKEN);

client.once('ready', () => {
  console.info(`Logged in as ${client?.user?.tag}`);

  main();
  // fetchAllMessages();
});
