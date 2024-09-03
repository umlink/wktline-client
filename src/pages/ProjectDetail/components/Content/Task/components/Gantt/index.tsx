import { EVENTS, TASK_STATUS_ENUM } from '@/constants';
import UserSelect from '@/pages/components/UserSelect';
import { GanttDataItem } from '@/pages/ProjectDetail/types';
import EventBus from '@/utils/event-bus';
import { Loading, Tips } from '@icon-park/react';
import { useModel } from '@umijs/max';
import RcGantt from '@umlink/rc-gantt';
import { Gantt } from '@umlink/rc-gantt/dist/types/types';
import { Avatar, Spin } from 'antd';
import dayjs from 'dayjs';
import useService from './useService';

const TaskGantt = () => {
  const { loading, data: taskData, loadMoreGanttList } = useModel('ProjectDetail.model');
  const { updateTaskInfo } = useService();
  const openTaskDetail = (id: string) => EventBus.emit(EVENTS.OPEN_TASK_DETAIL, id);
  // const onChangeEndTime = (record: Gantt.Record<DefaultRecordType>, endTime: string | string[]) => {
  //   updateTaskInfo({
  //     id: record.id,
  //     endTime: endTime as string,
  //   });
  // };
  const columns: Gantt.Column[] = [
    {
      name: 'taskName',
      label: '任务标题',
      render: (record) => (
        <span
          onClick={() => openTaskDetail(record.id)}
          style={{ color: record.content.statusEnum === TASK_STATUS_ENUM.DONE ? '#999' : '#333' }}
          className={`cursor-pointer hover:text-primary`}
        >
          {record.taskName}
        </span>
      ),
    },
    {
      name: 'handler',
      label: '执行者',
      width: 120,
      render: (record) => {
        return (
          <UserSelect
            projectId={record.content?.projectId}
            onChange={(user) => {
              updateTaskInfo({
                id: record.content?.id,
                handlerId: user.userId,
              });
            }}
          >
            {!!record.content.handlerId ? (
              <span className={'space-x-1'}>
                <Avatar size={20} src={record.content.handlerAvatar}></Avatar>
                <span className={'text-zinc-500'}>{record.content.handlerName}</span>
              </span>
            ) : (
              <span className={'text-zinc-300'}>未设置</span>
            )}
          </UserSelect>
        );
      },
    },
    // {
    //   name: 'endDate',
    //   label: '截止时间',
    //   width: 150,
    //   align: 'center',
    //   render: (record) => {
    //     return (
    //       <DatePicker
    //         className={'text-zinc-500'}
    //         variant={'borderless'}
    //         placeholder={'截止日期'}
    //         onChange={(_, dateString) => onChangeEndTime(record, dateString)}
    //         value={record.content.endTime ? dayjs(record.content.endTime) : undefined}
    //         needConfirm
    //       />
    //     );
    //   },
    // },
  ];
  return (
    <div className={'mx-2 h-[calc(100vh-116px)] overflow-y-auto rounded-md bg-white '}>
      <div className={'h-[calc(100%-40px)]'}>
        <RcGantt<GanttDataItem>
          data={taskData.ganttData.list}
          columns={columns}
          getBarColor={() => ({
            backgroundColor: 'rgb(var(--primary-color), 40%)',
            borderColor: 'rgb(var(--primary-color), 100%)',
          })}
          todayStyle={{ borderRadius: 0, backgroundColor: 'rgb(var(--primary-color), 100%)', color: '#fff' }}
          renderLeftText={(data) => <span className={'select-none text-zinc-400'}>{data.record.startDate}</span>}
          renderRightText={(data) => (
            <span className={'select-none space-x-2'}>
              <span className={'text-zinc-400'}>{data.record.endDate}</span>
              <span className={'cursor-pointer'} style={{ color: data.record.content.statusColor }}>
                [{data.record.content.statusName}]
              </span>
              <span>{data.record.taskName}</span>
            </span>
          )}
          onUpdate={async (row, startDate, endDate) => {
            updateTaskInfo({
              id: row.id,
              startTime: dayjs(startDate).format('YYYY-MM-DD'),
              endTime: dayjs(endDate).format('YYYY-MM-DD'),
            });
            return true;
          }}
          onBarClick={(record) => openTaskDetail(record.id)}
        />
      </div>
      <div className={'flex h-10 items-center justify-between px-3'}>
        <span className={'text-xs text-zinc-400'}>
          <Spin size={'small'} spinning={loading}>
            {taskData.ganttData.finished ? (
              <span className={'flex items-center space-x-1'}>
                <span className={'text-orange-400'}>
                  <Tips theme="outline" />
                </span>
                <span>加载成功，没有更多任务啦~</span>
              </span>
            ) : (
              <span
                onClick={loadMoreGanttList}
                className={'flex cursor-pointer items-center space-x-1 hover:text-primary'}
              >
                <Loading theme="outline" />
                <span>加载更多</span>
              </span>
            )}
          </Spin>
        </span>
        <span className={'text-zinc-500'}>任务总数：{taskData.ganttData.total}</span>
      </div>
    </div>
  );
};

export default TaskGantt;
