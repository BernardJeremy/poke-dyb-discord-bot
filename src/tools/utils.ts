import dayjs, { extend } from 'dayjs';
import isoWeek from 'dayjs/plugin/isoWeek';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone'; // dependent on utc plugin

extend(isoWeek);
extend(utc);
extend(timezone);

const getDateTimeFormat = () => 'DD/MM/YYYY HH:mm';

const getDateFormat = () => 'DD/MM/YYYY';

const getTodayDateFormated = () => dayjs().tz('Europe/Paris').format(getDateFormat());

const getNowDateTimeFormated = () => {
  const ret = dayjs().tz('Europe/Paris').format(getDateTimeFormat());
  console.log(dayjs());
  console.log(dayjs().tz('Europe/Paris'));
  console.log(dayjs().tz('Europe/Paris').format(getDateTimeFormat()));
  console.log(ret);
  return ret;
};

const wasBeforeDailyReset = (lastQuestDate: Date) => {
  const lastQuestDateTime = dayjs(lastQuestDate).tz('Europe/Paris');

  return !lastQuestDateTime.isSame(dayjs(), 'day');
};

const countUnique = (iterable: Array<any>) => new Set(iterable).size;

const getRandomInt = (min: number, max: number) => Math.floor(
  Math.random() * (Math.floor(max) - Math.ceil(min)) + Math.ceil(min),
);

export {
  getDateTimeFormat,
  getDateFormat,
  getTodayDateFormated,
  getNowDateTimeFormated,
  wasBeforeDailyReset,
  countUnique,
  getRandomInt,
};
