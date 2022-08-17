const getRandomInt = (min, max) => Math.floor(
  Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min),
);

const main = () => {
  const targetbrOfWeeks = 10000000;

  let nbrOfWeeks = 0;
  let nbrTimesLastFloorCleared = 0;
  let nbrOfOneShot = 0;

  const oneWeekOfTowerRuns = () => {
    const floorsOdds = [
      60,
      60,
      35,
      35,
      15,
      5,
    ];

    let currentFloorIndex = 0;
    let tryNbr = 0;
    let isOneShot = true;

    while (currentFloorIndex < floorsOdds.length && tryNbr < 14) {
      const rand = getRandomInt(1, 100);

      if (rand <= floorsOdds[currentFloorIndex]) {
        currentFloorIndex += 1;
      } else {
        isOneShot = false;
      }

      tryNbr += 1;
    }

    nbrOfWeeks += 1;
    if (currentFloorIndex === 6) nbrTimesLastFloorCleared += 1;
    if (isOneShot) nbrOfOneShot += 1;
  };

  for (let i = 0; i < targetbrOfWeeks; i += 1) {
    oneWeekOfTowerRuns();
  }

  console.log('nbrOfWeeks', nbrOfWeeks);
  console.log('nbrTimesLastFloorCleared', nbrTimesLastFloorCleared);
  console.log('nbrTimesLastFloorCleared/nbrOfWeeks*100', ((nbrTimesLastFloorCleared / nbrOfWeeks) * 100));

  console.log('=============');

  console.log('nbrOfOneShot', nbrOfOneShot);
  console.log('nbrOfOneShot/nbrOfWeeks*100', ((nbrOfOneShot / nbrOfWeeks) * 100));
};

main();
