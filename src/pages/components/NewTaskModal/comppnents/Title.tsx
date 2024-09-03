import { Close } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { Button } from 'antd';

export default () => {
  const { setData } = useModel('newTask');
  return (
    <div className={'flex w-full items-center justify-between border-b border-b-gray-100 px-5 py-3 text-gray-600'}>
      <b style={{ fontSize: 16, lineHeight: 1 }}>新建任务</b>
      <Button
        onClick={() => setData({ show: false })}
        type="text"
        icon={<Close theme="outline" size="14" fill="#999" />}
      />
    </div>
  );
};
