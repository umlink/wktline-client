import Api from '@/api/modules';
import { getCurrentDateStartAndEnd } from '@/utils/format';
import { useMemoizedFn, useRequest, useSetState } from 'ahooks';
import { message } from 'antd';
import dayjs from 'dayjs';

type MapDataType = Map<
  string,
  {
    totalHour: number;
    date: string;
    taskLaborHourList: API.WorkLaborHourDetailItem[];
  }
>;

export type UserLaborItem = {
  userInfo: {
    id: string;
    avatar: string;
    username: string;
  };
  totalHour: number;
  laborHourMap: MapDataType;
};

type DataType = {
  userLaborList: UserLaborItem[];
  loading: boolean;
  startTime: string;
  endTime: string;
  pageNo: number;
  pageSize: number;
  finished?: boolean;
  dayList: string[];
  openUserIds: string[];
};

const shortFormat = 'YYYY-MM-DD';
const timeFormat = 'YYYY-MM-DD HH:mm:ss';

const getWeekDayList = (startTime: string): string[] => {
  const dayList = [];
  for (let i = 0; i < 7; i++) {
    dayList.push(dayjs(startTime).add(i, 'd').format(shortFormat));
  }
  return dayList;
};

const handleWeekData = (startTime: string): MapDataType => {
  const obj: MapDataType = new Map();
  for (let i = 0; i < 7; i++) {
    const key = dayjs(startTime).add(i, 'd').format(shortFormat);
    obj.set(key, {
      totalHour: 0,
      date: key,
      taskLaborHourList: [],
    });
  }
  return obj;
};

const getDefaultData = (date: { currentMonday: string; currentSunday: string }) => {
  return {
    startTime: date.currentMonday,
    endTime: date.currentSunday,
    userLaborList: [],
    loading: false,
    pageNo: 1,
    pageSize: 15,
    dayList: getWeekDayList(date.currentMonday),
    openUserIds: [],
  };
};

const useLaborHour = () => {
  const date = getCurrentDateStartAndEnd(timeFormat);
  const [data, setData] = useSetState<DataType>(getDefaultData(date));

  const resetData = () => setData(getDefaultData(date));

  const getLaborHourByUserId = useMemoizedFn((index: number, userId: string) => {
    Api.UserWorkPanel.getLaborHourByUserId({
      startTime: data.startTime,
      endTime: data.endTime,
      userId,
    }).then((res) => {
      if (res.data) {
        const laborHourMap = data.userLaborList[index].laborHourMap;
        // 每次打开重置
        data.dayList.forEach((date) => {
          if (laborHourMap.has(date)) {
            laborHourMap.get(date)!.taskLaborHourList = [];
          }
        });
        res.data.forEach((item) => {
          if (laborHourMap.has(item.date)) {
            laborHourMap.get(item.date)!.taskLaborHourList.push(item);
          }
        });
        setData({
          userLaborList: [...data.userLaborList],
        });
      }
    });
  });

  // 打开过的切换日期后获取最新的数据
  const getOpenIndexLaborHourDetail = useMemoizedFn(() => {
    data.userLaborList.forEach((item, index) => {
      const isOpen = data.openUserIds.indexOf(item.userInfo.id) !== -1;
      if (isOpen) {
        getLaborHourByUserId(index, item.userInfo.id);
      }
    });
  });

  const filterLaborHourList = (list: API.WorkLaborHourLogItem[]) => {
    if (list.length) {
      const userLaborList = data.pageNo > 1 ? data.userLaborList : [];
      list.forEach((item) => {
        const user = item.user!;
        // 一周总工时
        let totalHour = 0;
        const laborData: MapDataType = handleWeekData(data.startTime);
        item.records?.forEach((record) => {
          const time = record.date;
          if (laborData.get(time)) {
            totalHour += record.hour;
            laborData.set(time, {
              totalHour: laborData.get(time)!.totalHour + record.hour,
              date: time,
              taskLaborHourList: [],
            });
          }
        });
        userLaborList.push({
          userInfo: user,
          totalHour,
          laborHourMap: laborData,
        });
      });
      setData({ userLaborList, pageNo: data.pageNo + 1 });
    } else {
      setData({ finished: true });
    }
  };

  const { run: getLaborHourList, loading } = useRequest(
    async () => {
      const res = await Api.UserWorkPanel.getLaborHourLogs({
        pageNo: data.pageNo,
        pageSize: data.pageSize,
        startTime: data.startTime,
        endTime: data.endTime,
      });
      if (res.success) {
        filterLaborHourList(res.data?.list || []);
        setTimeout(getOpenIndexLaborHourDetail);
      }
    },
    {
      manual: true,
    },
  );

  const loadMore = () => {
    if (data.finished) return;
    getLaborHourList();
  };

  const delProjectLaborUser = (userId: string, index: number) => {
    Api.UserWorkPanel.delUser({
      userIds: [userId],
    }).then((res) => {
      if (res.success) {
        message.success('取消订阅成功');
        data.userLaborList.splice(index, 1);
        setData({ userLaborList: [...data.userLaborList] });
      } else {
        message.error(res.message || '取消订阅失败，请重试');
      }
    });
  };

  const updateRowData = (params: { index: number; hour: number; date: string }) => {
    const userLaborHour = data.userLaborList[params.index];
    const userId = userLaborHour.userInfo.id;
    getLaborHourByUserId(params.index, userId);
    const laborHourData = userLaborHour.laborHourMap.get(params.date)!;
    data.userLaborList[params.index].totalHour = userLaborHour.totalHour + params.hour;
    laborHourData.totalHour += params.hour;
    userLaborHour.laborHourMap.set(params.date, laborHourData);
    setData({ userLaborList: [...data.userLaborList] });
  };

  const delTaskLaborHourById = (params: {
    id: string;
    taskId: string;
    preIndex: number;
    subIndex: number;
    date: string;
  }) => {
    Api.TaskLaborHour.delLaborHour({
      id: params.id,
      taskId: params.taskId,
    }).then((res) => {
      if (res.success) {
        data.userLaborList[params.preIndex].laborHourMap.get(params.date)?.taskLaborHourList.splice(params.subIndex, 1);
        setData({
          userLaborList: [...data.userLaborList],
        });
      }
    });
  };

  const changeTime = (num: number) => {
    const startTime = dayjs(data.startTime).add(num, 'w').format(timeFormat);
    setData({
      startTime,
      endTime: dayjs(data.endTime).add(num, 'w').format(timeFormat),
      userLaborList: [],
      dayList: getWeekDayList(startTime),
      pageNo: 1,
      pageSize: 15,
    });
  };

  const addUserCallback = () => {
    data.pageNo = 1;
    setData({ finished: false, pageNo: 1 });
    getLaborHourList();
  };

  const resetDatta = () => {
    setData({
      startTime: date.currentMonday,
      endTime: date.currentSunday,
      userLaborList: [],
      loading: false,
      pageNo: 1,
      pageSize: 15,
      dayList: getWeekDayList(date.currentMonday),
      openUserIds: [],
    });
  };

  return {
    data,
    resetData,
    loading,
    setData,
    loadMore,
    resetDatta,
    changeTime,
    updateRowData,
    delProjectLaborUser,
    getLaborHourByUserId,
    delTaskLaborHourById,
    addUserCallback,
    getLaborHourList,
  };
};

export default useLaborHour;
