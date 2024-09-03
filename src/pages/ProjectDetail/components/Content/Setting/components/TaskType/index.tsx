import { Delete, Editor } from '@icon-park/react';
import { App, Button, Space, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import TaskTypeForm from './TypeForm';
import useService from './useService';

const TaskTypePage = () => {
  const { modal } = App.useApp();
  const { typeList, getTaskTypeList, delType } = useService();

  const onDelStatus = (id: string) => {
    modal.confirm({
      title: '警告',
      content: '删除后无法恢复（该状态下含有任务时无法删除）',
      onOk: () => delType(id),
    });
  };

  const columns: ColumnsType<API.TaskTypeItem> = [
    {
      title: '排序',
      dataIndex: 'index',
      key: 'index',
      width: 100,
      align: 'center',
      ellipsis: true,
      render: (_, record, index) => <span>{index + 1}</span>,
    },
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
      width: 180,
      ellipsis: true,
      render: (_, record) => <span style={{ color: record.color }}>{record.name}</span>,
    },
    {
      title: '颜色',
      align: 'center',
      dataIndex: 'color',
      key: 'color',
      render: (_, record) => <span style={{ color: record.color }}>{record.color}</span>,
    },
    {
      title: '操作',
      width: 100,
      dataIndex: '',
      align: 'center',
      key: 'action',
      render: (_, record) => (
        <Space>
          <TaskTypeForm type={record} callback={getTaskTypeList}>
            <Button shape="circle" type={'text'} title={'编辑'}>
              <Editor theme="outline" size="16" fill="#999" />
            </Button>
          </TaskTypeForm>
          <Button shape="circle" type={'text'} title={'删除'} onClick={() => onDelStatus(record.id)}>
            <Delete theme="outline" size="16" fill="#999" />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className={'mb-4 flex items-center justify-between'}>
        <span className={'text-xs text-zinc-400'}>温馨提示：任务类型指：项目调研、项目立项、开发任务、UI设计等等</span>
        <TaskTypeForm callback={getTaskTypeList}>
          <Button type={'primary'}>添加</Button>
        </TaskTypeForm>
      </div>
      <Table<API.TaskTypeItem>
        bordered
        size={'small'}
        sticky={{ offsetHeader: 0 }}
        rowKey={(record) => record.id}
        columns={columns}
        pagination={false}
        dataSource={typeList || []}
      />
    </div>
  );
};

export default TaskTypePage;
