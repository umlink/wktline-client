import { Search } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { useDebounceFn } from 'ahooks';
import { Input } from 'antd';

export default () => {
  const { setTaskParams } = useModel('ProjectDetail.model');
  const { run: onKeywords } = useDebounceFn((e) => setTaskParams({ keywords: e.target.value }), {
    wait: 300,
  });
  return (
    <span className="cursor-pointer rounded-md hover:bg-gray-50">
      <Input
        variant="borderless"
        onChange={onKeywords}
        prefix={<Search fill={'#999'} />}
        placeholder="根据关键词搜索任务"
      />
    </span>
  );
};
