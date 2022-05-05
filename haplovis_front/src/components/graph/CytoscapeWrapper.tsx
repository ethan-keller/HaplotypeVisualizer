import { useEffect, useState } from 'react';
import { createCytoscape } from './cytoscape';
import { useAppDispatch, useAppSelector } from '../../store';
import { Graph } from '../../types/graph';
import { Layout } from '../../types/layout';
import ErrorCard from '../ErrorCard';
import { updateFeature } from '../../slices/graphSelection';
import ZoomWidget from '../widgets/ZoomWidget';
import PanWidget from '../widgets/PanWidget';
import cytoscape from 'cytoscape';
import { updateExtent, updatePan, updateZoom } from '../../slices/graphLayout';

interface CytoscapeWrapperProps {
  graph: Graph;
  layout: Layout;
}

const CytoscapeWrapper: React.FC<CytoscapeWrapperProps> = ({ graph, layout }) => {
  const zoom = useAppSelector((state) => state.graphLayout.zoom);
  const pan = useAppSelector((state) => state.graphLayout.pan);
  const settings = useAppSelector((state) => state.graphSettings);
  const [error, setError] = useState<any>(undefined);
  const dispatch = useAppDispatch();
  const [cy, setCy] = useState<cytoscape.Core>();

  useEffect(() => {
    try {
      setCy(createCytoscape(graph, settings, layout, zoom, pan));
    } catch (err) {
      // alert(err);
      setError(err);
    }
  }, [graph, layout, settings]);

  useEffect(() => {
    const dispatchExtent = () => {
      if (cy) {
        const extent = cy.extent();
        dispatch(updateExtent({ xl: extent.x1, xr: extent.x2 }));
      }
    };
    if (cy) {
      cy.on('unselect', () => dispatch(updateFeature(undefined)));
      cy.on('select', (e) => dispatch(updateFeature(e.target.data('feature'))));
      cy.on('pan dragpan', () => {
        // dispatch(updateViewport(extentToRectangleRange(cy.extent())));
        dispatch(updatePan(cy.pan()));
        dispatchExtent();
      });
      cy.on('zoom', () => {
        // dispatch(updateViewport(extentToRectangleRange(cy.extent())));
        dispatch(updateZoom(cy.zoom()));
        dispatchExtent();
      });
    }
  }, [cy, dispatch]);

  return (
    <>
      {error ? <ErrorCard message='Could not load graph' /> : null}
      {cy ? (
        <>
          <div className='zoom-widget'>
            <ZoomWidget zoom={zoom} onZoom={(newZoom) => cy.zoom(newZoom)} onFit={() => cy.fit()} />
          </div>
          <div className='pan-widget'>
            <PanWidget onPan={(p) => cy.panBy(p)} />
          </div>
        </>
      ) : null}
      <div
        id='graph'
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </>
  );
};

const extentToRectangleRange = (extent: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  w: number;
  h: number;
}) => {
  return { lu: { x: extent.x1, y: extent.y1 }, rd: { x: extent.x2, y: extent.y2 } };
};

export default CytoscapeWrapper;
