const pokemon = require('./pokemon');
const journa = require('./journa');
const bonus = require('./bonus');
const profil = require('./profil');
const craft = require('./craft');
const invoc = require('./invoc');
const dez = require('./dez');
const hv = require('./hv');
const trade = require('./trade');
const help = require('./help');
const admin = require('./admin');
const gdoc = require('./gdoc');

const commands = {
  pokemon,
  journa,
  bonus,
  profil,
  craft,
  invoc,
  dez,
  hv,
  trade,
  admin,
  gdoc,
};

module.exports = {
  ...commands,
  help: help(commands),
};
