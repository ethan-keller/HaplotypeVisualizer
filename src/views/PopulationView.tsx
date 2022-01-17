import React, { useEffect, useState } from 'react';
import Graph, { GraphSettings } from '../components/graph/Graph';
import Header from '../components/Header';
import GfaCommunication from '../server_communication/GfaCommunication';
import Gfa from '../models/gfa';
import '../styles/popuview.css';
import PopulationViewSidebar from '../components/PopulationViewSidebar';

interface PopulationViewProps {}

// default graph settings
const defaultGraphSettings: GraphSettings = {
  drawPaths: true,
  linkThickness: 1.5,
  segmentThickness: 10,
  pathColors: ['#FF5733', '#32B243', '#99B2DF'],
};

const PopulationView: React.FC<PopulationViewProps> = (props) => {
  // state: gfa graph
  const [gfa, setGfa] = useState<Gfa>();
  // state: graph settings
  const [graphSettings, setGraphSettings] = useState<GraphSettings>(defaultGraphSettings);

  // update data when component mounted
  useEffect(() => {
    updateData();
  }, []);

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

  return (
    <>
      <Header />
      <div className='container'>
        <PopulationViewSidebar />

        <Graph gfa={gfa} settings={graphSettings} />

        <div className='navigator'>Nav</div>
      </div>
    </>
  );
};

export default PopulationView;
export const url = '/population_view';
