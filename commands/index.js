const pokemon = require('./pokemon');
const journa = require('./journa');
const bonus = require('./bonus');
const profil = require('./profil');
const craft = require('./craft');
const help = require('./help');

const commands = {
  pokemon,
  journa,
  bonus,
  profil,
  craft,
};

module.exports = {
  ...commands,
  help: help(commands),
};
