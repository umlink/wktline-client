import { ConfigProvider, Spin } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';

export default () => (
  <div className={'flex h-screen w-full items-center justify-center'}>
    <ConfigProvider
      locale={zhCN}
      theme={{
        token: { borderRadius: 6, colorPrimary: '#14C9C9' },
      }}
    >
      <Spin size="large" />
    </ConfigProvider>
  </div>
);
