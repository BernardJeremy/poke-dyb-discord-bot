const pokemon = require('./pokemon');
const journa = require('./journa');
const bonus = require('./bonus');
const help = require('./help');

const commands = {
  pokemon,
  journa,
  bonus,
};

module.exports = {
  ...commands,
  help: help(commands),
};
