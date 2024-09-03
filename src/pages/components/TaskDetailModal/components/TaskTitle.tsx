import TaskTypeSelect from '@/pages/components/TaskTypeSelect';
import { AddSubset, Back, CategoryManagement, Close, CopyLink, Delete } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { App, Button, Space } from 'antd';

const TaskTitle = () => {
  const { modal } = App.useApp();
  const { data, onHide, delTaskById, updateTaskInfo, getPrevTaskDetail, lookParentTask } = useModel('taskDetail');

  const handleDelTask = () => {
    modal.confirm({
      title: '确认删除当前任务？',
      content: '删除后无法恢复',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        delTaskById();
      },
    });
  };

  return (
    <div className={'flex w-full items-center justify-between border-b border-b-gray-100 px-4 py-3 text-gray-600'}>
      <span className={'flex items-center'}>
        <Space className={'flex items-center text-sm leading-none'} align="center">
          {data.taskIdQueue.length > 1 && (
            <Button type={'dashed'} onClick={() => getPrevTaskDetail()}>
              <Back theme={'filled'} size={16} />
              <span className={'ml-2'}>返回</span>
            </Button>
          )}
          {!!data.task?.parentId && (
            <Button type={'dashed'} onClick={() => lookParentTask(data.task!.parentId!)}>
              <AddSubset theme={'filled'} size={16} />
              <span className={'ml-2'}>父任务</span>
            </Button>
          )}
          <CategoryManagement theme="outline" size="16" fill="#0089ff" />
          <span>
            {!!data.task && (
              <TaskTypeSelect
                projectId={data.projectId}
                onChange={(item) => {
                  updateTaskInfo({ typeId: item.id });
                }}
              >
                <span style={{ color: data.task?.typeColor }}>{data.task?.typeName || '任务类型'}</span>
              </TaskTypeSelect>
            )}
          </span>
        </Space>
      </span>
      <div>
        <Space>
          <Button type="text" icon={<CopyLink theme="outline" size="16" fill="#999" />} />
          <Button
            type="text"
            className={'text-[#999] hover:!text-red-500'}
            onClick={handleDelTask}
            icon={<Delete theme="outline" size="16" />}
          />
          <Button onClick={onHide} type="text" icon={<Close theme="outline" size="16" fill="#666" />} />
        </Space>
      </div>
    </div>
  );
};

export default TaskTitle;
