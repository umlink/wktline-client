import Api from '@/api/modules';
import { panelCardTypeFilterMap } from '@/constants';
import TaskGroupSelect from '@/pages/components/TaskGroupSelect';
import TaskTypeSelect from '@/pages/components/TaskTypeSelect';
import UserSelect from '@/pages/components/UserSelect';
import { useModel } from '@@/exports';
import { Help, User } from '@icon-park/react';
import { useClickAway, useSetState, useUpdateEffect } from 'ahooks';
import { Avatar, Button, Input, message, Popover, Space, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

type PropsType = {
  children: JSX.Element;
  projectId: string;
  cardTypeId: string; // panelCardTypeFilterKey 为分类
  cardTypeName: string;
  cardTypeColor: string;
};

type StateType = {
  taskName?: string;
  taskType?: API.TaskTypeItem;
  taskGroup?: API.TaskGroupItem;
  taskPriority?: Partial<API.TaskPriorityItem>;
  taskStatus?: Partial<API.TaskStatusItem>;
  user?: {
    id: string;
    avatar: string;
    username: string;
  };
};

const NewSimpleTask = (props: PropsType) => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { data, filterData, updateDataForNewTask } = useModel('ProjectDetail.model');
  const { initialState: userInfo } = useModel('@@initialState');
  const defaultType = data.taskType.list?.[0];
  const [state, setState] = useSetState<StateType>({
    taskName: '',
    taskType: defaultType,
    user: {
      id: userInfo!.id!,
      avatar: userInfo!.avatar!,
      username: userInfo!.username!,
    },
  });

  const container = useRef<any>(null);
  useClickAway(() => {
    setOpen(false);
  }, [container]);

  const getTaskStatus = () => {
    if (filterData.cardType !== panelCardTypeFilterMap.statusId) {
      Api.TaskStatus.getTaskStatusList({ projectId: props.projectId }).then((res) => {
        if (res.success) {
          res.data?.list?.forEach((item) => {
            if (item.default) {
              setState({ taskStatus: item });
            }
          });
        }
      });
    }
  };

  const onSubmit = () => {
    if (!state.taskName) {
      setState({ taskName: undefined });
      return;
    }
    const params: API.CreateTaskReq = {
      name: state.taskName,
      projectId: props.projectId,
      statusId: state.taskStatus!.id!,
      typeId: state.taskType!.id,
      startTime: dayjs().format('YYYY-MM-DD'), // 默认当前时间为开始时间
    };
    if (state.user) {
      params.handlerId = state.user.id;
    }
    if (state.taskPriority) {
      params.priorityId = state.taskPriority.id;
    }
    if (state.taskGroup) {
      params.groupId = state.taskGroup.id;
    }
    setLoading(true);
    Api.Task.createTask(params).then((res) => {
      setLoading(false);
      if (res.success) {
        updateDataForNewTask(res.data!.id!);
        setOpen(false);
        setState({
          taskName: '',
          taskGroup: undefined,
        });
      } else {
        message.warning(res.message || '创建失败');
      }
    });
  };

  const initCardType = () => {
    const params = {
      id: props.cardTypeId,
      name: props.cardTypeName,
      color: props.cardTypeColor,
    };
    switch (filterData.cardType) {
      case panelCardTypeFilterMap.statusId:
        setState({ taskStatus: params });
        break;
      case panelCardTypeFilterMap.typeId:
        setState({ taskType: params });
        break;
      case panelCardTypeFilterMap.priority:
        setState({ taskPriority: params });
        break;
    }
    getTaskStatus();
  };

  useUpdateEffect(() => {
    if (open) initCardType();
  }, [open]);

  return (
    <span className={'leading-none'} ref={container}>
      <Popover
        open={open}
        trigger={'click'}
        placement="bottomRight"
        destroyTooltipOnHide
        getPopupContainer={() => container.current!}
        title={'添加任务'}
        content={
          <div className={'w-[284px] p-1'}>
            <div className={'flex items-center'}>
              <span className={'text-red-500'}>*</span>
              <span className={'text-zinc-400'}>类型：</span>
              <TaskTypeSelect
                mount
                projectId={props.projectId}
                disabled={filterData.cardType === panelCardTypeFilterMap.typeId}
                onChange={(taskType) => setState({ taskType })}
              >
                {!!state.taskType ? (
                  <span style={{ color: state.taskType.color }}>{state.taskType.name}</span>
                ) : (
                  <span className={'text-zinc-400'}>无</span>
                )}
              </TaskTypeSelect>
            </div>
            <div className={'mt-4'}>
              <Input.TextArea
                status={state.taskName === undefined ? 'error' : undefined}
                onChange={(e) => setState({ taskName: e.target.value })}
                value={state.taskName}
                autoSize={{ minRows: 2, maxRows: 4 }}
                placeholder={'请输入任务名称'}
              />
            </div>
            <div className={'mt-4'}>
              <span className={'text-zinc-400'}>状态：</span>
              <span style={{ color: state.taskStatus?.color }}>{state.taskStatus?.name}</span>
            </div>
            {!!state.taskPriority && (
              <div className={'mt-4'}>
                <span className={'text-zinc-400'}>优先级：</span>
                <span style={{ color: state.taskPriority?.color }}>{state.taskPriority?.name}</span>
              </div>
            )}
            <div className={'mt-4'}>
              <span className={'text-zinc-400'}>分组：</span>
              <TaskGroupSelect mount projectId={props.projectId!} onChange={(taskGroup) => setState({ taskGroup })}>
                <Space>
                  {!!state.taskGroup ? (
                    <span>{state.taskGroup.groupName}</span>
                  ) : (
                    <span className={'text-zinc-400'}>请选择任务分组</span>
                  )}
                  <Tooltip placement="right" title="版本、迭代、分组">
                    <Help className={'g-grey-bg-hover'} theme="outline" size="14" fill="#999" />
                  </Tooltip>
                </Space>
              </TaskGroupSelect>
            </div>
            <div className={'mt-4 flex items-center justify-between space-x-2'}>
              <UserSelect
                mount
                projectId={props.projectId}
                onChange={(user) =>
                  setState({ user: { id: user.userId, avatar: user.avatar, username: user.username } })
                }
              >
                <Space>
                  <Avatar
                    shape={'square'}
                    src={state.user?.avatar}
                    className={'bg-zinc-300'}
                    icon={<User />}
                    size={25}
                  />
                  <span>{<span className={'text-zinc-300'}>{state.user?.username || '待认领'}</span>}</span>
                </Space>
              </UserSelect>
              <Button type={'primary'} onClick={onSubmit} loading={loading}>
                创建
              </Button>
            </div>
          </div>
        }
      >
        <span className={'leading-none'} onClick={() => setOpen(!open)}>
          {props.children}
        </span>
      </Popover>
    </span>
  );
};

export default NewSimpleTask;
