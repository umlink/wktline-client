import { useModel } from '@umijs/max';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
export default () => {
  const { params, setParams } = useModel('newTask');
  return (
    <span className={'space-x-2 rounded-md bg-white'}>
      <DatePicker
        variant="filled"
        placeholder={'开始时间'}
        defaultValue={dayjs(params.startTime)}
        onChange={(date) => {
          setParams({
            startTime: date?.toString(),
          });
        }}
      />
      <DatePicker
        variant="filled"
        placeholder={'截止时间'}
        onChange={(date) => {
          setParams({
            endTime: date?.toString(),
          });
        }}
      />
    </span>
  );
};
