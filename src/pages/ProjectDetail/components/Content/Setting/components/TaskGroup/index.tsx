import useScrollMove from '@/hooks/useScrollMove';
import EmptyData from '@/pages/components/EmptyData';
import { Delete, Editor, Search } from '@icon-park/react';
import { App, Button, Input, Space, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';
import { useRef, useState } from 'react';
import GroupForm from './GroupForm';
import useService from './useService';

const TaskGroupPage = () => {
  const { modal } = App.useApp();
  const ref = useRef(null);
  const [editData, setEditData] = useState<{
    index: number;
    data: API.TaskGroupItem;
  }>();
  const { loading, params, setParams, resetPageNo, groupList, reloadTaskGroupList, updateGroupRow, delGroup } =
    useService();

  const onDelGroup = (id: string, index: number) => {
    modal.confirm({
      title: '警告',
      content: '删除后无法恢复（该迭代下含有任务时无法删除）',
      onOk: () => delGroup(id, index),
    });
  };

  const columns: ColumnsType<API.TaskGroupItem> = [
    {
      title: '排序',
      dataIndex: 'user',
      key: 'user',
      width: 100,
      align: 'center',
      render: (_, record, index) => <span>{index + 1}</span>,
    },
    {
      title: '迭代名称',
      dataIndex: 'groupName',
      key: 'groupName',
      width: 220,
      ellipsis: true,
      render: (name) => <a>{name}</a>,
    },

    {
      title: '描述信息',
      dataIndex: 'description',
      key: 'description',
      ellipsis: true,
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
              console.log(index, record);
              setEditData({ index, data: record });
            }}
          >
            <Editor theme="outline" size="16" fill="#999" />
          </Button>
          <Button shape="circle" type={'text'} title={'删除'} onClick={() => onDelGroup(record.id, index)}>
            <Delete theme="outline" size="16" fill="#999" />
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className={'h-full'}>
      <div className={'mb-4 flex items-center justify-between'}>
        <Input
          suffix={<Search />}
          size={'middle'}
          value={params.keywords}
          onChange={(e) =>
            setParams({
              pageNo: 1,
              keywords: e.target.value,
            })
          }
          className={'[&_input]:placeholder:font-300 !w-[220px]'}
          placeholder={'根据迭代名称搜索'}
        />
        <GroupForm callback={resetPageNo}>
          <Button type={'primary'}>添加</Button>
        </GroupForm>
      </div>
      <div
        className={'h-[calc(100vh-204px)] overflow-y-auto'}
        ref={ref}
        onScroll={useScrollMove(ref, reloadTaskGroupList)}
      >
        <Spin spinning={loading}>
          <Table<API.TaskGroupItem>
            showHeader={true}
            bordered
            size={'small'}
            sticky={{ offsetHeader: 0 }}
            rowKey={(record) => record.id}
            columns={columns}
            pagination={false}
            dataSource={groupList || []}
          />
          {params.finished && groupList.length > 0 && <EmptyData />}
        </Spin>
      </div>
      <GroupForm
        open={!!editData}
        group={editData?.data}
        onClose={() => setEditData(undefined)}
        callback={(params) => {
          updateGroupRow(params, editData!.index);
          setEditData(undefined);
        }}
      />
    </div>
  );
};

export default TaskGroupPage;
