import { UserLaborItem } from '@/pages/LaborHour/model';
import { useModel } from '@umijs/max';
import ContentCard from './ContentCard';
import Timeline from './TimeLine';
import UserHeader from './UserHeader';

const LaborHourItem = (props: { item: UserLaborItem; preIndex: number }) => {
  const { laborHourMap, userInfo } = props.item;
  const { data: laborHourData } = useModel('LaborHour.model');
  const itemClass = 'group text-center border-r p-2 border-r-zinc-200 w-[1/8]';

  const openUserIds = laborHourData.openUserIds;

  return (
    <div
      className={`flex justify-between border-b border-b-zinc-200 text-sm ${
        openUserIds.includes(userInfo.id) ? 'shadow' : ''
      }`}
    >
      <UserHeader item={props.item} preIndex={props.preIndex} />
      <div className={'grid flex-1 grid-cols-7'}>
        {laborHourData.dayList.map((date: string, index) => {
          return (
            <div
              className={`${itemClass} overflow-hidden [&.ant-progress-line]:!mb-0 [&:nth-child(8)]:border-0`}
              key={date + index}
            >
              <Timeline
                hour={laborHourMap.get(date)?.totalHour || 0}
                useId={userInfo.id}
                date={date}
                preIndex={props.preIndex}
              />
              {openUserIds.includes(userInfo.id) && (
                <div className={'pb-2'}>
                  {laborHourMap.get(date)?.taskLaborHourList.map((item: API.WorkLaborHourDetailItem, index) => {
                    return <ContentCard item={item} preIndex={props.preIndex} subIndex={index} key={index} />;
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default LaborHourItem;
