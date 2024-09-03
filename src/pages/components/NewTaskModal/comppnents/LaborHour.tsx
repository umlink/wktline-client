import { useModel } from '@umijs/max';
import { Input } from 'antd';

export default () => {
  const { setParams } = useModel('newTask');
  return (
    <Input
      className="w-[200px]"
      variant="borderless"
      placeholder="预估工时 (单位：小时)"
      onChange={(e) => {
        setParams({ planHour: +e.target.value });
      }}
    />
  );
};
