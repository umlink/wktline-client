import useScrollMove from '@/hooks/useScrollMove';
import NewLaborHour from '@/pages/LaborHour/components/NewLaborHour';
import { useModel } from '@umijs/max';
import { useRef } from 'react';
import DateHeader from './DateHeader';
import LaborHourItem from './LaborHourItem';

const LaborHourList = () => {
  const { data, loadMore } = useModel('LaborHour.model');
  const ref = useRef<HTMLDivElement>(null);
  const onScroll = useScrollMove(ref, loadMore);
  return (
    <div className={'h-[calc(100%-62px)] overflow-y-auto bg-white'}>
      <DateHeader />
      <div className={'h-[calc(100%-60px)] overflow-y-auto'} ref={ref} onScroll={onScroll}>
        {data.userLaborList.map((item, index) => (
          <LaborHourItem item={item} preIndex={index} key={index} />
        ))}
      </div>
      <NewLaborHour />
    </div>
  );
};
export default LaborHourList;
