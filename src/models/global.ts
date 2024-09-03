import Api from '@/api/modules';
import { useSetState } from 'ahooks';
import { useEffect } from 'react';

interface GlobalState {
  showProjectMenu: boolean;
  showTaskDetail: boolean;
  unreadCount: number;
}

const GlobalData = () => {
  const [globalData, setGlobalData] = useSetState<GlobalState>({
    showProjectMenu: true,
    showTaskDetail: false,
    unreadCount: 0,
  });

  const getUnreadMsgCount = () => {
    Api.Message.getMsgUnreadCount({}).then((res) => {
      if (res.success) {
        setGlobalData({ unreadCount: res.data?.count ?? 0 });
      }
    });
  };

  const onToggleMenu = () => {
    setGlobalData({
      showProjectMenu: !globalData.showProjectMenu,
    });
  };

  useEffect(getUnreadMsgCount, []);

  return {
    globalData,
    setGlobalData,
    onToggleMenu,
    getUnreadMsgCount,
  };
};

export default GlobalData;
