import cytoscape, { EdgeDefinition, NodeDefinition } from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { getGfa } from './endpoints';
import { Gfa, GfaSegment, GfaLink } from './types';
import axios from 'axios';
import process from 'process';

cytoscape.use(dagre);

const segmentThickness = 10;
const linkThickness = 1.5;

const layoutSettings: dagre.DagreLayoutOptions = {
  name: 'dagre',
  rankDir: 'LR',
  //@ts-ignore 'align' is not in type declaration but it is in source code
  align: 'UL',
  fit: true,
  nodeSep: 35,
};

const cytoscapeNodes = (segments: GfaSegment[]) => {
  return segments.map((segment: GfaSegment) => {
    return {
      data: {
        id: segment.name,
        width:
          120 * Math.sqrt(segment.optionals ? segment.optionals['LN'] : segment.sequence.length),
        height: segmentThickness * Math.max(segment.paths.length, 1),
      },
    };
  }) as NodeDefinition[];
};

const cytoscapeEdges = (links: GfaLink[]) => {
  return links.map((link: GfaLink) => {
    return {
      data: {
        source: link.from_segment,
        target: link.to_segment,
        width: linkThickness * Math.max(link.paths.length, 1),
      },
    };
  }) as EdgeDefinition[];
};

function createCytoscape(gfa: Gfa): cytoscape.Core {
  return cytoscape({
    layout: layoutSettings,
    elements: {
      nodes: cytoscapeNodes(gfa.segments),
      edges: cytoscapeEdges(gfa.links),
    },
  });
}

axios
  .get(getGfa)
  .then((res) => res.data)
  // TODO: handle error and communicate it to client
  .then((gfa: Gfa) => {
    let positions: Record<string, cytoscape.Position> = {};
    createCytoscape(gfa)
      .nodes()
      .forEach((node) => {
        positions[node.id()] = node.position();
      });
    process.stdout.write(JSON.stringify({ positions: positions }));
  })
  .catch((err) => {
    throw new Error(err);
  });

// fetch(getGfa)
//   .then((res) => res.json())
//   .then((gfa: Gfa) => {
//     var positions: Record<string, cytoscape.Position>;
//     createCytoscape(gfa)
//       .nodes()
//       .forEach((node) => {
//         positions[node.id()] = node.position();
//       });
//   })
//   .catch((err) => {
//     throw new Error(err);
//   });

// fetch("www.google.com").then(() => console.log("HI"))
