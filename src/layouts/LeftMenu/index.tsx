/*
 * @Author: ZhaoFuLin
 * @Date: 2022-10-21 20:52:12
 * @LastEditTime: 2022-10-24 10:43:15
 */
import logo from '@/assets/images/logo.png';
import BottomMenu from '@/layouts/LeftMenu/components/BottomMenu';
import TopMenu from '@/layouts/LeftMenu/components/TopMenu';
import { Avatar } from 'antd';

export default () => {
  return (
    <div className={'relative z-[1] flex h-screen w-[70px] select-none  flex-col items-center bg-white shadow-rl'}>
      <span className={'p-2 '}>
        <Avatar size={40} src={logo} />
      </span>
      <TopMenu />
      <BottomMenu />
    </div>
  );
};
