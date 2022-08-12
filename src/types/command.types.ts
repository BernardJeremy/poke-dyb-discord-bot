import { Message } from 'discord.js';

interface ExecuteFunc {
  (message: Message, messageContext: MessageContext): Promise<void>;
}

export default interface Command {
  name: string,
  description: string,
  alias?: string,
  format?: string
  noHelp?: boolean
  execute: ExecuteFunc
}
