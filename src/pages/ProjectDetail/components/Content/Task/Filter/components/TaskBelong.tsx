import { TaskBelongFilterMap } from '@/constants';
import { FullSelection } from '@icon-park/react';
import { useModel } from '@umijs/max';
import { undefined } from '@umijs/utils/compiled/zod';
import { Dropdown, MenuProps, Tooltip } from 'antd';

const taskBelongMap = {
  [TaskBelongFilterMap.all]: '全部任务',
  [TaskBelongFilterMap.creatorId]: '我创建的任务',
  [TaskBelongFilterMap.handlerId]: '我执行的任务',
  [TaskBelongFilterMap.actorId]: '我参与的任务',
  custom: '自定义 ',
};

// 用于每次重置其它条件
const TaskBelongParams = {
  handlerId: undefined,
  creatorId: undefined,
  actorId: undefined,
};

export default () => {
  const { initialState } = useModel('@@initialState');
  const { setTaskParams, filterData, setFilterData } = useModel('ProjectDetail.model');
  const { all, creatorId, handlerId, actorId } = TaskBelongFilterMap;
  const belongList: MenuProps['items'] = [
    {
      key: all,
      label: taskBelongMap[all],
    },
    {
      key: creatorId,
      label: taskBelongMap[creatorId],
    },
    {
      key: handlerId,
      label: taskBelongMap[handlerId],
    },
    {
      key: actorId,
      label: taskBelongMap[actorId],
    },
    {
      key: 'custom',
      label: taskBelongMap['custom'],
    },
  ];
  const handlerClick: MenuProps['onClick'] = ({ key }) => {
    setFilterData({ belongKey: key });
    if (key === 'custom') {
      console.log('自定义-筛选人员');
    }
    let params: any = TaskBelongParams;
    if (key !== TaskBelongFilterMap.all) {
      params = {
        ...TaskBelongParams,
        [key]: initialState?.id,
      };
    }
    /**
     * 当前登录用户 id 以不同身份查询
     * key: creatorId handlerId actorId
     * */
    setTaskParams(params);
  };
  return (
    <Dropdown menu={{ items: belongList, onClick: handlerClick }} trigger={['click']}>
      <Tooltip title="我的任务">
        <span className={'g-filter-btn'}>
          <FullSelection theme="outline" size="16" fill="#999" />
          <span className={'whitespace-nowrap'}>{taskBelongMap[filterData.belongKey]}</span>
        </span>
      </Tooltip>
    </Dropdown>
  );
};
