import { useModel } from '@umijs/max';
import { useEffect } from 'react';
import Header from './components/Header';
import LaborHourList from './components/LaborHourList';

const LaborHour = () => {
  const { data, getLaborHourList } = useModel('LaborHour.model');
  useEffect(getLaborHourList, [data.startTime]);
  return (
    <div className={'h-full overflow-y-auto shadow'}>
      <Header />
      <LaborHourList />
    </div>
  );
};

export default LaborHour;
