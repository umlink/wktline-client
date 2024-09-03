import UserSelect from '@/pages/components/UserSelect';
import { CloseOne, User } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { Avatar, Space } from 'antd';

export default () => {
  const { data, selectData, setSelectData, params, setParams } = useModel('newTask');
  return (
    <Space align={'center'} className={'group rounded-2xl pr-1 hover:bg-gray-100'}>
      <UserSelect
        projectId={data.projectId}
        onChange={(user) => {
          setParams({ handlerId: user.userId });
          setSelectData({ taskHandler: user });
        }}
      >
        <Space>
          <Avatar className={'bg-zinc-200'} src={selectData.taskHandler?.avatar} icon={<User />} size={24} />
          {selectData.taskHandler ? (
            <span>{selectData.taskHandler.username}</span>
          ) : (
            <span className={'font-light text-zinc-300'}>{'待认领'}</span>
          )}
        </Space>
      </UserSelect>
      <span
        onClick={() => {
          setSelectData({ taskHandler: undefined });
          setParams({ handlerId: undefined });
        }}
        className={'hidden align-middle text-zinc-200 hover:text-zinc-300 group-hover:inline'}
      >
        {!!params.handlerId && <CloseOne className={'cursor-pointer'} theme="filled" size="16" />}
      </span>
    </Space>
  );
};
