import pokemon from './pokemon';
import journa from './journa';
import bonus from './bonus';
import profil from './profil';
import craft from './craft';
import invoc from './invoc';
import dez from './dez';
import hv from './hv';
import trade from './trade';
import help from './help';
import admin from './admin';
import gdoc from './gdoc';
import claim from './claim';
import sendgift from './sendgift';
import tower from './tower';
import stats from './stats';
import safari from './safari';
import ratio from './ratio';

const commands = [
  pokemon,
  journa,
  bonus,
  profil,
  craft,
  invoc,
  dez,
  hv,
  trade,
  claim,
  tower,
  admin,
  sendgift,
  gdoc,
  stats,
  safari,
  ratio,
];

commands.push(help(commands));

export default commands;
