import cytoscape, { EdgeDefinition, NodeDefinition } from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { Layout, Position } from '../../types/layout';
import { Graph, GraphSettings } from '../../types/graph';
import { GfaLink, GfaSegment } from '../../types/gfa';

cytoscape.use(dagre);

const nodeStyle = (settings: GraphSettings) => {
  return {
    shape: 'rectangle',
    width: 'data(width)',
    height: 'data(height)',
    'background-fill': settings.drawPaths ? 'linear-gradient' : 'solid',
    'background-gradient-stop-colors': settings.drawPaths ? 'data(stopColors)' : undefined,
    'background-gradient-stop-positions': settings.drawPaths ? 'data(stopPositions)' : undefined,
    label: settings.drawLabels ? 'data(id)' : undefined,
  };
};

const edgeStyle = (settings: GraphSettings) => {
  return {
    'target-arrow-shape': 'triangle',
    'arrow-scale': 0.8,
    'curve-style': 'bezier',
    width: 'data(width)',
    // 'line-gradient-direction': 'to-bottom',
    'line-fill': 'linear-gradient',
    'line-gradient-stop-colors': settings.drawPaths ? 'data(stopColors)' : undefined,
    'line-gradient-stop-positions': settings.drawPaths ? 'data(stopPositions)' : undefined,
  };
};

const overlayStyle = (color: string) => {
  return {
    'target-arrow-color': color,
    'overlay-padding': '5px',
    'overlay-color': color,
    'overlay-opacity': 0.25,
  };
};

export const cytoscapeNodes = (segments: GfaSegment[], settings: GraphSettings) => {
  return segments.map((segment: GfaSegment) => {
    return {
      // TODO: create types for custom node data (and edge data) to be used on other files
      data: {
        id: segment.name,
        width:
          2 *
          Math.cbrt(
            segment.optionals && 'LN' in segment.optionals
              ? segment.optionals.LN
              : segment.sequence.length,
          ),
        height:
          settings.segmentThickness * (settings.drawPaths ? Math.max(segment.paths.length, 1) : 1),
        stopColors: segment.paths.flatMap((path) => {
          if (settings.activePaths.length === 0) {
            return [settings.pathColors[path.index], settings.pathColors[path.index]];
          } else {
            let c = settings.activePaths[path.index] ? settings.pathColors[path.index] : '#999999';
            return [c, c];
          }
        }),
        stopPositions: segment.paths.flatMap((_, i, array) => [
          (i / array.length) * 100,
          ((i + 1) / array.length) * 100,
        ]),
        feature: { type: segment.type, name: segment.name },
      },
    };
  }) as NodeDefinition[];
};

export const cytoscapeEdges = (links: GfaLink[], settings: GraphSettings) => {
  return links.map((link: GfaLink) => {
    return {
      data: {
        source: link.from_segment,
        target: link.to_segment,
        width: settings.linkThickness * (settings.drawPaths ? Math.max(link.paths.length, 1) : 1),
        stopColors: link.paths.flatMap((path) => {
          if (settings.activePaths.length === 0) {
            return [settings.pathColors[path.index], settings.pathColors[path.index]];
          } else {
            let c = settings.activePaths[path.index] ? settings.pathColors[path.index] : '#999999';
            return [c, c];
          }
        }),
        stopPositions: link.paths.flatMap((_, i, array) => [
          (i / array.length) * 100,
          ((i + 1) / array.length) * 100,
        ]),
        feature: { type: link.type, name: link.name },
      },
    };
  }) as EdgeDefinition[];
};

export function createCytoscape(
  graph: Graph,
  settings: GraphSettings,
  layout: Layout,
  zoom?: number,
  pan?: Position,
): cytoscape.Core {
  const cy = cytoscape({
    container: document.getElementById('graph'),
    elements: {
      nodes: graph.nodes,
      edges: graph.edges,
    },
    layout: {
      name: 'preset',
      positions: Object.fromEntries(Object.entries(layout).map(([k, v], i) => [k, v.position])),
      fit: false,
    },
    style: [
      {
        selector: 'node',
        style: nodeStyle(settings),
      },
      {
        selector: 'edge',
        style: edgeStyle(settings),
      },
      {
        selector: ':selected',
        style: overlayStyle('green'),
      },
      {
        selector: ':active',
        style: overlayStyle('grey'),
      },
    ],
    zoom: zoom,
    pan: pan,
    autoungrabify: true,
    userPanningEnabled: false,
    userZoomingEnabled: false,
    boxSelectionEnabled: false,
    selectionType: 'single',
    hideEdgesOnViewport: true,
    hideLabelsOnViewport: true,
    wheelSensitivity: 0.3,
  });
  return cy;
}
