import * as usersModel from '../models/users';

const updateDataForUser = (user: User): User => {
  const toUpdateUser: User = { ...user };

  if (!user.tower) {
    toUpdateUser.tower = usersModel.getInitTowerValue();
  }

  if (!user.tickets) {
    toUpdateUser.tickets = 0;
  }

  return usersModel.updateUser(toUpdateUser);
};

export default updateDataForUser;
