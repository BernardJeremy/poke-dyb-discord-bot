import { EmbedBuilder } from 'discord.js';
import * as userModel from '../models/users';
import towerData from '../data/tower.json';

const buildTowerStatus = () => {
  const exampleEmbed = new EmbedBuilder()
    .setTitle('Ascension de la Tour Pokemon')
    .setAuthor(
      {
        name: 'Mr. Fuji',
        iconURL: 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/a38c1766-19a5-49ff-843c-41b278750343/dexmlrh-ddb0e737-707c-4dcf-ad89-ff60acc19410.png/v1/fit/w_300,h_900,q_70,strp/smiling_gastly_by_alteredghastly_dexmlrh-300w.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9MTI4MCIsInBhdGgiOiJcL2ZcL2EzOGMxNzY2LTE5YTUtNDlmZi04NDNjLTQxYjI3ODc1MDM0M1wvZGV4bWxyaC1kZGIwZTczNy03MDdjLTRkY2YtYWQ4OS1mZjYwYWNjMTk0MTAucG5nIiwid2lkdGgiOiI8PTEyODAifV1dLCJhdWQiOlsidXJuOnNlcnZpY2U6aW1hZ2Uub3BlcmF0aW9ucyJdfQ.UQTBhllZ6QKvcXhHxlt_VF2P0DSMrIYR7RewfclUSvE',
      },
    )
    .setThumbnail('https://static.wikia.nocookie.net/victoryroad/images/b/b2/TCG_Lavender_Town.png/revision/latest?cb=20190312153835');

  const allUsers = userModel.getAllUsers();

  exampleEmbed.addFields(
    {
      name: 'Terminé',
      value: allUsers.filter(
        (user) => user.pokedex.length > 0 && user.tower.maxClearFloor === towerData.floors.length,
      ).map((user) => user.nickname || user.username).join(' / ') || ' / ',
    },
  );

  for (let i = towerData.floors.length - 1; i >= 0; i -= 1) {
    const currentFloor = towerData.floors[i];
    const playerOnCurrentFloorStr = allUsers.filter(
      (user) => user.pokedex.length > 0
        && user.tower.currentFloor === currentFloor.id
        && user.tower.maxClearFloor < towerData.floors.length,
    ).map((user) => user.nickname || user.username).join(' / ') || ' / ';

    exampleEmbed.addFields(
      {
        name: currentFloor.name,
        value: playerOnCurrentFloorStr,
      },
    );
  }

  return { embeds: [exampleEmbed] };
};

export default buildTowerStatus;
