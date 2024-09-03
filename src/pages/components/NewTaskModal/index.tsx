import RickEditor from '@/components/RickEditor';
import TaskUploadFile from '@/pages/components/TaskUploadFile';
import {
  ActivitySource,
  Calendar,
  CategoryManagement,
  DocDetail,
  Pie,
  Slave,
  SortAmountDown,
  Time,
  User,
} from '@icon-park/react';
import { useModel } from '@umijs/max';
import { useDebounceFn } from 'ahooks';
import { Col, Input, Modal, Row, Space } from 'antd';
import { memo } from 'react';
import LaborHour from './comppnents/LaborHour';
import TaskGroup from './comppnents/TaskGroup';
import TaskPriority from './comppnents/TaskPriority';
import TaskStatus from './comppnents/TaskStatus';
import TaskType from './comppnents/TaskType';
import TimeSelect from './comppnents/TimeSelect';
import Title from './comppnents/Title';
import UserSelect from './comppnents/UserSelect';

const NewTaskModal = memo(() => {
  const { data, createTask, params, setParams, fileList, setFileList, createLoading } = useModel('newTask');

  const modalStyle = {
    top: 16,
    padding: 0,
  };

  const formList = [
    {
      title: '任务状态',
      Icon: Pie,
      content: <TaskStatus />,
    },
    {
      title: '任务类型',
      Icon: CategoryManagement,
      content: <TaskType />,
    },
    {
      title: '负责人',
      Icon: User,
      content: <UserSelect />,
    },
    {
      title: '优先级',
      Icon: SortAmountDown,
      content: <TaskPriority />,
    },
    {
      title: '时间',
      Icon: Calendar,
      content: <TimeSelect />,
    },
    {
      title: '计划工时',
      Icon: Time,
      content: <LaborHour />,
    },
    {
      title: '迭代',
      Icon: ActivitySource,
      content: <TaskGroup />,
    },
    {
      title: '任务介绍',
      Icon: DocDetail,
      content: (
        <div className={'rounded-md border border-zinc-100'}>
          <RickEditor content={params.description} onChange={(val) => setParams({ description: val })} />
        </div>
      ),
    },
    {
      title: '附件',
      Icon: Slave,
      content: <TaskUploadFile fileList={fileList} setFileList={setFileList} />,
    },
  ];

  const { run: onTitleChange } = useDebounceFn(
    (e) => {
      console.log(e);
      setParams({ name: e.target.value });
    },
    {
      wait: 300,
    },
  );

  return (
    <Modal
      title={<Title />}
      open={data.show}
      onOk={() => createTask()}
      style={modalStyle}
      styles={{
        footer: {
          margin: 0,
          paddingRight: 16,
          paddingBottom: 16,
        },
      }}
      width={600}
      closable={false}
      destroyOnClose={true}
      onCancel={() => createTask(true)}
      cancelText={'完成后创建下一个'}
      confirmLoading={createLoading}
      className={'[&_.ant-modal-content]:!p-0'}
    >
      <div className={'flex px-5 py-3'}>
        <div className={'mb-2 flex-1'}>
          <Row>
            <Col flex={'1'}>
              <Input
                type="text"
                defaultValue={params.name}
                className={'font-700 p-2 text-[16px] focus:bg-gray-50'}
                placeholder={'请设置任务名称'}
                onChange={onTitleChange}
                variant="borderless"
              />
            </Col>
          </Row>
          {formList.map(({ Icon, title, content }, index) => (
            <Row className={'mt-3'} key={index}>
              <Col span={5}>
                <Space>
                  <Icon theme="outline" size="14" fill="#999" />
                  <span className={'text-zinc-600'}>{title}</span>
                </Space>
              </Col>
              <Col span={19}>{content}</Col>
            </Row>
          ))}
        </div>
      </div>
    </Modal>
  );
});

export default NewTaskModal;
