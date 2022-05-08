import { useState } from 'react';
import { Graph } from '../../types/graph';
import { Layout } from '../../types/layout';
import ErrorCard from '../ErrorCard';
import ZoomWidget from '../widgets/ZoomWidget';
import PanWidget from '../widgets/PanWidget';
import Cytoscape from './Cytoscape';

interface CytoscapeWrapperProps {
  graph: Graph;
  layout: Layout;
}

const CytoscapeWrapper: React.FC<CytoscapeWrapperProps> = ({ graph, layout }) => {
  const [error, setError] = useState<any>(undefined);
  const [cy, setCy] = useState<cytoscape.Core>();

  return (
    <>
      {error ? <ErrorCard message='Could not load graph' /> : null}
      {cy ? (
        <>
          <div className='zoom-widget'>
            <ZoomWidget
              onZoom={(newZoom) => cy.zoom(newZoom)}
              onFit={() => cy.fit()}
              onCenter={() => cy.center()}
            />
          </div>
          <div className='pan-widget'>
            <PanWidget onPan={(p) => cy.panBy(p)} />
          </div>
        </>
      ) : null}
      <Cytoscape
        graph={graph}
        layout={layout}
        onError={(error) => {
          setError(error)
          alert(error)
        }}
        onSuccess={(newCy) => setCy(newCy)}
      />
    </>
  );
};

export default CytoscapeWrapper;
