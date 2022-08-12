import { Message } from 'discord.js';
import Command from '../types/command.types';

export default (commands: Command[]) => ({
  name: '!help',
  alias: '!aide',

  description: 'Affiche cette aide',

  async execute(msg: Message) {
    let commandsListStr = '';

    commands.forEach((command) => {
      commandsListStr += !command.noHelp ? `\n**${command.format || command.name}** : ${command.description}` : '';
    });

    msg.channel.send(commandsListStr);
  },
});
