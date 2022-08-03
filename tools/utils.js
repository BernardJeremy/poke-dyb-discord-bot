const dayjs = require('dayjs');
const isoWeek = require('dayjs/plugin/isoWeek');

dayjs.extend(isoWeek);

const getDateTimeFormat = () => 'DD/MM/YYYY';

const getTodayDateFormated = () => dayjs().format(getDateTimeFormat());

const wasBeforeDailyReset = (lastQuestDate) => {
  const lastQuestDateTime = dayjs(lastQuestDate);
  const todayAtResetDateTime = dayjs();

  return !lastQuestDateTime.isSame(dayjs(), 'day');
};

const countUnique = (iterable) => new Set(iterable).size;

module.exports = {
  getDateTimeFormat,
  getTodayDateFormated,
  wasBeforeDailyReset,
  countUnique,
};
