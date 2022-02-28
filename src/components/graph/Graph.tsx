import cytoscape from 'cytoscape';
import { useEffect, useState } from 'react';
import { createCytoscape } from '../../cytoscape/cytoscape';
import '../../styles/graph.css';
import ErrorCard from '../ErrorCard';
import Layout from '../../types/layout';
import GraphType, { GraphSettings } from '../../types/graph';

interface GraphProps {
  graph: GraphType;
  layout: Layout;
  settings: GraphSettings;
}

const Graph: React.FC<GraphProps> = ({ graph, layout, settings }) => {
  const [cy, setCy] = useState<cytoscape.Core>();
  const [error, setError] = useState<any>(undefined);
  // const [isLoaded, setIsLoaded] = useState<boolean>(true);

  useEffect(() => {
    // setIsLoaded(false);
    try {
      setCy(createCytoscape(graph, settings, layout));
    } catch (err) {
      alert(err);
      setError(err);
    }
  }, [graph, layout, settings]);

  return (
    <div
      id={'graph'}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {error ? <ErrorCard message='Could not load graph. Make sure to import a GFA file' /> : null}
    </div>
  );
};

export default Graph;
