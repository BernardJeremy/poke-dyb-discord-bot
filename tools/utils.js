const dayjs = require('dayjs');
const isoWeek = require('dayjs/plugin/isoWeek');

dayjs.extend(isoWeek);

const getDateTimeFormat = () => 'DD/MM/YYYY';

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

const countUnique = (iterable) => new Set(iterable).size;

module.exports = {
  getDateTimeFormat,
  getTodayDateFormated,
  wasBeforeDailyReset,
  countUnique,
};
