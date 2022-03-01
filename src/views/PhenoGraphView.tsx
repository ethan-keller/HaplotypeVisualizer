import React from 'react';
import Header from '../components/Header';
import PhenoGraphSidebar from '../components/sidebar/PhenoGraphSidebar';
import '../styles/pheno-graph-view.css';

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
          <div style={{ height: '100%', width: '100%', backgroundColor: '#edecc2' }}>
            <p>Graph of the samples that contain selected phenotypes</p>
          </div>
        </div>

        <div className='ph-g-navigator' style={{ backgroundColor: '#dbebb7' }}>
          Navigator
        </div>
      </div>
    </>
  );
};

export default PhenoGraphView;
export const url = '/pheno_graph';
