import NewTaskModal from '@/pages/components/NewTaskModal';
import TaskDetailModal from '@/pages/components/TaskDetailModal';
import { StyleProvider } from '@ant-design/cssinjs';
import '@icon-park/react/styles/index.css';
import { Outlet, useModel } from '@umijs/max';
import { App, ConfigProvider, Watermark } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import LeftMenu from './LeftMenu';
dayjs.locale('zh-cn');

export default () => {
  const { initialState } = useModel('@@initialState');
  return (
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: { borderRadius: 6, colorPrimary: '#14C9C9' },
      }}
    >
      <App>
        <StyleProvider hashPriority="high">
          <div className={'flex h-screen w-screen min-w-[1366px] bg-gray-100/80'}>
            {!!initialState?.id && <LeftMenu />}
            <div className={'flex-1 overflow-auto'}>
              <Watermark
                className={'h-full'}
                content={[initialState?.username || 'wktline']}
                font={{ color: 'rgba(0,0,0,.05)' }}
              >
                <Outlet />
                <TaskDetailModal />
                <NewTaskModal />
              </Watermark>
            </div>
          </div>
        </StyleProvider>
      </App>
    </ConfigProvider>
  );
};
