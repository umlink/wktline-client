import { EVENTS } from '@/constants';
import EventBus from '@/utils/event-bus';
import { PlusCross } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { Progress, Tooltip } from 'antd';

type TimeLineDataType = {
  hour: number;
  date: string;
  preIndex: number;
  useId: string;
};

const TimeLine = ({ hour, date, preIndex, useId }: TimeLineDataType) => {
  const { initialState: userInfo } = useModel('@@initialState');
  const isSelf = userInfo?.id === useId;
  const newLaborHour = () => {
    if (!isSelf) return;
    EventBus.emit(EVENTS.SHOW_NEW_TASK_LABOR_HOUR_MODAL, {
      date,
      useId,
      index: preIndex,
    });
  };

  return (
    <div
      className={`flex min-h-[48px] w-full cursor-pointer
        flex-col justify-center rounded
        border border-dashed border-white
        px-2
        ${userInfo?.id !== useId ? 'cursor-not-allowed' : 'group-hover:border-primary'}
        `}
      onClick={newLaborHour}
    >
      {hour > 0 && (
        <Tooltip title={`${hour} / 8 小时`}>
          <span className={`${hour > 0 ? 'text-zinc-600' : 'text-zinc-300'}`}>{hour}小时</span>
          <Progress
            status={hour >= 8 ? 'success' : 'exception'}
            className={`[&.ant-progress-line]:!mb-0
            [&.ant-progress-status-exception_.ant-progress-bg]:!bg-[#F9CC45]
            [&.ant-progress-status-success_.ant-progress-bg]:!bg-primary`}
            success={{ strokeColor: '#dedede' }}
            size="small"
            percent={hour >= 8 ? 100 : (hour / 8) * 100}
            showInfo={false}
          />
        </Tooltip>
      )}
      {isSelf && hour <= 0 && (
        <span className={'hidden leading-none text-primary group-hover:inline-block'}>
          <PlusCross theme="outline" size={18} />
        </span>
      )}
    </div>
  );
};
export default TimeLine;
