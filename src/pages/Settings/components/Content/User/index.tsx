import { PROJECT_USER_ROLE } from '@/constants';
import EmptyData from '@/pages/components/EmptyData';
import { Search } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { Divider, Dropdown, Input, Pagination, Popconfirm, Select, Space, Spin, Table } from 'antd';
import { MenuProps } from 'antd/es/menu';
import { ColumnsType } from 'antd/es/table';
import dataColumns from './columns';
import useService from './useService';

const SettingsUser = () => {
  const { initialState } = useModel('@@initialState');
  const { data, setData, loading, delUser, updateUserInfo, onKeywordsChange } = useService();

  const getActionMenus = (user: API.UserBaseInfo): MenuProps['items'] => {
    const items: MenuProps['items'] = [
      {
        key: PROJECT_USER_ROLE.USER,
        label: <a>设为普通用户</a>,
      },
      {
        key: PROJECT_USER_ROLE.ADMIN,
        label: <a>设为管理员</a>,
      },
      {
        key: PROJECT_USER_ROLE.SUPER_ADMIN,
        label: <a className={'!text-red-600'}>设为超级管理员</a>,
      },
    ].filter((item) => item.key !== user.role);
    return items;
  };

  const columns: ColumnsType<API.UserBaseInfo> = [
    ...dataColumns,
    {
      title: '操作',
      fixed: 'right',
      width: 150,
      dataIndex: '',
      align: 'center',
      key: 'action',
      render: (_, record, index) =>
        initialState?.id === record.id ? (
          <span className={'text-zinc-200'}>/</span>
        ) : (
          <Space size={0} split={<Divider type="vertical" />}>
            <Dropdown
              menu={{
                items: getActionMenus(record),
                onClick: ({ key }: any) => {
                  updateUserInfo(
                    {
                      id: record.id,
                      role: key,
                    },
                    index,
                  );
                },
              }}
              arrow={{ pointAtCenter: true }}
            >
              <a className={'text-primary'}>编辑</a>
            </Dropdown>
            <Popconfirm
              title={'温馨提示'}
              placement={'topLeft'}
              description={<p>确认删除用户： 【{record.username}】?</p>}
              onConfirm={() => delUser(record.id, index)}
              okText="确认"
              cancelText="取消"
            >
              <a className={'cursor-pointer text-zinc-500'}>删除</a>
            </Popconfirm>
          </Space>
        ),
    },
  ];

  return (
    <div>
      <div className={'mb-4 flex items-center'}>
        <div className={'space-x-4'}>
          <Input
            suffix={<Search />}
            size={'middle'}
            onChange={onKeywordsChange}
            className={'[&_input]:placeholder:font-300 !w-[220px]'}
            placeholder={'根据用户名搜索'}
          />
          <Select
            defaultValue={''}
            style={{ width: 120 }}
            onChange={(val) => setData({ role: val })}
            options={[
              { value: '', label: '全部权限' },
              { value: PROJECT_USER_ROLE.SUPER_ADMIN, label: '超级管理员' },
              { value: PROJECT_USER_ROLE.ADMIN, label: '管理员' },
              { value: PROJECT_USER_ROLE.USER, label: '普通用户' },
            ]}
          />
        </div>
      </div>
      <div className={'max-h-[calc(100vh-154px)] overflow-y-auto rounded-lg'}>
        <Spin spinning={loading}>
          <Table<API.UserBaseInfo>
            bordered
            size={'small'}
            pagination={false}
            sticky={{ offsetHeader: 0 }}
            rowKey={(record) => record.id}
            columns={columns}
            dataSource={data.userList || []}
          />
        </Spin>
        {!data.userList.length && <EmptyData />}
      </div>
      <div className={'text-right'}>
        <Pagination
          className={'pt-4'}
          hideOnSinglePage
          showSizeChanger
          showTotal={(total) => <span>总共 {total} 人</span>}
          total={data.total}
          pageSize={data.pageSize}
          current={data.pageNo}
          onChange={(pageNo, pageSize) => {
            setData({
              pageNo,
              pageSize,
            });
          }}
        />
      </div>
    </div>
  );
};

export default SettingsUser;
