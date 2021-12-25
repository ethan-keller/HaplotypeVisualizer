import React, { useState } from 'react';
import AboutModal from '../AboutModal';
import Header from '../Header';

interface PopulationViewProps {

}

const PopulationView: React.FC<PopulationViewProps> = (props) => {
  const [showAbout, setShowAbout] = useState(false);
  const [showOpenFile, setShowOpenFile] = useState(false);

  return (
    <>
      <Header onData={(data) => console.log(data)} setShowAbout={setShowAbout} setShowOpenFile={setShowOpenFile} />
      {/* <Graph />
      <SideBar />
      <Navigator /> */}
			{showAbout && <AboutModal onHide={() => setShowAbout(false)} />}
    </>
  );
};

export default PopulationView;
export const url = '/population_view'
