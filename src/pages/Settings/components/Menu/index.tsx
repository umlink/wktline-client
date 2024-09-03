import { SettingsType } from '@/pages/Settings/model';
import { Group, Qiyehao, Setting, SortOne, User } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import React from 'react';
import styles from './index.less';

function genMenuItem(label: React.ReactNode, key?: React.Key | null, Icon?: any, children?: MenuItem[]): MenuItem {
  return {
    key,
    icon: <Icon theme="outline" size="14" />,
    children,
    label,
  } as MenuItem;
}

type MenuItem = Required<MenuProps>['items'][number];

export default () => {
  const { state, setState } = useModel('Settings.model');

  const items: MenuItem[] = [
    genMenuItem('用户管理', SettingsType.USER, User),
    genMenuItem('租户管理', SettingsType.TENANT, Qiyehao),
    genMenuItem('系统配置', SettingsType.SYSTEM, Setting),
    genMenuItem('项目分组', SettingsType.PROJECT_GROUP, Group),
    genMenuItem('任务优先级', SettingsType.TASK_PRIORITY, SortOne),
  ];

  return (
    <div className={'bg-white'}>
      <div className={styles.settingsMenu}>
        <div className={`flex items-center justify-between ${styles.titleBox}`}>
          <h3 className={'m-0 font-bold'}>设置</h3>
        </div>
        <Menu
          className={styles.menus}
          defaultSelectedKeys={[state.activeKey]}
          onSelect={({ key }) => setState({ activeKey: key as SettingsType })}
          items={items}
        />
      </div>
    </div>
  );
};
