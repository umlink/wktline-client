import { Application, Home, Plan, Schedule } from '@icon-park/react';
import { history } from '@umijs/max';
import { useEffect, useState } from 'react';

const menuList = [
  {
    name: '首页',
    path: '/',
    Icon: Home,
  },
  {
    name: '项目',
    path: '/project',
    Icon: Application,
  },
  {
    name: '工时',
    path: '/labor-hour',
    Icon: Plan,
  },
  {
    name: '日程',
    path: '/schedule',
    Icon: Schedule,
  },
];

export default () => {
  const [pathReg, setPathReg] = useState<RegExp>();
  const upPathReg = (str: string) => {
    setPathReg(new RegExp(str === '/' ? '/$' : `^${str}`, 'gi'));
  };

  const checkSelected = (path: string): boolean => {
    return !!pathReg?.test(path);
  };
  useEffect(() => {
    upPathReg(history.location.pathname);
    history.listen((update) => {
      upPathReg(update.location.pathname);
    });
  }, []);

  return (
    <div className={'flex flex-col items-center'}>
      {menuList.map(({ path, name, Icon }, index) => {
        return (
          <div
            className={`mt-2 flex h-[55px] w-[55px]
            cursor-pointer flex-col
            items-center justify-center rounded-lg p-1 text-center text-zinc-600
            hover:bg-primary-100 ${checkSelected(path) ? '!bg-primary-100' : ''}`}
            key={index}
            onClick={() => history.push(path)}
          >
            <span className={'leading-none text-primary'}>
              <Icon theme="outline" size="18" />
            </span>
            <span key="name" className={`mt-1 text-[13px] leading-none`}>
              {name}
            </span>
          </div>
        );
      })}
    </div>
  );
};
