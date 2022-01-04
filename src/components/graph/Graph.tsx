import cytoscape from 'cytoscape';
import { useEffect, useState } from 'react';
import { createCytoscape, GraphSettings } from '../../logic/graph';
import GfaCommunication from '../../server_communication/GfaCommunication';
import '../../styles/graph.css';
import ErrorCard from '../ErrorCard';
import SpinnerAnnotated from '../SpinnerAnnotated';

interface GraphProps {
  // segments: GfaSegment[];
  // links: GfaLink[];
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
    updateGraph();
  }, []);

  // TODO: This code is blocking and don't know why yet
  const updateGraph = () => {
    // Promise.all([GfaCommunication.getSegments(), GfaCommunication.getLinks()]).then(
    //   ([segments, links]) => {
    //     console.log("Server responded")
    //     createCytoscape(settings, segments, links).then((result: cytoscape.Core) => {
    //       console.log('cytoscape created')
    //       setCy(result);
    //       console.log('cytoscape is set')
    //       setIsLoaded(true);
    //       console.log('Loading done')
    //       console.log('Now rendering')
    //     });
    //   },
    //   (err: Error) => {
    //     setIsLoaded(true);
    //     setError(err);
    //     console.log(err);
    //   },
    // );
  };

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
