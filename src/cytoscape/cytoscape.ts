import cytoscape, { EdgeDefinition, NodeDefinition } from 'cytoscape';
import dagre from 'cytoscape-dagre';
import Layout, { Position } from '../types/layout';
import Graph, { GraphSettings } from '../types/graph';
import { GfaLink, GfaSegment } from '../types/gfa';

cytoscape.use(dagre);

const nodeStyle = (settings: GraphSettings) => {
  return {
    shape: 'rectangle',
    width: 'data(width)',
    height: 'data(height)',
    'background-fill': settings.drawPaths ? 'linear-gradient' : 'solid',
    'background-gradient-stop-colors': settings.drawPaths ? 'data(stopColors)' : undefined,
    'background-gradient-stop-positions': settings.drawPaths ? 'data(stopPositions)' : undefined,
    // label: settings.drawPaths ? 'data(height)' : undefined,
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

// const coreStyle = {};

export const cytoscapeNodes = (segments: GfaSegment[], settings: GraphSettings) => {
  return segments.map((segment: GfaSegment) => {
    return {
      data: {
        id: segment.name,
        width: 2 * Math.cbrt(segment.optionals ? segment.optionals['LN'] : segment.sequence.length),
        height:
          settings.segmentThickness * (settings.drawPaths ? Math.max(segment.paths.length, 1) : 1),
        stopColors: segment.paths.flatMap((_, i) => [
          settings.pathColors[i],
          settings.pathColors[i],
        ]),
        stopPositions: segment.paths.flatMap((_, i, array) => [
          (i / array.length) * 100,
          ((i + 1) / array.length) * 100,
        ]),
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
        stopColors: link.paths.flatMap((_, i) => [settings.pathColors[i], settings.pathColors[i]]),
        stopPositions: link.paths.flatMap((_, i, array) => [
          (i / array.length) * 100,
          ((i + 1) / array.length) * 100,
        ]),
      },
    };
  }) as EdgeDefinition[];
};

function createLayoutWithPositions(
  positions: Record<string, Position>,
): cytoscape.PresetLayoutOptions {
  return {
    name: 'preset',
    positions: positions,
  };
}

export function createCytoscape(
  graph: Graph,
  settings: GraphSettings,
  layout: Layout,
): cytoscape.Core {
  return cytoscape({
    container: document.getElementById('graph'),
    layout: createLayoutWithPositions(layout.positions),
    elements: {
      nodes: graph.nodes,
      edges: graph.edges,
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
    ],
    minZoom: 0.1,
    maxZoom: 4,
    autoungrabify: true,
    selectionType: 'single',
    hideEdgesOnViewport: true,
    hideLabelsOnViewport: true,
    wheelSensitivity: 0.5,
  });
}


// function setEventListeners(
//   cy: cytoscape.Core,
//   props: GraphProps,
//   onFeatureClick: (feature: GFAFeature | undefined) => void,
// ) {
//   cy.on('zoom', (e) => props.setZoom(e.cy.zoom()));
//   cy.on('unselect', (_) => onFeatureClick(undefined));
//   cy.on('select', (e) => onFeatureClick(e.target.data('feature')));
// }
