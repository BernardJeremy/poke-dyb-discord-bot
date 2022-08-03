const dayjs = require('dayjs');
const isoWeek = require('dayjs/plugin/isoWeek');
const utc = require('dayjs/plugin/utc')
const timezone = require('dayjs/plugin/timezone') // dependent on utc plugin

dayjs.extend(isoWeek);
dayjs.extend(utc)
dayjs.extend(timezone)

const getDateTimeFormat = () => 'DD/MM/YYYY';

const getTodayDateFormated = () => dayjs().format(getDateTimeFormat());

const wasBeforeDailyReset = (lastQuestDate) => {
  const lastQuestDateTime = dayjs(lastQuestDate).tz('Europe/Paris');
  const todayAtResetDateTime = dayjs().tz('Europe/Paris');

  return !lastQuestDateTime.isSame(dayjs(), 'day');
};

const countUnique = (iterable) => new Set(iterable).size;

module.exports = {
  getDateTimeFormat,
  getTodayDateFormated,
  wasBeforeDailyReset,
  countUnique,
};
