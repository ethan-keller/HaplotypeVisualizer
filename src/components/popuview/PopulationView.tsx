import React, { useState } from 'react';
import Sidebar from './Sidebar';
import AboutModal from '../modals/AboutModal';
import Graph from '../graph/Graph';
import Header from '../Header';

interface PopulationViewProps {}

const PopulationView: React.FC<PopulationViewProps> = (props) => {
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <Header setShowAbout={setShowAbout} setShowSettings={setShowSettings} />
      <div className='container'>
        <div className='sidebar'>
          <Sidebar />
        </div>
        <div className='graph'>
          <Graph />
        </div>
        <div className='navigator'>
          {/* <Navigator /> */}
          Nav
        </div>
      </div>
      {showAbout && <AboutModal onHide={() => setShowAbout(false)} />}
    </>
  );
};

export default PopulationView;
export const url = '/population_view';
