module.exports = (commands) => ({
  name: '!help',

  description: 'Affiche cette aide',

  execute(msg) {
    let commandsList = '';

    // eslint-disable-next-line no-restricted-syntax
    for (const [, value] of Object.entries(commands)) {
      commandsList += !value.noHelp ? `\n**${value.format || value.name}** : ${value.description}` : '';
    }

    msg.channel.send(commandsList);
  },
});
