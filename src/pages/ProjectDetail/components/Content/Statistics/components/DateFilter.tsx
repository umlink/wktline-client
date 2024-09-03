import { DateTypes } from '@/pages/ProjectDetail/components/Content/Statistics';
import { useSetState } from 'ahooks';
import { Button, DatePicker, Select } from 'antd';
import dayjs, { Dayjs } from 'dayjs';

type PropsType = {
  value: DateTypes;
  updateDate: (data: { startTime?: string; endTime?: string }) => void;
  onChange: (e: DateTypes) => void;
};
const dateFormatStr = 'YYYY-MM-DD';

// 解析季度字符串
const parseQuarterString = (quarterString: string) => {
  const [year, q] = quarterString.split('-Q');
  const quarter = parseInt(q, 10);
  return { year, quarter };
};

// 计算季度的开始和结束月份
const calculateQuarterMonths = (quarter: number) => {
  const startMonth = (quarter - 1) * 3 + 1; // 季度开始月份
  const endMonth = quarter * 3; // 季度结束月份
  return { startMonth, endMonth };
};

// 获取季度的开始和结束日期
const getQuarterStartEndDates = (quarterString: string) => {
  const { year, quarter } = parseQuarterString(quarterString);
  const { startMonth, endMonth } = calculateQuarterMonths(quarter);

  const startTime = dayjs(`${year}-${startMonth}`).startOf('month').format(dateFormatStr);
  const endTime = dayjs(`${year}-${endMonth}`).endOf('month').format(dateFormatStr);

  return { startTime, endTime };
};

const DateFilter = ({ onChange, updateDate, value }: PropsType) => {
  const [date, setDate] = useSetState<{
    startTime?: string;
    endTime?: string;
  }>({});
  const onDateChange = (d: Dayjs, dString: string | string[]) => {
    let startTime = '';
    let endTime = '';
    switch (value) {
      case 'all':
        {
          startTime = '';
          endTime = '';
        }
        break;
      case 'quarter':
        {
          startTime = getQuarterStartEndDates(dString as string).startTime;
          endTime = getQuarterStartEndDates(dString as string).endTime;
        }
        break;
      case 'year':
        {
          startTime = d.startOf('year').format(dateFormatStr);
          endTime = d.endOf('year').format(dateFormatStr);
        }
        break;
      case 'month':
        {
          startTime = d.startOf('month').format(dateFormatStr);
          endTime = d.endOf('month').format(dateFormatStr);
        }
        break;
    }
    setDate({ startTime, endTime });
  };
  const onCustomDate = (d: Dayjs, dString: string | string[], type: 'startTime' | 'endTime') => {
    setDate({
      [type]: dString as string,
    });
  };
  const onSearch = () => {
    if (value === 'all') {
      updateDate({
        startTime: undefined,
        endTime: undefined,
      });
    } else {
      updateDate({
        startTime: date.startTime + ' 00:00:00',
        endTime: date.endTime + ' 23:59:59',
      });
    }
  };
  return (
    <div>
      <Select
        placeholder="筛选时段"
        style={{ width: 100 }}
        defaultValue={value}
        variant={'borderless'}
        onChange={onChange}
        options={[
          { value: 'all', label: '全部时段' },
          { value: 'quarter', label: '按季度' },
          { value: 'month', label: '按月' },
          { value: 'year', label: '按年' },
          { value: 'custom', label: '自定义' },
        ]}
      />
      <div className={'border-zinc-150 mr-2 inline-block rounded-md border border-dashed'}>
        {value === 'quarter' && <DatePicker variant={'borderless'} picker="quarter" onChange={onDateChange} />}
        {value === 'year' && <DatePicker variant={'borderless'} picker="year" onChange={onDateChange} />}
        {value === 'month' && <DatePicker variant={'borderless'} picker="month" onChange={onDateChange} />}
        {value === 'custom' && (
          <span className={'space-x-2'}>
            <DatePicker
              variant={'borderless'}
              placeholder={'开始日期'}
              onChange={(d, dString) => onCustomDate(d, dString, 'startTime')}
            />
            <DatePicker
              variant={'borderless'}
              placeholder={'结束日期'}
              onChange={(d, dString) => onCustomDate(d, dString, 'endTime')}
            />
          </span>
        )}
      </div>
      <Button onClick={onSearch}>查询</Button>
    </div>
  );
};

export default DateFilter;
