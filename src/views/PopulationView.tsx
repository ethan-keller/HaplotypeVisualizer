import React from 'react';
import Graph from '../components/graph/Graph';
import Header from '../components/Header';
import '../styles/popu-view.css';
import PopulationViewSidebar from '../components/sidebar/PopulationViewSidebar';

interface PopulationViewProps {}

const PopulationView: React.FC<PopulationViewProps> = (props) => {
  return (
    <>
      <Header />
      <div className='container'>
        <PopulationViewSidebar />

        <Graph />

        <div className='navigator'>Nav</div>
      </div>
    </>
  );
};

export default PopulationView;
export const url = '/population_view';
