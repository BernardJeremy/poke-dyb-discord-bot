interface DiscordUserData {
  id: string,
  username: string,
  nickname?: string,
}

interface MessageContext {
  author: DiscordUserData,
  content: string,
  command: string,
  args: string[],
  mentions: DiscordUserData[],
}
