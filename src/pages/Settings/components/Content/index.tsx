import { useModel } from '@umijs/max';
import { SettingsType } from '../../model';
import ProjectGroup from './ProjectGroup';
import System from './System';
import TaskPriority from './TaskPriority';
import Tenant from './Tenant';
import User from './User';
const SettingsContainer = () => {
  const { state } = useModel('Settings.model');

  const containerViewMap = {
    [SettingsType.USER]: User,
    [SettingsType.SYSTEM]: System,
    [SettingsType.TASK_PRIORITY]: TaskPriority,
    [SettingsType.PROJECT_GROUP]: ProjectGroup,
    [SettingsType.TENANT]: Tenant,
  };

  const SettingsView = containerViewMap[state.activeKey];

  return (
    <div className={'flex-1 overflow-x-auto p-4'}>
      <SettingsView />
    </div>
  );
};
export default SettingsContainer;
