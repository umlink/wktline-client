import { Filter } from '@icon-park/react';
import { Tooltip } from 'antd';

export default () => {
  return (
    <span className={'cursor-pointer rounded-sm p-1.5 hover:bg-gray-100'}>
      <Tooltip title="筛选">
        <Filter theme="outline" size="14" fill="#999" />
      </Tooltip>
    </span>
  );
};
