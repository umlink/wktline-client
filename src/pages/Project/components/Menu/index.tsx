import { LOCAL_KEY } from '@/constants';
import { AllApplication, MenuUnfoldOne, Newlybuild, Palm, UserBusiness } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { useLocalStorageState } from 'ahooks';
import { Button, Menu } from 'antd';
import type { MenuProps } from 'antd/es/menu';
import React, { useEffect } from 'react';
import styles from './index.less';

function genMenuItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

type MenuItem = Required<MenuProps>['items'][number];

export default () => {
  const { globalData, onToggleMenu } = useModel('global');
  const { resetMenuParams } = useModel('Project.model');
  const [activeKey, setActiveKey] = useLocalStorageState(LOCAL_KEY.ACTIVE_PROJECT_TYPE, {
    defaultValue: 'ALL',
  });
  // <Palm theme="outline" size="24" fill="#333"/>
  const items: MenuItem[] = [
    genMenuItem('全部项目', 'ALL', <AllApplication theme="outline" size="14" />),
    genMenuItem('我参与的项目', `JOIN`, <Palm theme="outline" size="14" />),
    genMenuItem('我负责的项目', 'OWNER', <UserBusiness theme="outline" size="14" />),
    genMenuItem('我创建的项目', 'CREATE', <Newlybuild theme="outline" size="14" />),
  ];

  const onSelect = (key: string) => {
    setActiveKey(key);
    let params: API.GetProjectListReq = {};
    switch (key) {
      case 'JOIN':
        params.isJoined = true;
        break;
      case 'CREATE':
        params.isCreator = true;
        break;
      case 'OWNER':
        params.isOwner = true;
        break;
    }
    resetMenuParams(params);
  };

  useEffect(() => {
    onSelect(activeKey!);
  }, []);

  return (
    <div className={styles.projectMenuContainer}>
      <div className={`${styles.projectMenu} ${globalData.showProjectMenu ? '' : styles.hide}`}>
        <div className={`flex items-center justify-between ${styles.titleBox}`}>
          <h3 className={styles.title}>项目</h3>
          <Button
            onClick={onToggleMenu}
            type={'text'}
            icon={<MenuUnfoldOne theme="outline" size="18" fill={'#999'} strokeWidth={2} />}
          ></Button>
        </div>
        <Menu
          className={styles.menus}
          defaultSelectedKeys={[activeKey!]}
          onSelect={({ key }) => onSelect(key)}
          items={items}
        />
      </div>
    </div>
  );
};
