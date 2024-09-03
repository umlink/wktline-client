import useQueryParams from '@/hooks/useQueryParams';
import { Tabs, TabsProps } from 'antd';

import ProjectBaseInfo from './components/ProjectBaseInfo';
import TaskGroupPage from './components/TaskGroup';
import TaskStatusPage from './components/TaskStatus';
import TaskTypePage from './components/TaskType';
import ProjectUserList from './components/UserList';

const SettingKeyMap = {
  BaseInfo: 'BASE_INFO',
  UserList: 'USER_LIST',
  TaskGroup: 'TASK_GROUP',
  TaskStatus: 'TASK_STATUS',
  TaskType: 'TASK_TYPE',
};

const ProjectDetailSetting = () => {
  const items: TabsProps['items'] = [
    {
      key: SettingKeyMap.BaseInfo,
      label: '项目信息',
      children: <ProjectBaseInfo />,
    },
    {
      key: SettingKeyMap.TaskStatus,
      label: '任务状态',
      children: <TaskStatusPage />,
    },
    {
      key: SettingKeyMap.TaskType,
      label: '任务类型',
      children: <TaskTypePage />,
    },
    {
      key: SettingKeyMap.TaskGroup,
      label: '任务迭代',
      children: <TaskGroupPage />,
    },
    {
      key: SettingKeyMap.UserList,
      label: '用户列表',
      children: <ProjectUserList />,
    },
  ];

  const [query, setQuery] = useQueryParams();
  const onTabChange = (key: string) => {
    setQuery({ settingTab: key });
  };
  return (
    <div className={'m-2 box-border h-[calc(100%-16px)] rounded-md bg-white p-4 pt-2'}>
      <Tabs
        indicatorSize={20}
        defaultActiveKey={query.settingTab || SettingKeyMap.BaseInfo}
        onChange={onTabChange}
        items={items}
      />
    </div>
  );
};
export default ProjectDetailSetting;
