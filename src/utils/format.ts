import dayjs from 'dayjs';
/**
 * @description:
 * @param {string} time
 * @return {*}
 */
export function laborHourFormat(time: string): number {
  if (!time) return 0;
  const _time = time.toLowerCase();
  if (!/^\d+$/.test(_time)) {
    let _hour = 0;
    if (/\d+w$/.test(_time)) {
      _hour = Number(_time.split('w')[0]) * 5 * 8;
    } else if (/\d+d$/.test(_time)) {
      _hour = Number(_time.split('d')[0]) * 8;
    } else if (/\d+h$/.test(_time)) {
      _hour = Number(_time.split('h')[0]);
    }
    return _hour;
  }
  return Number(_time);
}

export const getCurrentDateStartAndEnd = (format = 'YYYY-MM-DD HH:mm:ss') => {
  let day = dayjs().day();
  let startDay = day === 0 ? -6 : -day + 1;
  const startDate = dayjs().add(startDay, 'd');
  return {
    currentMonday: startDate.hour(0).minute(0).second(0).format(format),
    currentSunday: startDate.add(6, 'd').hour(23).minute(59).second(59).format(format),
  };
};
