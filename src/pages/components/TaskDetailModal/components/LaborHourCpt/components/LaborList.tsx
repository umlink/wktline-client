import { Delete, Editor } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { Avatar, Popconfirm } from 'antd';
import dayjs from 'dayjs';

type PropsType = {
  setEditLaborData: (v: API.UpdateTaskLaborHourReq) => void;
};
export default (props: PropsType) => {
  const { data, delTaskLaborHour } = useModel('taskDetail');
  return (
    <>
      {data.laborHourLogs.length > 0 && (
        <div className={'mt-3 max-h-[260px] overflow-y-auto rounded-md border border-zinc-100 p-3'}>
          {data.laborHourLogs.map((log, index) => {
            return (
              <div className={`group flex justify-between ${index > 0 ? 'mt-3' : ''}`} key={log.id}>
                <span className={'min-w-6'}>
                  <Avatar size={24} src={log.avatar} />
                </span>
                <div className={'ml-3 flex-grow'}>
                  <div className={'flex items-center justify-between'}>
                    <p className={'space-x-1 text-zinc-500'}>
                      <span>{log.username}</span>
                      <span>
                        {dayjs(log.date).format('MM月DD日')} 实际工时 {log.hour} 小时
                      </span>
                    </p>
                    <div className={'hidden space-x-3 group-hover:inline-block'}>
                      <Popconfirm
                        title={`删除工时`}
                        description={`确认删除删除实际工时【${log.hour}】 小时`}
                        onConfirm={() => delTaskLaborHour(log.id, index)}
                        okText="确认"
                        cancelText="取消"
                      >
                        <Delete className={'hover:fill cursor-pointer'} theme="outline" size="16" fill="#999" />
                      </Popconfirm>
                      <Editor
                        onClick={() =>
                          props.setEditLaborData({
                            taskId: data.taskId!,
                            id: log.id,
                            hour: log.hour!,
                            date: log.date,
                            description: log.description!,
                          })
                        }
                        className={'cursor-pointer'}
                        theme="outline"
                        size="16"
                        fill="#999"
                      />
                    </div>
                  </div>
                  {!!log.description && <p className={'mt-2 break-all leading-4 text-zinc-400'}>{log.description}</p>}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
