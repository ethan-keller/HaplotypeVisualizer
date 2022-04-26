import React from 'react';
import Header from '../components/Header';
import PhenoGraphSidebar from '../components/sidebar/PhenoGraphSidebar';
import '../styles/pheno-graph-view.css';
import GraphWrapper from '../components/graph/GraphWrapper';
import NavigatorWrapper from '../components/navigator/NavigatorWrapper';

interface PhenoGraphViewProps {}

const PhenoGraphView: React.FC<PhenoGraphViewProps> = (props) => {
  return (
    <>
      <Header />
      <div className='ph-g-container'>
        <div className='ph-g-sidebar'>
          <PhenoGraphSidebar />
        </div>

        <div className='ph-g-graph'>
          <GraphWrapper />
        </div>

        <div className='ph-g-navigator'>
          <NavigatorWrapper />
        </div>
      </div>
    </>
  );
};

export default PhenoGraphView;
export const url = '/pheno_graph';
