import useQueryParams from '@/hooks/useQueryParams';
import { useSetState, useUpdateEffect } from 'ahooks';

export enum SettingsType {
  USER = 'USER',
  SYSTEM = 'SYSTEM',
  TASK_PRIORITY = 'TASK_PRIORITY',
  PROJECT_GROUP = 'PROJECT_GROUP',
  TENANT = 'TENANT',
}

type SettingsDataType = {
  activeKey: SettingsType;
};

const SettingsConfig = () => {
  const [query, setQuery] = useQueryParams();
  const [state, setState] = useSetState<SettingsDataType>({
    activeKey: query.type || 'USER',
  });

  useUpdateEffect(() => {
    setQuery({ type: state.activeKey });
  }, [state.activeKey]);

  return {
    state,
    setState,
  };
};

export default SettingsConfig;
