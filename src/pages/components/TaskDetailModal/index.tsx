import TaskUploadFile from '@/pages/components/TaskUploadFile';
import {
  ActivitySource,
  AddSubset,
  Calendar,
  DocDetail,
  Pie,
  Slave,
  SortAmountDown,
  Time,
  User,
} from '@icon-park/react';
import { useModel } from '@umijs/max';
import { useDebounceFn } from 'ahooks';
import { App, Col, Input, Modal, Row, Spin } from 'antd';
import ChildTask from './components/ChildTask';
import Comment from './components/Comment';
import LaborHourCpt from './components/LaborHourCpt';
import TaskActor from './components/TaskActor';
import TaskDescription from './components/TaskDescription';
import TaskGroup from './components/TaskGroup';
import TaskLogs from './components/TaskLogs';
import TaskPriority from './components/TaskPriority';
import TaskStatus from './components/TaskStatus';
import TaskTimeLine from './components/TaskTimeLine';
import TaskTitle from './components/TaskTitle';
import UserSelect from './components/UserSelect';

const TaskDetailModal = () => {
  const { data, loading, setData, onHide, updateTaskInfo, uploadAttachment, removeResource } = useModel('taskDetail');

  const modalStyle = {
    header: { padding: 0 },
    body: { padding: 0 },
  };

  const { run: onTaskTitleChange } = useDebounceFn(
    (e) => {
      updateTaskInfo({
        name: e.target.value,
      });
    },
    { wait: 300 },
  );

  // 新增条目时请抽离代码 THX
  const TaskItems = [
    {
      Icon: Pie,
      label: '任务状态',
      component: <TaskStatus />,
    },
    {
      Icon: User,
      label: '负责人',
      component: <UserSelect />,
    },
    {
      Icon: SortAmountDown,
      label: '优先级',
      component: <TaskPriority />,
    },
    {
      Icon: Calendar,
      label: '时间',
      component: <TaskTimeLine />,
    },
    {
      Icon: ActivitySource,
      label: '迭代',
      component: <TaskGroup />,
    },
    {
      Icon: DocDetail,
      label: '任务描述',
      component: <TaskDescription />,
    },
    {
      Icon: AddSubset,
      label: '子任务',
      component: <ChildTask />,
    },
    {
      Icon: Time,
      label: '工时',
      component: <LaborHourCpt />,
    },
    {
      Icon: Slave,
      label: '附件',
      component: (
        <TaskUploadFile
          fileList={data.resourceList || []}
          setCurrentFile={uploadAttachment}
          removeResource={removeResource}
          setFileList={(fileList: any) => setData({ resourceList: fileList })}
        />
      ),
    },
  ];

  return (
    <Modal
      title={<TaskTitle />}
      open={data.show}
      wrapClassName={'task-detail-modal'}
      width={1000}
      forceRender
      footer={null}
      closable={false}
      destroyOnClose={true}
      onCancel={onHide}
      styles={modalStyle}
      style={{ top: 16, padding: 0 }}
      className={'[&_.ant-modal-content]:!p-0'}
    >
      <App>
        <Spin tip="Loading..." spinning={!data.task && loading}>
          <div className={'h-[calc(100vh-90px)] bg-white'}>
            <div className={'box-border flex h-full'}>
              <div className={'h-full w-full border-r border-r-gray-100'}>
                <div className={'h-[calc(100%-2px)] w-full min-w-[600px] overflow-y-auto px-5 pb-5 pl-8 pt-3'}>
                  {!!data.task && (
                    <Input.TextArea
                      autoSize
                      className={'p-2 text-lg !font-semibold focus:bg-gray-50'}
                      defaultValue={data.task?.name}
                      placeholder={'请设置任务名'}
                      onChange={onTaskTitleChange}
                      variant="borderless"
                    />
                  )}

                  {TaskItems.map(({ Icon, label, component }, index) => {
                    return (
                      <Row className={'mt-5'} key={index}>
                        <Col span={4} className={'pt-1'}>
                          <span className={'flex items-start space-x-2'}>
                            <span>
                              <Icon theme="outline" size="14" fill="#666" />
                            </span>
                            <span className={'whitespace-nowrap text-gray-500'}>{label}</span>
                          </span>
                        </Col>
                        <Col span={20}>{!!data.task && component}</Col>
                      </Row>
                    );
                  })}
                </div>
              </div>
              <div key={'task-right'} className={'relative flex w-[450px] min-w-[400px] flex-col'}>
                <TaskActor />
                <TaskLogs />
                <Comment />
              </div>
            </div>
          </div>
        </Spin>
      </App>
    </Modal>
  );
};

export default TaskDetailModal;
