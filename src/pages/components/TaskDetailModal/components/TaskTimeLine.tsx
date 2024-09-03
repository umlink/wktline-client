import { useModel } from '@umijs/max';
import { DatePicker } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

const TaskTimeLine = () => {
  const dateFormat = 'YYYY-MM-DD';
  const { data, updateTaskInfo } = useModel('taskDetail');
  const startTime = !!data.task?.startTime ? dayjs(data.task?.startTime, dateFormat) : undefined;
  const endTime = !!data.task?.endTime ? dayjs(data.task?.endTime, dateFormat) : undefined;
  return (
    <span className={'space-x-2 rounded-lg'}>
      <DatePicker
        variant="filled"
        defaultValue={startTime as Dayjs}
        onChange={(date) => {
          updateTaskInfo({
            startTime: date?.toString(),
          });
        }}
      />
      <DatePicker
        variant="filled"
        defaultValue={endTime as Dayjs}
        onChange={(date) => {
          updateTaskInfo({
            endTime: date?.toString(),
          });
        }}
      />
    </span>
  );
};
export default TaskTimeLine;
