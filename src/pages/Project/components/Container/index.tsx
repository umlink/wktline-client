import Header from './components/Header';
import ProjectList from './components/ProjectList';

export default function ProjectContainer() {
  return (
    <div className={'h-screen flex-1'}>
      <Header />
      <ProjectList />
    </div>
  );
}
