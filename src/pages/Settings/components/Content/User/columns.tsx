import { Avatar, Space } from 'antd';
import { ColumnsType } from 'antd/es/table';

const RoleMap: Record<string, any> = {
  SUPER_ADMIN: <span className={'text-red-600'}>超级管理员</span>,
  ADMIN: <span className={'text-yellow-600'}>管理员</span>,
  USER: <span className={'text-zinc-400'}>普通用户</span>,
};

const columns: ColumnsType<API.UserBaseInfo> = [
  {
    title: '序号',
    align: 'center',
    dataIndex: 'id',
    key: 'id',
    width: 80,
    ellipsis: true,
    render: (_, record, index) => <span>{index + 1}</span>,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    key: 'username',
    width: 300,
    ellipsis: true,
    render: (_, record) => (
      <Space>
        <Avatar size={28} src={record?.avatar} />
        <span>{record.username || ''}</span>
      </Space>
    ),
  },
  {
    title: '昵称',
    align: 'center',
    dataIndex: 'nickname',
    key: 'nickname',
    ellipsis: true,
    render: (_, record) => <span>{record.nickname || '--'}</span>,
  },
  {
    title: '权限',
    align: 'center',
    dataIndex: 'role',
    key: 'role',
    render: (text) => RoleMap[text],
  },
  {
    title: '邮箱',
    align: 'center',
    dataIndex: 'email',
    key: 'email',
    ellipsis: true,
  },
];

export default columns;
