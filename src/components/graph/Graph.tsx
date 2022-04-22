import cytoscape from 'cytoscape';
import { useEffect, useState } from 'react';
import { createCytoscape } from '../../cytoscape/cytoscape';
import '../../styles/graph.css';
import '../../styles/panzoom.css';
import ErrorCard from '../ErrorCard';
import { Layout } from '../../types/layout';
import GraphType, { GraphSettings } from '../../types/graph';
import { GfaFeature } from '../../types/gfa';
import InfoCard from '../InfoCard';
// @ts-ignore
import panzoom from 'cytoscape-panzoom';

panzoom(cytoscape);

interface GraphProps {
  graph: GraphType;
  layout: Layout;
  settings: GraphSettings;
}

const Graph: React.FC<GraphProps> = ({ graph, layout, settings }) => {
  const [cy, setCy] = useState<cytoscape.Core>();
  const [error, setError] = useState<any>(undefined);
  const [featureData, setFeatureData] = useState<GfaFeature | undefined>(undefined);

  useEffect(() => {
    try {
      const v = createCytoscape(graph, settings, layout);
      setCy(v);
    } catch (err) {
      alert(err);
      setError(err);
    }
  }, [graph, layout, settings]);

  useEffect(() => {
    if (cy) {
      console.log('HS');
      // @ts-ignore
      cy.panzoom();
      cy.on('unselect', (_) => setFeatureData(undefined));
      cy.on('select', (e) => setFeatureData(e.target.data('feature')));
      cy.on('taphold', () => {
        console.log(cy.extent().x1, cy.extent().y1);
        // console.log(cy.nodes().forEach(node => console.log(node.position())))
      });
      cy.on('dragpan zoom', () => {
        console.log('f');
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

export default Graph;
