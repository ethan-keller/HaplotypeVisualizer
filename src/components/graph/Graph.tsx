import cytoscape from 'cytoscape';
import { useEffect, useState } from 'react';
import { Color } from 'react-color';
import { createCytoscape } from '../../cytoscape/cytoscape';
import Gfa from '../../models/gfa';
import '../../styles/graph.css';
import ErrorCard from '../ErrorCard';
import SpinnerAnnotated from '../SpinnerAnnotated';

export interface GraphSettings {
  drawPaths: boolean;
  drawLabels: boolean;
  segmentWidth: number;
  linkWidth: number;
  pathColors: Color[];
  enabledPaths: boolean[];
}

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
  const [cy, setCy] = useState<cytoscape.Core>();
  const [error, setError] = useState<Error | undefined>(undefined);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setError(undefined);

    // TODO: This code is blocking and don't know why yet
    const updateGraph = () => {
      if (!props.gfa) return;
      createCytoscape(settings, props.gfa).then(
        (result: cytoscape.Core | undefined) => {
          if (result) {
            setCy(result);
            setIsLoaded(true);
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
