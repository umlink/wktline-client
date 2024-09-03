import Api from '@/api/modules';
import { EVENTS, TASK_STATUS_ENUM } from '@/constants';
import EventBus from '@/utils/event-bus';
import { useSetState } from 'ahooks';
import { Badge, Calendar, Tooltip } from 'antd';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';

const formatStr = 'YYYY-MM-DD HH:mm:ss';

const Schedule = () => {
  const [currentData, setCurrentDate] = useState<string | undefined>(undefined);
  const [taskCache, setTaskCache] = useSetState<{ [key: string]: API.TaskListByIntervalItem[] }>({});

  const openTaskDetail = (id: string) => EventBus.emit(EVENTS.OPEN_TASK_DETAIL, id);
  const dateCellRender = (value: Dayjs) => {
    const listData = taskCache[value.format('YYYY-MM-DD')] || [];
    return (
      <div>
        {listData.map((item) => (
          <div
            onClick={(e) => {
              e.stopPropagation();
              openTaskDetail(item.id);
            }}
            className={'mb-1 cursor-pointer truncate whitespace-nowrap text-sm hover:text-primary'}
            key={item.id}
          >
            <Tooltip title={item.statusName}>
              <Badge color={item.statusColor} />
            </Tooltip>
            <span
              className={`ml-1 text-xs ${item.statusEnum === TASK_STATUS_ENUM.DONE ? 'font-light text-zinc-400' : ''}`}
            >
              {item.name}
            </span>
          </div>
        ))}
      </div>
    );
  };
  const clearCache = () => {
    // eslint-disable-next-line guard-for-in
    for (let key in taskCache) {
      taskCache[key] = [];
    }
  };
  const updateTaskCache = (key: string, val: API.TaskListByIntervalItem) => {
    if (taskCache[key]) {
      taskCache[key].push(val);
    } else {
      taskCache[key] = [val];
    }
    setTaskCache({ [key]: [...taskCache[key]] });
  };

  const updateCurrentData = (date?: string) => {
    if (date) {
      const dateString = dayjs(date).format('YYYY-MM');
      if (currentData === dateString) {
        return false;
      }
      setCurrentDate(dateString);
    }
    return true;
  };
  const getMonthTask = (date?: string, reload?: boolean) => {
    if (!updateCurrentData(date) && !reload) return;
    clearCache();
    Api.Task.getIntervalTaskList({
      startTime: dayjs(date).startOf('month').format(formatStr),
      endTime: dayjs(date).endOf('month').format(formatStr),
    }).then((res) => {
      if (res.success && res.data) {
        res.data.forEach((item) => {
          let startTime = dayjs(item.startTime);
          const endTime = dayjs(item.endTime);
          while (startTime.isBefore(endTime) || startTime.isSame(endTime)) {
            // 周六日不展示任务
            if (![0, 6].includes(startTime.day())) {
              const key = startTime.format('YYYY-MM-DD');
              updateTaskCache(key, item);
            }
            startTime = startTime.add(1, 'd');
          }
        });
      }
    });
  };

  const onChange = (value: Dayjs) => getMonthTask(value.format('YYYY-MM-DD'));

  useEffect(() => {
    getMonthTask(currentData);
    EventBus.on(EVENTS.UPDATE_TASK_CALLBACK, () => getMonthTask(currentData, true));
  }, []);
  return (
    <div className={'box-border h-full overflow-y-auto bg-white p-4'}>
      <div className={'space-x-1'}>
        <span className={'text-md font-bold'}>工作任务日程表</span>
        <span className={'text-xs text-zinc-400'}>任务按时间分布的日期展示</span>
      </div>
      <div className={'h-[calc(100%-23px)] overflow-hidden'}>
        <Calendar
          className={'[&_.ant-picker-calendar-date-content]:!h-[calc(100vh/10)] [&_.ant-picker-cell-inner]:!static'}
          mode={'month'}
          onChange={onChange}
          cellRender={dateCellRender}
        />
      </div>
    </div>
  );
};

export default Schedule;
