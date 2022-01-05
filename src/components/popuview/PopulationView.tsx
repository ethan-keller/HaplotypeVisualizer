import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import AboutModal from '../modals/AboutModal';
import Graph from '../graph/Graph';
import Header from '../Header';
import GfaCommunication from '../../server_communication/GfaCommunication';
import Gfa, { GfaLink, GfaPath, GfaSegment } from '../../models/gfa';

interface PopulationViewProps {}

const PopulationView: React.FC<PopulationViewProps> = (props) => {
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [gfa, setGfa] = useState<Gfa>();

  const updateData = () => {
    Promise.all([
      GfaCommunication.getSegments(),
      GfaCommunication.getLinks(),
      GfaCommunication.getPaths(),
    ]).then(
      ([s, l, p]) => {
        setGfa({ segments: s.concat(), links: l.concat(), paths: p.concat() });
      },
      (err: Error) => {
        console.log(err);
      },
    );
  };

  useEffect(() => {
    updateData();
  }, []);

  return (
    <>
      <Header setShowAbout={setShowAbout} setShowSettings={setShowSettings} />
      <div className='container'>
        <div className='sidebar'>
          <Sidebar gfa={gfa} />
        </div>
        <div className='graph'>
          <Graph gfa={gfa} />
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
