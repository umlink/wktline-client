import React, { memo } from 'react';
import CardType from './components/CardType';
import NewTask from './components/NewTask';
import SearchInput from './components/SearchInput';
import SortType from './components/SortType';
import TaskBelong from './components/TaskBelong';
import TaskGroup from './components/TaskGroup';
import TaskType from './components/TaskType';
import ViewType from './components/ViewType';

const ProjectDetailFilter: React.FC = memo(() => {
  return (
    <div
      className={`flex h-[40px]
      select-none items-center 
      justify-between border-b
      border-b-gray-100 bg-white
      px-2 text-gray-600`}
    >
      <SearchInput />
      <div className={'flex items-center space-x-2 text-[14px]'}>
        <TaskType />
        <TaskBelong />
        <TaskGroup />
        <SortType />
        <CardType />
        <ViewType />
        <NewTask />
      </div>
    </div>
  );
});

export default ProjectDetailFilter;
