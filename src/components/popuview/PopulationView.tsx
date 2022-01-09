import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import AboutModal from '../modals/AboutModal';
import Graph, { GraphSettings } from '../graph/Graph';
import Header from '../Header';
import GfaCommunication from '../../server_communication/GfaCommunication';
import Gfa from '../../models/gfa';

interface PopulationViewProps {}

const PopulationView: React.FC<PopulationViewProps> = (props) => {
  const [showAbout, setShowAbout] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [gfa, setGfa] = useState<Gfa>();
  const [graphSettings, setGraphSettings] = useState<GraphSettings>(defaultGraphSettings);

  const updateData = () => {
    GfaCommunication.getGfa().then(
      (data: Gfa) => {
        setGfa({
          segments: data.segments.concat(),
          links: data.links.concat(),
          paths: data.paths.concat(),
        });
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
          <Sidebar gfa={gfa} setSettings={setGraphSettings} />
        </div>
        <div className='graph'>
          <Graph gfa={gfa} settings={graphSettings} />
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

const defaultGraphSettings: GraphSettings = {
  drawPaths: true,
  linkThickness: 1.5,
  segmentThickness: 10,
  pathColors: ['#FF5733', '#32B243', '#99B2DF'],
};

export default PopulationView;
export const url = '/population_view';
