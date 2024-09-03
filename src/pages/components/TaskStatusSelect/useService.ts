import Api from '@/api/modules';
import { useRequest } from '@umijs/max';
import { useState } from 'react';

export default (projectId: string) => {
  const {
    data,
    loading,
    run: getData,
  } = useRequest(() => Api.TaskStatus.getTaskStatusList({ projectId }), {
    manual: true,
  });
  const [open, setOpen] = useState(false);
  return {
    open,
    setOpen,
    loading,
    data,
    getData,
  };
};
