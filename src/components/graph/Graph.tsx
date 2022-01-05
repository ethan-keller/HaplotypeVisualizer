import cytoscape from 'cytoscape';
import { useCallback, useEffect, useState } from 'react';
import { createCytoscape, GraphSettings } from '../../logic/graph';
import Gfa from '../../models/gfa';
import '../../styles/graph.css';
import ErrorCard from '../ErrorCard';
import SpinnerAnnotated from '../SpinnerAnnotated';

interface GraphProps {
  gfa?: Gfa;
  // settings: GraphSettings;
}

const settings: GraphSettings = {
  drawPaths: false,
  drawLabels: false,
  enabledPaths: [],
  linkWidth: 1,
  pathColors: [],
  segmentWidth: 30,
};

const Graph: React.FC<GraphProps> = (props) => {
  // cytoscape state
  const [cy, setCy] = useState<cytoscape.Core>();
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setError(undefined);

    // TODO: This code is blocking and don't know why yet
    const updateGraph = () => {
      createCytoscape(settings, props.gfa).then(
        (result: cytoscape.Core | undefined) => {
          if (result) {
            console.log('cytoscape created');
            setCy(result);
            console.log('cytoscape is set');
            setIsLoaded(true);
            console.log('Loading done');
            console.log('Now rendering');
          }
        },
        (err: Error) => {
          setIsLoaded(true);
          setError(err);
          console.log(err);
        },
      );
    };

    updateGraph();
  }, [props.gfa]);

  return (
    <div
      id={'graph'}
      style={{
        width: '100%',
        height: '100%',
      }}
    >
      {isLoaded ? null : <SpinnerAnnotated message='Preparing the graph' />}
      {error ? <ErrorCard message='Could not load graph. Make sure to upload a GFA file' /> : null}
    </div>
  );
};

export default Graph;
