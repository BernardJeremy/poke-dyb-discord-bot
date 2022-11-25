import { isSameDay } from 'date-fns';
import { formatToTimeZone, convertToTimeZone } from 'date-fns-timezone';

const getDateTimeFormat = () => 'DD/MM/YYYY HH:mm';

const getDateFormat = () => 'DD/MM/YYYY';

const getTodayDateFormated = () => formatToTimeZone(new Date(), getDateFormat(), { timeZone: 'Europe/Paris' });

const getNowDateTimeFormated = () => formatToTimeZone(new Date(), getDateTimeFormat(), { timeZone: 'Europe/Paris' });

const wasBeforeDailyReset = (lastQuestDate: Date) => {
  const lastQuestDateTime = convertToTimeZone(lastQuestDate, { timeZone: 'Europe/Paris' });

  return !isSameDay(lastQuestDateTime, new Date());
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
