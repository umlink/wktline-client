import { UserLaborItem } from '@/pages/LaborHour/model';
import { CloseOne, Right } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { App, Avatar } from 'antd';

type DataType = {
  item: UserLaborItem;
  preIndex: number;
};

const UserHeader = (props: DataType) => {
  const { modal } = App.useApp();
  const { data: laborHourData, setData, getLaborHourByUserId, delProjectLaborUser } = useModel('LaborHour.model');
  const { userInfo, totalHour } = props.item;
  const itemClass = 'group text-center border-r p-2 border-r-zinc-200 w-[1/8]';
  const { initialState } = useModel('@@initialState');
  const isSelf = initialState?.id === userInfo.id;
  const delUser = () => {
    modal.confirm({
      title: '温馨提示',
      content: '确认删除当前订阅用户？',
      onOk: () => {
        delProjectLaborUser(userInfo.id, props.preIndex);
      },
    });
  };

  const fetchLaborHourDetail = () => {
    const openUserIds = laborHourData.openUserIds;
    const userId: string = userInfo.id;
    const openIndex = openUserIds.indexOf(userId);
    if (openIndex > -1) {
      openUserIds.splice(openIndex, 1);
    } else {
      openUserIds.push(userId);
      getLaborHourByUserId(props.preIndex, userInfo.id);
    }
    setData({ openUserIds: [...openUserIds] });
  };

  return (
    <div className={`${itemClass} group relative min-w-[200px] cursor-pointer px-4 py-3 text-right`}>
      <div className={'flex items-center justify-between'}>
        <div className={'flex items-center space-x-2'}>
          <Avatar size={36} src={userInfo.avatar} />
          <div className={'text-left'}>
            <p className={'mb-1'}>{userInfo.username}</p>
            <p className={'text-xs text-zinc-400'}>合计：{totalHour}h </p>
          </div>
        </div>
        <Right
          className={'cursor-pointer rounded-sm p-2 hover:bg-gray-50'}
          onClick={fetchLaborHourDetail}
          theme="outline"
          size="18"
          fill={'#999'}
        />
      </div>
      {!isSelf && (
        <span
          onClick={delUser}
          className={'absolute left-1 top-1 hidden cursor-pointer leading-none text-zinc-400 group-hover:inline-block'}
        >
          <CloseOne theme="outline" size="20" />
        </span>
      )}
    </div>
  );
};

export default UserHeader;
