import { useEffect, useState } from 'react';
import { createCytoscape, GraphSettings } from '../logic/graph';
import GfaCommunication from '../server_communication/GfaCommunication';
import '../styles/graph.css';

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

  useEffect(() => {
    Promise.all([GfaCommunication.getSegments(), GfaCommunication.getLinks()]).then(
      ([segments, links]) => {
        setCy(createCytoscape(settings, segments, links));
      },
    );
  }, []);

  return (
    <div
      id={'graph'}
      style={{
        width: '100%',
        height: '100%',
      }}
    />
  );
};

export default Graph;
