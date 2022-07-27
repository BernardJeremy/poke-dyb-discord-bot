const dayjs = require('dayjs');
const isoWeek = require('dayjs/plugin/isoWeek');

dayjs.extend(isoWeek);

const getDateTimeFormat = () => 'DD/MM/YYYY - HH:mm';

const getTodayDateFormated = () => dayjs().format(getDateTimeFormat());

const wasBeforeDailyReset = (lastQuestDate) => {
  const lastQuestDateTime = dayjs(lastQuestDate);
  const todayAtResetDateTime = dayjs().hour(4);

  if (lastQuestDateTime.isSame(dayjs(), 'day')) {
    if (lastQuestDateTime.isBefore(todayAtResetDateTime)) {
      return true;
    }

    return false;
  }

  return true;
};

module.exports = {
  getDateTimeFormat,
  getTodayDateFormated,
  wasBeforeDailyReset,
};
