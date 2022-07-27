const pokemon = require('./pokemon');
const journa = require('./journa');
const bonus = require('./bonus');
const profil = require('./profil');
const help = require('./help');

const commands = {
  pokemon,
  journa,
  bonus,
  profil,
};

module.exports = {
  ...commands,
  help: help(commands),
};
