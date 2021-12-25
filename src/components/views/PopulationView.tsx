import React, { useState } from 'react';
import Sidebar from '../../Sidebar';
import AboutModal from '../AboutModal';
import Header from '../Header';

interface PopulationViewProps {}

const PopulationView: React.FC<PopulationViewProps> = (props) => {
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <Header setShowAbout={setShowAbout} setShowSettings={setShowSettings} />
      <div className='flex-container'>
        <div id='sidebar'>
          <Sidebar />
        </div>
      </div>

      {/* <Graph />
      <SideBar />
      <Navigator /> */}
      {showAbout && <AboutModal onHide={() => setShowAbout(false)} />}
    </>
  );
};

export default PopulationView;
export const url = '/population_view';
