import { Left, Right } from '@icon-park/react';
import { useModel } from '@umijs/max';
import dayjs from 'dayjs';
const Header = () => {
  const { data, changeTime } = useModel('LaborHour.model');
  const formatTime = (time: string) => dayjs(time).format('YYYY-MM-DD');

  return (
    <div className={'flex justify-between p-5'}>
      <b>工时展示</b>
      <span className={'flex items-center space-x-2 text-zinc-500'}>
        <Left
          className={'cursor-pointer rounded-md hover:bg-white'}
          onClick={() => changeTime(-1)}
          theme="outline"
          size="22"
        />
        <span>
          {formatTime(data.startTime)} - {formatTime(data.endTime)}
        </span>
        <Right
          className={'cursor-pointer rounded-md hover:bg-white'}
          onClick={() => changeTime(1)}
          theme="outline"
          size="22"
        />
      </span>
      <span>Bow</span>
    </div>
  );
};

export default Header;
