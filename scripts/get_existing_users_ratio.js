const fs = require('fs');

const JSON_FILE_PATH_INVOC = './message_history_invoc.json';
const JSON_FILE_PATH_TOWER = './message_history_tour.json';
const JSON_FILE_PATH_SAFARI = './message_history_safari.json';

const BOT_ID = '1001095363014430830';

const rawdataInvoc = fs.readFileSync(JSON_FILE_PATH_INVOC);
const dataInvoc = JSON.parse(rawdataInvoc);

const rawdataTower = fs.readFileSync(JSON_FILE_PATH_TOWER);
const dataTower = JSON.parse(rawdataTower);

const rawdataSafari = fs.readFileSync(JSON_FILE_PATH_SAFARI);
const dataSafari = JSON.parse(rawdataSafari);

const getInvocRatioForUser = ({ authorId }) => {
  let invocNbr = 0;
  let invocSuccessNbr = 0;

  for (let i = dataInvoc.length - 1; i > 0; i -= 1) {
    const currentInvocMsg = dataInvoc[i];
    const nextInvocMsg = dataInvoc[i - 1];

    if (currentInvocMsg.authorId === authorId) {
      invocNbr += 1;
      if (
        nextInvocMsg.authorId === BOT_ID
        && nextInvocMsg.content.includes('Tu en as 1')
      ) {
        invocSuccessNbr += 1;
      }
    }
  }

  return {
    invoc: invocNbr,
    invocSuccess: invocSuccessNbr,
  };
};

const getTowerRatioForUser = ({ authorId }) => {
  let towerNbr = 0;
  let towerSuccessNbr = 0;

  for (let i = dataTower.length - 1; i > 0; i -= 1) {
    const currentTowerMsg = dataTower[i];
    const nextInvocMsg = dataTower[i - 1];

    if (currentTowerMsg.authorId === authorId) {
      towerNbr += 1;
      if (
        nextInvocMsg.authorId === BOT_ID
      ) {
        towerSuccessNbr += 1;
      }
    }
  }

  return {
    tower: towerNbr,
    towerSuccess: towerSuccessNbr,
  };
};

const getSafariRatioForUser = ({ authorId }) => {
  let safariNbr = 0;
  let safariSuccessNbr = 0;

  for (let i = dataSafari.length - 1; i > 0; i -= 1) {
    const currentSafariMsg = dataSafari[i];
    const nextInvocMsg = dataSafari[i - 1];

    if (currentSafariMsg.authorId === authorId) {
      safariNbr += 1;
      if (
        nextInvocMsg.authorId === BOT_ID
      ) {
        safariSuccessNbr += 1;
      }
    }
  }

  return {
    safari: safariNbr,
    safariSuccess: safariSuccessNbr,
  };
};

let userIdList = dataInvoc.map((invocMsg) => (
  invocMsg.authorId !== BOT_ID && invocMsg.authorId
)).filter((id) => id);

const userIdSet = new Set(userIdList);
userIdList = Array.from(userIdSet);

const ratioList = userIdList.reduce((currentRatioList, currentUserId) => {
  const userInvocRatio = getInvocRatioForUser({ authorId: currentUserId });
  const userTowerRatio = getTowerRatioForUser({ authorId: currentUserId });
  const userSafariRatio = getSafariRatioForUser({ authorId: currentUserId });

  currentRatioList.push({
    userId: currentUserId,
    invoc: userInvocRatio.invoc,
    invocSuccess: userInvocRatio.invocSuccess,
    tower: userTowerRatio.tower,
    towerSuccess: userTowerRatio.towerSuccess,
    safari: userSafariRatio.safari,
    safariSuccess: userSafariRatio.safariSuccess,
  });

  return currentRatioList;
}, []);

console.log(ratioList);
