const pokemon = require('./pokemon');
const journa = require('./journa');
const help = require('./help');

const commands = {
  pokemon,
  journa,
};

module.exports = {
  ...commands,
  help: help(commands),
};
