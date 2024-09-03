import { useModel } from '@umijs/max';
import { useEffect } from 'react';
import Container from './components/Container';
import Menu from './components/Menu';

export default () => {
  const { getProjectGroupList } = useModel('Project.model');
  useEffect(getProjectGroupList, []);
  return (
    <div className={'flex'}>
      <Menu />
      <Container />
    </div>
  );
};
