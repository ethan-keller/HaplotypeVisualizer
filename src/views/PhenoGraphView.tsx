import React, { useState } from 'react';
import Header from '../components/Header';
import AboutModal from '../components/modals/AboutModal';

interface PhenoGraphViewProps {}

const PhenoGraphView: React.FC<PhenoGraphViewProps> = (props) => {
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <Header setShowAbout={setShowAbout} setShowSettings={setShowSettings} />
      <div className='container'>
        <div className='sidebar'>
          {/* <Sidebar setSettings={function (settings: GraphSettings): void {
            throw new Error('Function not implemented.');
          } } /> */}
        </div>
        <div className='graph'>
          <div style={{ height: '100%', width: '100%', backgroundColor: '#edecc2' }}>
            <p>Graph of the samples that contain selected phenotypes</p>
          </div>
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

export default PhenoGraphView;
export const url = '/pheno_graph';
