import NewProjectModal from '@/pages/Project/components/NewProjectModal';
import { Down, MenuFoldOne, Plus, Search } from '@icon-park/react';
import { Access, useAccess, useModel } from '@umijs/max';
import { useDebounceFn } from 'ahooks';
import { Button, Input, Select, Space } from 'antd';
import React from 'react';
import GroupSelect from './GroupSelect';

const ProjectListItem: React.FC = () => {
  const { globalData, onToggleMenu } = useModel('global');
  const { params, setParams, projectData, setProjectData } = useModel('Project.model');
  const access = useAccess();

  const { run: onSearch } = useDebounceFn(
    (e) => {
      setParams({
        pageNo: 1,
        keywords: e.target.value || undefined,
      });
    },
    { wait: 200 },
  );

  const onShowTypeChange = (showType: string) => {
    setParams({
      pageNo: 1,
      showType: showType || undefined,
    });
  };

  return (
    <div className={'flex h-[50px] items-center justify-between border-b border-b-gray-200 bg-white px-3'}>
      <Space>
        {!globalData.showProjectMenu && (
          <Button
            onClick={onToggleMenu}
            type={'text'}
            icon={<MenuFoldOne theme="outline" size="18" fill="#999" strokeWidth={2} />}
          />
        )}

        <Input
          placeholder="根据项目名称搜索"
          variant="filled"
          className={'!w-[250px]'}
          onChange={onSearch}
          suffix={<Search theme="outline" size="16" fill="#dedede" />}
        />
        <div>
          <span className={'text-zinc-400'}>显示类型:</span>
          <Select
            defaultValue={params.showType || ''}
            variant="borderless"
            style={{ flex: 1 }}
            onChange={onShowTypeChange}
            options={[
              { value: '', label: '全部' },
              { value: 'PUBLIC', label: '公开' },
              { value: 'PRIVATE', label: '私有' },
            ]}
          />
        </div>
        <GroupSelect
          onChange={(group) => {
            setProjectData({ currentGroup: group });
            setParams({ ...params, groupId: group.id });
          }}
          onSelectAll={() => {
            setProjectData({ currentGroup: undefined });
            setParams({ ...params, groupId: undefined });
          }}
        >
          <span className={'g-tag-btn rounded-lg p-2'}>
            <span className={'whitespace-nowrap text-primary'}>{projectData.currentGroup?.name || '全部分组'}</span>
            <Down className={'!text-zinc-400'} size={16} />
          </span>
        </GroupSelect>
      </Space>
      <Access accessible={access.isAdmin}>
        <NewProjectModal>
          <Button
            className={'flex items-center !text-primary'}
            type={'dashed'}
            icon={<Plus theme="outline" size="14" />}
          >
            新建项目
          </Button>
        </NewProjectModal>
      </Access>
    </div>
  );
};

export default ProjectListItem;
