import { Delete, Editor } from '@icon-park/react';
import { App, Button, Space, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useState } from 'react';
import PriorityForm from './PriorityForm';
import useService from './useService';

const TaskPriorityPage = () => {
  const { modal } = App.useApp();
  const [editData, setEditData] = useState<{
    index: number;
    data: API.TaskPriorityItem;
  }>();
  const { loading, priorityList, getTaskPriority, updatePriorityRow, delPriority } = useService();

  const onDelPriority = (id: string, index: number) => {
    modal.confirm({
      title: '警告',
      content: '删除后无法恢复（该优先级下含任务时无法删除）',
      onOk: () => delPriority(id, index),
    });
  };

  const columns: ColumnsType<API.TaskPriorityItem> = [
    {
      title: '优先级',
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      render: (text, record) => <span style={{ color: record.color }}>{text}</span>,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: '名称',
      render: (text, record) => <span style={{ color: record.color }}>{text}</span>,
    },
    {
      title: '颜色',
      dataIndex: 'color',
      key: 'color',
      render: (color) => <span style={{ color }}>{color}</span>,
    },

    {
      title: '操作',
      width: 100,
      dataIndex: '',
      align: 'center',
      key: 'action',
      render: (_, record, index) => (
        <Space>
          <Button
            shape="circle"
            type={'text'}
            title={'编辑'}
            onClick={() => {
              setEditData({ index, data: record });
            }}
          >
            <Editor theme="outline" size="16" fill="#999" />
          </Button>
          <Button shape="circle" type={'text'} title={'删除'} onClick={() => onDelPriority(record.id, index)}>
            <Delete theme="outline" size="16" fill="#999" />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className={'h-full'}>
      <div className={'mb-4 flex items-center justify-between'}>
        <div className={'text-orange-400'}>任务优先级ID必须为 P 开头，数字结尾</div>
        <PriorityForm callback={getTaskPriority}>
          <Button type={'primary'}>添加</Button>
        </PriorityForm>
      </div>
      <div className={'h-[calc(100vh-204px)] overflow-y-auto'}>
        <Spin spinning={loading}>
          <Table<API.TaskPriorityItem>
            showHeader={true}
            bordered
            size={'small'}
            sticky={{ offsetHeader: 0 }}
            rowKey={(record) => record.id}
            columns={columns}
            pagination={false}
            dataSource={priorityList || []}
          />
        </Spin>
      </div>
      <PriorityForm
        open={!!editData}
        priority={editData?.data}
        onClose={() => setEditData(undefined)}
        callback={(params) => {
          updatePriorityRow(params, editData!.index);
          setEditData(undefined);
        }}
      />
    </div>
  );
};

export default TaskPriorityPage;
