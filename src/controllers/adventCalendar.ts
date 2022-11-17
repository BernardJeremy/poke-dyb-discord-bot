import * as usersModel from '../models/users';

const {
  ADVENT_POKEMON_REWARD_ID,
} = process.env;

export default {
  name: 'Advent Calendar',

  description: 'Perform advent calendar management',

  async execute() {
    const allUsers = usersModel.getAllUsers();
    const users: User[] = JSON.parse(JSON.stringify(allUsers));
    const now = new Date();
    const dayNbr = now.getDate();
    const monthNbr = now.getMonth() + 1;

    if (monthNbr !== 12 || dayNbr > 24) {
      return;
    }

    const getClaimReward = (user: User) => {
      if (dayNbr === 24) {
        user.pokedex.push(parseInt(ADVENT_POKEMON_REWARD_ID || '58', 10));
        return user;
      }

      if (dayNbr % 3 === 1) { // GOLD
        return {
          ...user,
          claims: {
            ...user.claims,
            gold: user.claims.gold + 2000,
          },
        };
      }

      if (dayNbr % 3 === 2) { // DUST
        return {
          ...user,
          claims: {
            ...user.claims,
            dust: user.claims.dust + 200,
          },
        };
      }

      return {
        ...user,
        claims: {
          ...user.claims,
          tickets: user.claims.tickets + 12,
        },
      };
    };

    for (let i = 0; i < users.length; i += 1) {
      const user = users[i];

      usersModel.updateUser(getClaimReward(user), false);
    }
  },
};
