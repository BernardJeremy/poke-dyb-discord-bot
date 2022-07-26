const pokemon = require('./pokemon');
const help = require('./help');

const commands = {
  pokemon,
};

module.exports = {
  ...commands,
  help: help(commands),
};
