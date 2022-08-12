import { Message } from 'discord.js';

const getUserDataRow = (
  msg: Message,
  userIdentifier: string,
) => msg.guild?.members.cache.get(userIdentifier)
  || msg.guild?.members.cache.find(
    (m) => m.user.tag.toLowerCase() === userIdentifier.toLowerCase(),
  )
  || msg.guild?.members.cache.find(
    (m) => m.nickname?.toLowerCase() === userIdentifier.toLowerCase(),
  );

const getUserData = (msg: Message, userId: string) => {
  const userData = getUserDataRow(msg, userId);

  return {
    id: userData?.user.id || '',
    username: userData?.user.username || '',
    nickname: userData?.nickname || '',
  };
};

export default (msg: Message): MessageContext => ({
  author: getUserData(msg, msg.author.id),
  content: msg.content,
  command: msg.content?.split(/ +/)?.shift()?.toLowerCase() || '',
  args: msg.content.split(/ +/).filter((_, i) => i > 0),
  mentions: msg.mentions.users.filter(
    (mentionedUser) => !mentionedUser.bot,
  ).map(
    (mentionedUser) => getUserData(msg, mentionedUser.id),
  ),
});
