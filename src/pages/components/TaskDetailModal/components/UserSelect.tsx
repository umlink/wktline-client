import UserSelect from '@/pages/components/UserSelect';
import { CloseOne, User } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { Avatar, Space } from 'antd';

const HeadUserSelect = () => {
  const { data, updateTaskInfo } = useModel('taskDetail');
  return (
    <Space
      className={`
      group rounded-lg
      bg-gray-50
      p-[2px] pr-2 transition-all
      hover:bg-gray-100`}
      align={'center'}
    >
      {!!data.task && (
        <UserSelect projectId={data.projectId} onChange={(user) => updateTaskInfo({ handlerId: user.userId })}>
          <Space>
            <Avatar
              shape={'square'}
              className={'bg-zinc-300'}
              src={data.task?.handlerAvatar}
              icon={<User />}
              size={25}
            />
            <span>{data.task?.handlerName || <span className={'text-zinc-300'}>{'待认领'}</span>}</span>
          </Space>
        </UserSelect>
      )}
      <span className={'hidden align-middle text-zinc-300 hover:text-zinc-400 group-hover:inline'}>
        {!!data.task?.handlerId && (
          <CloseOne
            onClick={() => {
              updateTaskInfo({ handlerId: '' });
            }}
            className={'cursor-pointer'}
            theme="filled"
            size="16"
          />
        )}
      </span>
    </Space>
  );
};
export default HeadUserSelect;
