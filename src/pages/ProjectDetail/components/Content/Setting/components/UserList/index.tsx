import { PROJECT_USER_ROLE } from '@/constants';
import useQueryParams from '@/hooks/useQueryParams';
import InviteModal from '@/pages/ProjectDetail/components/InviteModal';
import { Search } from '@icon-park/react';
import { Button, Divider, Dropdown, Input, Pagination, Popconfirm, Select, Space, Spin, Table } from 'antd';
import { MenuProps } from 'antd/es/menu';
import { ColumnsType } from 'antd/es/table';
import AllUserSelect from './AllUserSelect';
import dataColumns from './columns';
import useService from './useService';

const ProjectUserList = () => {
  const { data, setData, loading, delUser, updateUserRole, getUserList, onKeywordsChange } = useService();
  const [query] = useQueryParams();
  const getActionMenus = (user: API.ProjectUserItem): MenuProps['items'] => {
    const items: MenuProps['items'] = [];
    if (user.role === PROJECT_USER_ROLE.ADMIN) {
      items.push({
        key: PROJECT_USER_ROLE.USER,
        label: <a>设为普通用户</a>,
      });
    }
    if (user.role === PROJECT_USER_ROLE.USER) {
      items.push({
        key: PROJECT_USER_ROLE.ADMIN,
        label: <a>设为管理员</a>,
      });
    }
    return items;
  };

  const columns: ColumnsType<API.ProjectUserItem> = [
    ...dataColumns,
    {
      title: '操作',
      fixed: 'right',
      width: 150,
      dataIndex: '',
      align: 'center',
      key: 'action',
      render: (_, record, index) => (
        <Space split={<Divider type="vertical" />}>
          {record.role === PROJECT_USER_ROLE.SUPER_ADMIN ? (
            <span className={'px-3 text-zinc-300'}>/</span>
          ) : (
            <Dropdown
              menu={{
                items: getActionMenus(record),
                onClick: ({ key }: any) => {
                  updateUserRole(
                    {
                      userId: record.userId,
                      projectId: query.id,
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
          )}
          <Popconfirm
            title={'温馨提示'}
            placement={'topLeft'}
            description={<p>确认从该项目中移除 【{record.username}】?</p>}
            onConfirm={() => delUser(record.userId, index)}
            okText="确认"
            cancelText="取消"
          >
            <span className={'cursor-pointer text-zinc-500'}>移除</span>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className={'mb-4 flex items-center justify-between'}>
        <div className={'space-x-4'}>
          <Input
            suffix={<Search />}
            size={'middle'}
            onChange={onKeywordsChange}
            className={'[&_input]:placeholder:font-300 !w-[220px]'}
            placeholder={'根据用户名搜索'}
          />
          <Select
            defaultValue=""
            style={{ width: 110 }}
            onChange={(val) => setData({ role: val })}
            options={[
              { value: '', label: '全部用户' },
              { value: PROJECT_USER_ROLE.SUPER_ADMIN, label: '项目负责人' },
              { value: PROJECT_USER_ROLE.ADMIN, label: '管理员' },
              { value: PROJECT_USER_ROLE.USER, label: '普通用户' },
            ]}
          />
        </div>
        <Space size={16}>
          <InviteModal>
            <Button type={'primary'} ghost>
              邀请
            </Button>
          </InviteModal>
          <AllUserSelect onRefresh={getUserList}>
            <Button type={'primary'}>添加</Button>
          </AllUserSelect>
        </Space>
      </div>
      <div className={'max-h-[calc(100vh-254px)] overflow-y-auto'}>
        <Spin spinning={loading}>
          <Table<API.ProjectUserItem>
            bordered
            size={'small'}
            sticky={{ offsetHeader: 0 }}
            rowKey={(record) => record.id}
            columns={columns}
            pagination={false}
            dataSource={data.userList || []}
          />
        </Spin>
      </div>
      <div className={'text-right'}>
        <Pagination
          className={'pt-4'}
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

export default ProjectUserList;
