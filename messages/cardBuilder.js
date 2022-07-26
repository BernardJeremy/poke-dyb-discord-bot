const { EmbedBuilder } = require('discord.js');

const buildCard = ({
  name,
  id,
  types,
  color,
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

  types?.forEach((type, i) => {
    exampleEmbed.addFields(
      { name: `Type ${i + 1}`, value: type, inline: true },
    );
  });

  return { embeds: [exampleEmbed] };
};

module.exports = buildCard;
