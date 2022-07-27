const { EmbedBuilder } = require('discord.js');

const { DUST_EMOJI_ID } = process.env;

const buildCard = ({
  name,
  id,
  types,
  color,
  rarityLevel,
  craftingPrice,
}) => {
  const padId = (nbr) => String(nbr).padStart(3, '0');

  const exampleEmbed = new EmbedBuilder()
    .setColor(color)
    .setTitle(name)
    .setAuthor(
      {
        name: `#${id}`,
        iconURL: 'https://icon-library.com/images/pokemon-pokeball-icon/pokemon-pokeball-icon-2.jpg',
      },
    )
    .setThumbnail(`https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/thumbnails/${padId(id)}.png`)
    .setFooter({ text: name, iconURL: `https://raw.githubusercontent.com/fanzeyi/pokemon.json/master/sprites/${padId(id)}MS.png` });

  const priceStr = craftingPrice < 0 ? '-' : `${craftingPrice} ${DUST_EMOJI_ID}`;

  exampleEmbed.addFields(
    { name: 'Type', value: types.join('/'), inline: true },
    { name: 'Rareté', value: `${rarityLevel}%`, inline: true },
    { name: 'Craft', value: priceStr, inline: true },
  );

  return { embeds: [exampleEmbed] };
};

module.exports = buildCard;
