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
  pheno?: boolean;
}

const CytoscapeWrapper: React.FC<CytoscapeWrapperProps> = ({ graph, layout, pheno }) => {
  const [error, setError] = useState<any>(undefined);
  const [cy, setCy] = useState<cytoscape.Core>();
  const firstGraphRender = useAppSelector((state) => state.graphLayout.firstGraphRender);
  const dispatch = useAppDispatch();

  // Fit when graph is rendered for the first time
  useEffect(() => {
    if (cy && !cy.destroyed() && firstGraphRender) {
      cy.fit();
      dispatch(updateFirstGraphRender(false));
    }
  }, [cy, firstGraphRender, dispatch]);

  return (
    <>
      {error ? <ErrorCard message='Could not load graph' /> : null}
      {cy ? (
        <>
          <div className='zoom-widget'>
            <ZoomWidget
              onZoom={(newZoom) => {
                const extent = cy.extent();
                cy.zoom({
                  level: newZoom,
                  position: {
                    x: extent.x1 + (extent.x2 - extent.x1) / 2,
                    y: extent.y1 + (extent.y2 - extent.y1) / 2,
                  },
                });
              }}
              onVerticalCenter={() => {
                const bb = cy.elements().boundingBox({});
                cy.pan({
                  x: cy.pan().x,
                  y: (cy.height() - cy.zoom() * (bb.y1 + bb.y2)) / 2,
                });
              }}
              isZoomLimit={(zoomIn) =>
                zoomIn ? cy.zoom() >= cy.maxZoom() : cy.zoom() <= cy.minZoom()
              }
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
        pheno={pheno}
      />
    </>
  );
};

export default CytoscapeWrapper;
