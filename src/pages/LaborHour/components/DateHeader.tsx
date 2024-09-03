import { PeoplePlusOne } from '@icon-park/react';
import { useModel } from '@umijs/max';
import dayjs from 'dayjs';
import UserSelect from './AllUserSelect';

const LaborHourItem = () => {
  const { data } = useModel('LaborHour.model');
  const getTime = (day: number = 0) => dayjs(data.startTime).add(day, 'd').format('M / D');

  const itemClass = 'text-center p-4';
  return (
    <div className={'flex justify-between border-b border-b-zinc-200 bg-white text-sm'}>
      <div className={`${itemClass} min-w-[200px] cursor-pointer text-right`}>
        <span className={'text-left'}>
          <UserSelect onChange={() => void 0}>
            <span className={'rounded-md p-1 text-primary hover:bg-gray-50'}>
              <PeoplePlusOne theme="outline" size="16" />
            </span>
          </UserSelect>
        </span>
      </div>
      <div className={'grid flex-1 grid-cols-7'}>
        <div className={itemClass}>周一 {getTime()}</div>
        <div className={itemClass}>周二 {getTime(1)}</div>
        <div className={itemClass}>周三 {getTime(2)}</div>
        <div className={itemClass}>周四 {getTime(3)}</div>
        <div className={itemClass}>周五 {getTime(4)}</div>
        <div className={`${itemClass} text-zinc-300`}>周六 {getTime(5)}</div>
        <div className={`${itemClass} text-zinc-300`}>周日 {getTime(6)}</div>
      </div>
    </div>
  );
};
export default LaborHourItem;
