import React from 'react';
import Header from '../components/Header';
import PhenoGraphSidebar from '../components/sidebar/PhenoGraphSidebar';

interface PhenoGraphViewProps {}

const PhenoGraphView: React.FC<PhenoGraphViewProps> = (props) => {
  return (
    <>
      <Header />
      <div className='container'>
        <PhenoGraphSidebar />

        <div className='graph'>
          <div style={{ height: '100%', width: '100%', backgroundColor: '#edecc2' }}>
            <p>Graph of the samples that contain selected phenotypes</p>
          </div>
        </div>

        <div className='navigator' style={{ backgroundColor: '#dbebb7' }}>
          Navigator
        </div>
      </div>
    </>
  );
};

export default PhenoGraphView;
export const url = '/pheno_graph';
