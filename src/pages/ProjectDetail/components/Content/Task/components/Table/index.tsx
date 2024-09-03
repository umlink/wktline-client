import { EVENTS } from '@/constants';
import useScrollMove from '@/hooks/useScrollMove';
import TaskGroupSelect from '@/pages/components/TaskGroupSelect';
import TaskPrioritySelect from '@/pages/components/TaskPrioritySelect';
import TaskStatusSelect from '@/pages/components/TaskStatusSelect';
import TaskTypeSelect from '@/pages/components/TaskTypeSelect';
import UserSelect from '@/pages/components/UserSelect';
import EventBus from '@/utils/event-bus';
import { Delete, User } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { Avatar, Button, Popconfirm, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useMemo, useRef } from 'react';
import './table.less';
import userService from './useService';

const dateFormat = 'YYYY-MM-DD';
const dateTimeFormat = 'YYYY-MM-DD HH:mm';

const TableTask = () => {
  const ref = useRef(null);
  const { updateTaskInfo, statusFilters, userFilters, groupFilters, typeFilters, priorityFilters } = userService();
  const { data, loadMoreTableList, delTaskById } = useModel('ProjectDetail.model');

  const openTaskDetail = (id: string) => EventBus.emit(EVENTS.OPEN_TASK_DETAIL, id);

  const columns: ColumnsType<API.TaskDetailItem> = useMemo(
    () => [
      {
        title: '序号',
        align: 'center',
        dataIndex: 'id',
        key: 'id',
        width: 60,
        fixed: 'left',
        ellipsis: true,
        render: (_, record, index) => <span>{index + 1}</span>,
      },
      {
        title: '任务名',
        dataIndex: 'name',
        key: 'name',
        width: 320,
        fixed: 'left',
        ellipsis: true,
        render: (_, record) => (
          <div
            onClick={() => openTaskDetail(record.id!)}
            className={`inline-block h-full w-full cursor-pointer truncate align-middle hover:text-primary`}
          >
            {record.name}
          </div>
        ),
      },
      {
        title: '状态',
        align: 'center',
        filters: statusFilters,
        width: 120,
        filterSearch: true,
        onFilter: (value: any, { statusId }) => statusId === value,
        dataIndex: 'status',
        key: 'status',
        render: (_, record) =>
          record && (
            <TaskStatusSelect
              projectId={record.projectId}
              onChange={(id) => {
                updateTaskInfo({
                  id: record.id,
                  statusId: id,
                });
              }}
            >
              <div style={{ color: record.statusColor }} className={'w-[60px]'}>
                {record.statusName || '未设置'}
              </div>
            </TaskStatusSelect>
          ),
      },
      {
        title: '负责人',
        dataIndex: 'handler',
        key: 'handler',
        width: 150,
        filters: userFilters,
        filterSearch: true,
        onFilter: (value: any, { handlerId }) => handlerId === value,
        render: (_, record) => (
          <UserSelect
            projectId={record.projectId}
            onChange={(user) => {
              updateTaskInfo({
                id: record.id,
                handlerId: user.userId,
              });
            }}
          >
            <Space>
              {!!record.handlerId ? (
                <>
                  <Avatar size={24} src={record.handlerAvatar} />
                  <span>{record.handlerName}</span>
                </>
              ) : (
                <>
                  <Avatar className={'bg-zinc-200'} size={24} icon={<User />} />
                  <span className={'text-gray-200'}>待认领</span>
                </>
              )}
            </Space>
          </UserSelect>
        ),
      },
      {
        title: '迭代',
        dataIndex: 'group',
        filters: groupFilters,
        filterSearch: true,
        width: 'auto',
        onFilter: (value: any, { groupId }) => groupId === value,
        key: 'group',
        render: (_, { id, projectId, groupName }) => (
          <TaskGroupSelect
            projectId={projectId}
            onChange={(group) => {
              updateTaskInfo({
                id,
                groupId: group.id,
              });
            }}
          >
            <span>{groupName || <span className={'text-gray-200'}>未设置</span>}</span>
          </TaskGroupSelect>
        ),
      },
      {
        title: '优先级',
        dataIndex: 'priority',
        key: 'priority',
        width: 120,
        align: 'center',
        filters: priorityFilters,
        onFilter: (value: any, { priority }) => priority === value,
        sorter: (a, b) => {
          if (a.priority && b.priority) {
            return Number(a.priority.split('P')[1]) - Number(b.priority.split('P')[1]);
          }
          return 1;
        },
        render: (_, record) => (
          <TaskPrioritySelect
            onChange={(priority) => {
              updateTaskInfo({ id: record.id, priority: priority.id });
            }}
          >
            <span>
              {!!record.priority ? <span>{record.priority}</span> : <span className={'text-gray-200'}>未设置</span>}
            </span>
          </TaskPrioritySelect>
        ),
      },
      {
        title: '任务类型',
        filters: typeFilters,
        filterSearch: true,
        align: 'center',
        width: 120,
        onFilter: (value: any, { typeId }) => typeId === value,
        render: (_, record) => (
          <TaskTypeSelect
            projectId={data.projectId}
            onChange={(item) => {
              updateTaskInfo({ id: record?.id, typeId: item.id });
            }}
          >
            <div style={{ color: record.typeColor }} className={'w-[58px] text-center'}>
              {record.typeName || <span className={'text-gray-200'}>未设置</span>}
            </div>
          </TaskTypeSelect>
        ),
      },
      {
        title: '开始时间',
        dataIndex: 'startTime',
        key: 'startTime',
        align: 'center',
        render: (_, { startTime }) => (
          <span className={'font-light text-zinc-400'}>
            {!startTime ? <span className={'text-gray-200'}>/</span> : dayjs(startTime).format(dateFormat)}
          </span>
        ),
      },
      {
        title: '截止时间',
        dataIndex: 'endTime',
        align: 'center',
        key: 'endTime',
        render: (_, { endTime }) => (
          <span className={'font-light text-zinc-400'}>
            {!endTime ? <span className={'text-gray-200'}>/</span> : dayjs(endTime).format(dateFormat)}
          </span>
        ),
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        align: 'center',
        render: (_, { createdAt }) => (
          <span className={'font-light text-zinc-400'}>
            {!createdAt ? <span className={'text-gray-200'}>/</span> : dayjs(createdAt).format(dateTimeFormat)}
          </span>
        ),
      },
      // {
      //   title: '更新时间',
      //   dataIndex: 'updatedAt',
      //   key: 'updatedAt',
      //   align: 'center',
      //   render: (_, { content }) => (
      //     <span>
      //       {!content?.updatedAt ? (
      //         <span className={'text-gray-200'}>--</span>
      //       ) : (
      //         dayjs(content?.updatedAt).format(dateFormat)
      //       )}
      //     </span>
      //   ),
      // },
      {
        title: '操作',
        fixed: 'right',
        width: 80,
        dataIndex: '',
        align: 'center',
        key: 'action',
        render: (_, record) => (
          <Popconfirm
            placement={'left'}
            title="删除当前任务?"
            description="确认删除该任务，删除后无法恢复"
            onConfirm={() => delTaskById(record.id!)}
            okText="Yes"
            cancelText="No"
          >
            <Button className={'group'} shape="circle" type={'text'}>
              <Delete theme="outline" size="16" className={'text-zinc-400 group-hover:text-red-500'} />
            </Button>
          </Popconfirm>
        ),
      },
    ],
    [data.tableData],
  );
  const handleChange = (val: any) => {
    console.log(val);
  };
  return (
    <div
      className={'task-table-container mx-2 h-[calc(100vh-116px)] overflow-y-auto rounded-md bg-white'}
      ref={ref}
      onScroll={useScrollMove(ref, loadMoreTableList)}
    >
      <Table<API.TaskDetailItem>
        bordered
        size={'small'}
        onChange={handleChange}
        sticky={{ offsetHeader: 0 }}
        scroll={{ x: 1600 }}
        rowKey={(record) => record.id}
        columns={columns}
        dataSource={data.tableData?.list || []}
        pagination={false}
      />
    </div>
  );
};

export default TableTask;
