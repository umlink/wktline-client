import React from 'react';
import Content from './components/Content';
import Header from './components/Header';
const App: React.FC = () => {
  return (
    <div className="h-full min-w-[800px] bg-gray-100">
      <Header />
      <Content />
    </div>
  );
};

export default App;
