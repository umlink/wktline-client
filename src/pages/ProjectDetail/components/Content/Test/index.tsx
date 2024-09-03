import Api from '@/api/modules';
import { useModel } from '@@/exports';
import { useRequest } from '@umijs/max';
import { useSetState } from 'ahooks';
import type { TableProps } from 'antd';
import { Avatar, Space, Table } from 'antd';
import { useEffect } from 'react';
import CaseEditor from './components/CaseEditor';
import TestCaseFilter from './components/Filters';

type StateType = {
  pageNo: number;
  pageSize: number;
  list: API.TestCaseItem[];
  caseDetail?: API.GetTestCaseRes;
};
export default () => {
  const { data } = useModel('ProjectDetail.model');
  const [state, setState] = useSetState<StateType>({
    list: [],
    pageNo: 1,
    pageSize: 20,
  });
  const { run: getCaseList, loading } = useRequest(
    () => {
      return Api.TestCase.getCaseList({
        pageNo: state.pageNo,
        pageSize: state.pageSize,
        projectId: data.projectId,
      }).then((res) => {
        if (res.success && res.data) {
          setState({ list: res.data.list || [] });
        }
      });
    },
    { manual: true },
  );

  const getCaseDetail = (id: string) => {
    Api.TestCase.getCaseDetail({
      id,
      projectId: data.projectId,
    }).then((res) => {
      if (res.success) {
        setState({ caseDetail: res.data as API.GetTestCaseRes });
      }
    });
  };

  useEffect(() => {
    getCaseList();
  }, []);

  const columns: TableProps['columns'] = [
    {
      title: '用例名',
      dataIndex: 'name',
      key: 'name',
      width: 320,
      render: (text, record) => <a onClick={() => getCaseDetail(record.id)}>{text}</a>,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: '创建人',
      dataIndex: 'creatorId',
      key: 'creatorId',
      render: (_, record) => {
        return (
          <div className={'space-x-2'}>
            <Avatar size={26} src={record.creatorAvatar} />
            <span>{record.creatorName}</span>
          </div>
        );
      },
    },
    {
      title: '测试进度',
      dataIndex: 'progress',
      key: 'progress',
      render: (text) => <span>{text}%</span>,
    },
    {
      title: '参与人',
      dataIndex: 'actorIds',
      key: 'actorIds',
      render: (actorIds) => <span>{actorIds.length}人</span>,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 180,
      render: (text) => (text ? text : '/'),
    },
    {
      title: '操作',
      key: '操作',
      align: 'center',
      width: 160,
      render: (_, record) => (
        <Space size={4} className={'cursor-pointer space-x-1'}>
          <a onClick={() => getCaseDetail(record.id)}>查看</a>
          <span className={'text-zinc-300'}>|</span>
          <a onClick={() => getCaseDetail(record.id)}>编辑</a>
          <span className={'text-zinc-300'}>|</span>
          <span>删除</span>
        </Space>
      ),
    },
  ];
  return (
    <div className={'relative h-full w-full p-2'}>
      <div className={'h-full rounded-md bg-white'}>
        <TestCaseFilter />
        <Table<API.TestCaseItem>
          pagination={false}
          bordered
          className={'w-full'}
          columns={columns}
          dataSource={state.list}
        />
      </div>
      <CaseEditor
        projectId={data.projectId}
        caseDetail={state.caseDetail}
        onClose={() => setState({ caseDetail: undefined })}
      />
    </div>
  );
};
