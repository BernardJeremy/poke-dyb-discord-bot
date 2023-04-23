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
import ban from './ban';
import unban from './unban';
import livedex from './livedex';
import optihv from './optihv';
import dezalldouble from './dezalldouble';
import offering from './offering';

const commands = [
  pokemon,
  journa,
  bonus,
  profil,
  craft,
  invoc,
  dez,
  dezalldouble,
  offering,
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
  ban,
  unban,
  livedex,
  optihv,
];

commands.push(help(commands));

export default commands;
