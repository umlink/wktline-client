import { projectContentType, projectContentTypeMap } from '@/constants';
import { Analysis, InternalData, Setting, Workbench } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { Space, Tabs, TabsProps } from 'antd';

const ContentTypeTab = () => {
  const { data: projectData, filterData, setFilterData } = useModel('ProjectDetail.model');
  const onTabChange = (key: string) => setFilterData({ contentType: key as projectContentType });

  const items: TabsProps['items'] = [
    {
      key: projectContentTypeMap.TASK,
      label: (
        <Space size={4}>
          <Workbench theme="outline" />
          <span>任务</span>
        </Space>
      ),
    },
    {
      key: projectContentTypeMap.TEST,
      label: (
        <Space size={4}>
          <InternalData theme="outline" />
          <span>测试用例</span>
        </Space>
      ),
    },
    {
      key: projectContentTypeMap.STATISTIC,
      label: (
        <Space size={4}>
          <Analysis theme="outline" />
          <span>统计</span>
        </Space>
      ),
    },
  ];
  if (projectData.project?.canEdit) {
    items.push({
      key: projectContentTypeMap.SETTING,
      label: (
        <Space size={4}>
          <Setting theme="outline" />
          <span>设置</span>
        </Space>
      ),
    });
  }
  return (
    <Tabs
      defaultActiveKey={filterData.contentType}
      onChange={onTabChange}
      className={
        'select-none text-zinc-500 [&_.ant-tabs-nav]:!mb-0 [&_.ant-tabs-nav]:before:!border-0 [&_.ant-tabs-tab]:py-[15px]'
      }
      items={items}
    />
  );
};

export default ContentTypeTab;
