import cytoscape from 'cytoscape';
import { useEffect, useState } from 'react';
import { createCytoscape } from '../../cytoscape/cytoscape';
import Gfa from '../../models/gfa';
import '../../styles/graph.css';
import ErrorCard from '../ErrorCard';
import SpinnerAnnotated from '../SpinnerAnnotated';

interface GraphProps {
  gfa?: Gfa;
  settings: GraphSettings;
}

const Graph: React.FC<GraphProps> = (props) => {
  const [cy, setCy] = useState<cytoscape.Core>();
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    // TODO: This code is blocking and don't know why yet
    const updateGraph = () => {
      if (!props.gfa) return;
      createCytoscape(props.settings, props.gfa).then(
        (result: cytoscape.Core) => {
          setIsLoaded(true);
          setCy(result);
        },
        (err: Error) => {
          setIsLoaded(true);
          setError(err);
          console.log(err);
        },
      );
    };

    updateGraph();
  }, [props.gfa, props.settings]);

  return (
    <div
      className='graph'
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

export interface GraphSettings {
  drawPaths: boolean;
  linkThickness: number;
  segmentThickness: number;
  pathColors: string[];
}

export default Graph;
