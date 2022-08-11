const usersModel = require('../models/users');

const {
  TOWER_TICKETS_EACH_DAY,
} = process.env;

module.exports = {
  name: 'Tower daily reset',

  description: 'Perform user towers data reset daily',

  async execute() {
    const allUsers = usersModel.getAllUsers();
    const users = JSON.parse(JSON.stringify(allUsers));

    for (let i = 0; i < users.length; i += 1) {
      const user = users[i];

      if (user.pokedex.length > 0) {
        if (!user.tower) {
          user.tower = usersModel.getInitTowerValue();
        }

        usersModel.updateUser({
          ...user,
          tower: {
            ...user.tower,
            ticketsTotal: user.tower.ticketsTotal + parseInt(TOWER_TICKETS_EACH_DAY, 10),
            ticketsToday: user.tower.ticketsToday + parseInt(TOWER_TICKETS_EACH_DAY, 10),
          },
        }, false);
      }
    }
  },
};
