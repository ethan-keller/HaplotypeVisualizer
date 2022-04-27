import cytoscape from 'cytoscape';
import { useEffect, useState } from 'react';
import { createCytoscape } from '../../cytoscape/cytoscape';
import '../../styles/graph.css';
import ErrorCard from '../ErrorCard';
import { Layout } from '../../types/layout';
import GraphType from '../../types/graph';
import { GfaFeature } from '../../types/gfa';
import InfoCard from '../InfoCard';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateExtent, updatePan, updateViewport, updateZoom } from '../../slices/graphLayout';
import PanWidget from './PanWidget';
import ZoomWidget from './ZoomWidget';

interface GraphProps {
  graph: GraphType;
  layout: Layout;
}

const Graph: React.FC<GraphProps> = ({ graph, layout }) => {
  const zoom = useAppSelector((state) => state.graphLayout.zoom);
  const pan = useAppSelector((state) => state.graphLayout.pan);
  const settings = useAppSelector((state) => state.graphSettings);
  const [cy, setCy] = useState<cytoscape.Core>();
  const [error, setError] = useState<any>(undefined);
  const [featureData, setFeatureData] = useState<GfaFeature | undefined>(undefined);
  const dispatch = useAppDispatch();

  useEffect(() => {
    try {
      setCy(createCytoscape(graph, settings, layout, zoom, pan));
    } catch (err) {
      setError(err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graph, layout]);

  useEffect(() => {
    if (cy) {
      cy.on('unselect', () => setFeatureData(undefined));
      cy.on('select', (e) => setFeatureData(e.target.data('feature')));
      cy.on('pan dragpan', () => {
        dispatch(updateViewport(extentToRectangleRange(cy.extent())));
        dispatch(updatePan(cy.pan()));
        const extent = cy.extent();
        dispatch(updateExtent({ xl: extent.x1, xr: extent.x2 }));
      });
      cy.on('zoom', () => {
        dispatch(updateViewport(extentToRectangleRange(cy.extent())));
        dispatch(updateZoom(cy.zoom()));
        const extent = cy.extent();
        dispatch(updateExtent({ xl: extent.x1, xr: extent.x2 }));
      });
    }
  }, [cy, dispatch]);

  return (
    <>
      {featureData ? (
        <div className='info-card'>
          <InfoCard data={featureData} />
        </div>
      ) : null}
      {cy ? (
        <>
          <div className='zoom-widget'>
            <ZoomWidget
              zoom={cy.zoom()}
              onZoom={(newZoom) => cy.zoom(newZoom)}
              onFit={() => cy.fit()}
            />
          </div>
          <div className='pan-widget'>
            <PanWidget onPan={(p) => cy.panBy(p)} />
          </div>
        </>
      ) : null}
      <div
        id={'graph'}
        style={{
          width: '100%',
          height: '100%',
        }}
      >
        {error ? (
          <ErrorCard message='Could not load graph. Make sure to import a GFA file' />
        ) : null}
      </div>
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

export default Graph;
