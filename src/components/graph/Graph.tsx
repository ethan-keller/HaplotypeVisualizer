import cytoscape from 'cytoscape';
import { useEffect, useState } from 'react';
import { createCytoscape } from '../../cytoscape/cytoscape';
import '../../styles/graph.css';
import '../../styles/panzoom.css';
import ErrorCard from '../ErrorCard';
import { RectangleRange } from '../../types/layout';
import GraphType, { GraphSettings } from '../../types/graph';
import { GfaFeature } from '../../types/gfa';
import InfoCard from '../InfoCard';
// @ts-ignore
import panzoom from 'cytoscape-panzoom';
import layoutApi from '../../api/layout';

panzoom(cytoscape);

interface GraphProps {
  graph: GraphType;
  settings: GraphSettings;
  initialViewport?: RectangleRange;
}

const Graph: React.FC<GraphProps> = ({
  graph,
  settings,
  initialViewport = defaultInitialViewport,
}) => {
  const [viewport, setViewport] = useState<RectangleRange>(initialViewport);
  const [cy, setCy] = useState<cytoscape.Core>();
  const [error, setError] = useState<any>(undefined);
  const [featureData, setFeatureData] = useState<GfaFeature | undefined>(undefined);

  const { data: layout } = layoutApi.useGetRangeLayoutNodesQuery(viewport);

  useEffect(() => {
    try {
      if (layout) {
        const v = createCytoscape(graph, settings, layout);
        setCy(v);
        // setViewport(extentToRectangleRange(v.extent()));
      }
    } catch (err) {
      alert(err);
      setError(err);
    }
  }, [graph, layout, settings]);

  useEffect(() => console.log(viewport), [viewport]);

  useEffect(() => {
    if (cy) {
      // @ts-ignore
      cy.panzoom({});
      cy.on('unselect', (_) => setFeatureData(undefined));
      cy.on('select', (e) => setFeatureData(e.target.data('feature')));
      cy.on('taphold', () => {
        // setViewport(extentToRectangleRange(cy.extent()));
      });
      cy.on('dragpan zoom', () => {
        // setViewport(extentToRectangleRange(cy.extent()));
      });
    }
    return () => {
      if (cy) {
        // @ts-ignore
        cy.panzoom('destroy');
      }
    };
  }, [cy]);

  return (
    <>
      {featureData ? (
        <div className='info-card'>
          <InfoCard data={featureData} />
        </div>
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

const defaultInitialViewport = { lu: { x: 0, y: 0 }, rd: { x: 1000, y: 1000 } };

export default Graph;
