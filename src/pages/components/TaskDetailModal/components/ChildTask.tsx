import Api from '@/api/modules';
import TaskStatusSelect from '@/pages/components/TaskStatusSelect';
import UserSelect from '@/pages/components/UserSelect';
import { Plus, User } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { App, Avatar, Tooltip } from 'antd';

const ChildTask = () => {
  const { setData, setParams } = useModel('newTask');
  const { data, getChildTaskList, showChildTaskById, getTaskLogs } = useModel('taskDetail');
  const onUpdateChildList = () => {
    getChildTaskList(data.taskId!);
    getTaskLogs(data.taskId);
  };
  const onNewTask = () => {
    setData({
      show: true,
      projectId: data.projectId,
      childTaskCallback: onUpdateChildList,
    });
    setParams({ parentId: data.taskId });
  };

  const updateTask = (params: API.UpdateTaskReq) => {
    Api.Task.updateTask(params).then(() => {
      getChildTaskList(data.taskId!);
    });
  };

  return (
    <App>
      <div className={'rounded-md border border-zinc-100 p-2'}>
        {data.childList.length > 0 && (
          <div className={'mb-2'}>
            {data.childList.map((item: API.TaskDetailItem, index: number) => {
              return (
                <div className={`flex w-full items-center justify-between text-xs`} key={index}>
                  <TaskStatusSelect
                    projectId={data.projectId}
                    onChange={(statusId) => {
                      updateTask({
                        id: item.id,
                        projectId: data.projectId,
                        statusId,
                      });
                    }}
                  >
                    <span className={'inline-block min-w-[45px] text-center'} style={{ color: item.statusColor }}>
                      {item.statusName || <span className={'font-300 text-zinc-400'}>{'设置任务状态'}</span>}
                    </span>
                  </TaskStatusSelect>
                  <p
                    onClick={() => showChildTaskById(item.id!)}
                    className={'flex-1 cursor-pointer truncate px-2 text-zinc-400 hover:text-primary'}
                  >
                    {item.name}
                  </p>
                  <UserSelect
                    projectId={data.projectId}
                    onChange={(val) =>
                      updateTask({
                        id: item.id,
                        projectId: data.projectId,
                        handlerId: val.userId,
                      })
                    }
                  >
                    <Tooltip placement="right" title={item.handlerName}>
                      <Avatar className={'bg-zinc-300'} src={item.handlerAvatar} icon={<User />} size={20} />
                    </Tooltip>
                  </UserSelect>
                </div>
              );
            })}
          </div>
        )}
        <div>
          <span className={'cursor-pointer space-x-1 text-primary'} onClick={onNewTask}>
            <Plus />
            <span>添加子任务</span>
          </span>
        </div>
      </div>
    </App>
  );
};
export default ChildTask;
