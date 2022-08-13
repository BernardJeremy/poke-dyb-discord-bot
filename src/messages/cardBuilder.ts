import { EmbedBuilder, HexColorString } from 'discord.js';
import * as userModel from '../models/users';

const { DUST_EMOJI_ID } = process.env;

const buildCard = ({
  name,
  id,
  types,
  color,
  rarityLevel,
  craftingPrice,
}: Pokemon, { catched }: { catched: boolean }) => {
  const padId = (nbr: number) => String(nbr).padStart(3, '0');

  const exampleEmbed = new EmbedBuilder()
    .setColor(color as HexColorString)
    .setTitle(name)
    .setAuthor(
      {
        name: `#${id}`,
        iconURL: catched
          ? 'https://icon-library.com/images/pokemon-pokeball-icon/pokemon-pokeball-icon-2.jpg'
          : 'https://www.supersoluce.com/sites/default/files/styles/picto_soluce/interrogation.png',
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

  if (!catched) {
    const allUsers = userModel.getAllUsers();
    const playerListWithIt = allUsers.filter((user) => user.pokedex.includes(id));
    const playerListWithoutIt = allUsers.filter(
      (user) => !user.pokedex.includes(id) && user.pokedex.length > 0,
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

    if (playerListWithIt.length > 6) {
      exampleEmbed.addFields(
        {
          name: 'Recherché par',
          value: playerListWithoutIt.map((user) => user.nickname || user.username).join(' / '),
        },
      );
    }
  }

  return { embeds: [exampleEmbed] };
};

export default buildCard;
