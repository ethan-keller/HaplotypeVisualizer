import { useEffect, useState } from 'react';
import { Graph } from '../../types/graph';
import { Layout } from '../../types/layout';
import ErrorCard from '../ErrorCard';
import ZoomWidget from '../widgets/ZoomWidget';
import PanWidget from '../widgets/PanWidget';
import Cytoscape from './Cytoscape';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateFirstGraphRender } from '../../slices/graphLayout';

interface CytoscapeWrapperProps {
  graph: Graph;
  layout: Layout;
}

const CytoscapeWrapper: React.FC<CytoscapeWrapperProps> = ({ graph, layout }) => {
  const [error, setError] = useState<any>(undefined);
  const [cy, setCy] = useState<cytoscape.Core>();
  const firstGraphRender = useAppSelector((state) => state.graphLayout.firstGraphRender);
  const dispatch = useAppDispatch();

  // Fit when graph is rendered for the first time
  useEffect(() => {
    if (cy && firstGraphRender) {
      cy.fit();
      dispatch(updateFirstGraphRender());
    }
  }, [cy, firstGraphRender, dispatch]);

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
          setError(error);
          alert(error);
        }}
        onSuccess={(newCy) => setCy(newCy)}
      />
    </>
  );
};

export default CytoscapeWrapper;
