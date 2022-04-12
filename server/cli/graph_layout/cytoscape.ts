import cytoscape, { EdgeDefinition, NodeDefinition } from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { Gfa, GfaSegment, GfaLink } from './types';
import process from 'process';

cytoscape.use(dagre);

// TODO: sync to redux store values
const drawPaths = true;
const linkThickness = 1.5;
const segmentThickness = 10;
const pathColors = ['#EF476F', '#FFD166', '#06D6A0', '#118AB2', '#073B4C'];

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
          2 *
          Math.cbrt(
            segment.optionals && 'LN' in segment.optionals
              ? segment.optionals.LN
              : segment.sequence.length,
          ),
        height: segmentThickness * (drawPaths ? Math.max(segment.paths.length, 1) : 1),
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
        width: linkThickness * (drawPaths ? Math.max(link.paths.length, 1) : 1),
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
    style: [
      {
        selector: 'node',
        style: {
          shape: 'rectangle',
          width: 'data(width)',
          height: 'data(height)',
        },
      },
      {
        selector: 'edge',
        style: {
          'target-arrow-shape': 'triangle',
          'arrow-scale': 0.8,
          'curve-style': 'bezier',
          width: 'data(width)',
        },
      },
    ],
  });
}

const gfa: Gfa = JSON.parse(process.argv[3]);
let positions: Record<string, cytoscape.Position> = {};
let bounds: Record<string, { xl: number; xr: number }> = {};

createCytoscape(gfa)
  .nodes()
  .forEach((node) => {
    positions[node.id()] = node.position();
    const bb = node.boundingBox({});
    bounds[node.id()] = { xl: bb.x1, xr: bb.x2 };
  });

process.stdout.write(JSON.stringify({ positions: positions, bounds: bounds }));
