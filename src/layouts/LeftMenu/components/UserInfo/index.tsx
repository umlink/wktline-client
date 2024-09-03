import { SYSTEM_ROLE } from '@/constants';
import { Power, Qiyehao, SettingTwo } from '@icon-park/react';
import { history, useModel } from '@umijs/max';
import { Avatar, Divider, Popover } from 'antd';
import jsCookie from 'js-cookie';
import { useState } from 'react';

export default () => {
  const { initialState: userInfo } = useModel('@@initialState');
  const [open, setOpen] = useState(false);

  const onLogout = () => {
    setOpen(false);
    jsCookie.remove('__wkt_tk__');
    location.replace('/login');
  };
  const openSettingsPage = () => {
    setOpen(false);
    history.push('/settings');
  };

  const settings = () => {
    if (userInfo?.role === SYSTEM_ROLE.USER) return null;
    return (
      <div
        onClick={openSettingsPage}
        className={
          'mt-1 flex cursor-pointer items-center space-x-2 rounded-md px-2 py-1 text-zinc-500 hover:bg-zinc-100'
        }
      >
        <SettingTwo theme="outline" size="16" />
        <span>系统设置</span>
      </div>
    );
  };
  const content = (
    <div className="min-w-[180px]">
      <div className={'border-b border-b-zinc-100 p-2'}>
        <h4 className={'py-2 text-zinc-500'}>{userInfo?.username}</h4>
        <p className={'flex items-center space-x-1 text-xs font-[400] text-zinc-400'}>
          <Qiyehao size={16} theme="outline" className={'text-primary'} />
          <span>宇宙最大科技网络有限公司</span>
        </p>
      </div>
      {settings()}
      <Divider className={'my-1'} />
      <div
        onClick={onLogout}
        className={'flex cursor-pointer items-center space-x-2 rounded-md px-2 py-1 text-red-500 hover:bg-zinc-100'}
      >
        <Power theme="outline" size="16" />
        <span>退出</span>
      </div>
    </div>
  );

  return (
    <Popover overlayInnerStyle={{ padding: 4 }} placement="rightBottom" title={false} content={content} trigger="hover">
      <Avatar size={36} src={userInfo?.avatar} />
    </Popover>
  );
};
