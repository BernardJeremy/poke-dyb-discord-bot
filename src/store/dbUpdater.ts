import * as usersModel from '../models/users';

const updateDataForUser = (user: User): User => {
  const toUpdateUser: User = { ...user };

  if (!user.claims) {
    toUpdateUser.claims = {
      gold: 0,
      dust: 0,
      tickets: 0,
    };
  }

  if (!user.tower) {
    toUpdateUser.tower = usersModel.getInitTowerValue();
  }

  if (!user.tickets) {
    toUpdateUser.tickets = 0;
  }

  return usersModel.updateUser(toUpdateUser);
};

export default updateDataForUser;
