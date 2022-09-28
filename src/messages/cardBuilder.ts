import {
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
  HexColorString,
  MessageActionRowComponentBuilder,
} from 'discord.js';
import * as userModel from '../models/users';
import DisplayTypes from '../types/display.enum';
import { InvocationActionTypes } from '../types/invocation.types';
import { SafariEncounterData } from '../types/safari.types';

const { DUST_EMOJI_ID } = process.env;

const iconByRarity = (rarityLevel: number): string => {
  if (rarityLevel <= 10) {
    return 'https://www.pokepedia.fr/images/a/ab/Master_Ball-PGL.png';
  }

  if (rarityLevel <= 30) {
    return 'https://www.pokepedia.fr/images/3/36/Hyper_Ball-PGL.png';
  }

  if (rarityLevel <= 60) {
    return 'https://www.pokepedia.fr/images/b/bf/Super_Ball-PGL.png';
  }

  return 'https://www.pokepedia.fr/images/f/fa/Pok%C3%A9_Ball-PGL.png';
};

const getIconUrl = (displayType: DisplayTypes, rarityLevel: number): string => {
  switch (displayType) {
    case DisplayTypes.PokemonInfo:
      return 'https://www.supersoluce.com/sites/default/files/styles/picto_soluce/interrogation.png';
    case DisplayTypes.SafariEncounter:
      return 'https://www.pokepedia.fr/images/6/61/Safari_Ball-PGL.png';
    default:
      return iconByRarity(rarityLevel);
  }
};

const buildCard = ({
  name,
  id,
  types,
  color,
  rarityLevel,
  craftingPrice,
}: Pokemon, {
  displayType,
  safariEncounterData,
  content,
}: {
  displayType: DisplayTypes,
  safariEncounterData?: SafariEncounterData,
  content?: string,
}) => {
  const padId = (nbr: number) => String(nbr).padStart(3, '0');

  const exampleEmbed = new EmbedBuilder()
    .setColor(color as HexColorString)
    .setTitle(name)
    .setAuthor(
      {
        name: `#${id}`,
        iconURL: getIconUrl(displayType, rarityLevel),
      },
    )
    .setThumbnail(`https://raw.githubusercontent.com/BernardJeremy/pokemon.json/master/thumbnails/${padId(id)}.png`)
    .setFooter({ text: name, iconURL: `https://raw.githubusercontent.com/BernardJeremy/pokemon.json/master/sprites/${padId(id)}MS.png` });

  const priceStr = craftingPrice < 0 ? '-' : `${craftingPrice} ${DUST_EMOJI_ID}`;

  exampleEmbed.addFields(
    { name: 'Type', value: types.join('/'), inline: true },
    { name: 'Rareté', value: `${rarityLevel}%`, inline: true },
    { name: 'Craft', value: priceStr, inline: true },
  );

  if (displayType === DisplayTypes.PokemonInfo) {
    const allUsers = userModel.getAllUsers();
    const playerListWithIt = allUsers.filter((user) => user.pokedex.includes(id));
    const playerListWithoutIt = allUsers.filter(
      (user) => !user.pokedex.includes(id),
    );

    if (playerListWithIt.length > 0) {
      exampleEmbed.addFields(
        {
          name: 'Possédé par',
          value: playerListWithIt.map((user) => {
            const playerName = user.nickname || user.username;
            const nbr = user.pokedex.filter((currentId) => currentId === id).length;

            return `${playerName}${nbr > 1 ? ` (${nbr})` : ''}`;
          }).join(' / '),
        },
      );
    }

    if (
      (playerListWithIt.length > 5 && playerListWithoutIt.length > 0)
      || (playerListWithoutIt.length > 5)
    ) {
      exampleEmbed.addFields(
        {
          name: 'Recherché par',
          value: playerListWithoutIt.map((user) => user.nickname || user.username).join(' / '),
        },
      );
    }
  }

  if (displayType === DisplayTypes.SafariEncounter && safariEncounterData) {
    exampleEmbed.addFields(
      {
        name: 'Taux de capture',
        value: `${safariEncounterData.captureRate} %`,
      },
      {
        name: 'Chance de fuite',
        value: `${safariEncounterData.escapeRate} %`,
      },
    );
  }

  if (displayType === DisplayTypes.Invocation) {
    const buttons = new ActionRowBuilder<MessageActionRowComponentBuilder>().addComponents(
      new ButtonBuilder()
        .setCustomId(InvocationActionTypes.KEEP)
        .setLabel('Garder')
        .setStyle(ButtonStyle.Success),
    ).addComponents(
      new ButtonBuilder()
        .setCustomId(InvocationActionTypes.REROLL)
        .setLabel('Re-Roll')
        .setStyle(ButtonStyle.Danger),
    );

    return { content: content || '', embeds: [exampleEmbed], components: [buttons] };
  }

  return { content: content || '', embeds: [exampleEmbed], components: [] };
};

export default buildCard;
