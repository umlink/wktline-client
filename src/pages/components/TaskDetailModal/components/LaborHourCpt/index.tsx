import { useModel } from '@umijs/max';
import { Divider, Space } from 'antd';
import { useState } from 'react';
import LaborHour from './components/LaborHour';
import LaborList from './components/LaborList';
import PlanHour from './components/PlanHour';

const LaborHourCpt = () => {
  const { data } = useModel('taskDetail');
  const [editLaborData, setEditLaborData] = useState<API.UpdateTaskLaborHourReq | undefined>(undefined);
  if (!data.task) {
    return <></>;
  }
  const { planHour, laborHour } = data.task;
  return (
    <div className={'pt-1'}>
      <Space align="center">
        {!!data.task && (
          <div className={'select-none space-x-4'}>
            <span className={'text-zinc-400'}>
              计划工时<span className={'px-1'}>{planHour}</span>小时，实际工时
              <span className={`px-1 ${laborHour > planHour ? 'text-red-600' : ''}`}>{laborHour}</span>小时
            </span>
            <Space split={<Divider type="vertical" className={'m-0'} />}>
              <PlanHour />
              <LaborHour laborHourItem={editLaborData} setEditLaborData={setEditLaborData} />
            </Space>
          </div>
        )}
      </Space>
      <LaborList setEditLaborData={setEditLaborData} />
    </div>
  );
};

export default LaborHourCpt;
