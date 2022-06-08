import cytoscape, { EdgeDefinition, NodeDefinition } from 'cytoscape';
import dagre from 'cytoscape-dagre';
import { Layout, Position } from '../../types/layout';
import { FeatureSelection, Graph, GraphSettings } from '../../types/graph';
import { GfaFeature, GfaLink, GfaPath, GfaSegment } from '../../types/gfa';
import { PhenoIsolate } from '../../types/pheno';

cytoscape.use(dagre);

const nodeStyle = (settings: GraphSettings, phenoIsolationMode?: boolean) => {
  return {
    shape: 'rectangle',
    width: 'data(width)',
    height: 'data(height)',
    'background-fill': phenoIsolationMode || settings.drawPaths ? 'linear-gradient' : 'solid',
    'background-gradient-stop-colors':
      phenoIsolationMode || settings.drawPaths ? 'data(stopColors)' : undefined,
    'background-gradient-stop-positions':
      phenoIsolationMode || settings.drawPaths ? 'data(stopPositions)' : undefined,
    label: settings.drawLabels ? 'data(id)' : undefined,
  };
};

const edgeStyle = (settings: GraphSettings, phenoIsolationMode?: boolean) => {
  return {
    'curve-style': 'straight',
    'target-arrow-shape': settings.drawArrows ? 'triangle' : 'none',
    'arrow-scale': 0.8,
    width: 'data(width)',
    'line-fill': 'linear-gradient',
    'line-gradient-stop-colors':
      phenoIsolationMode || settings.drawPaths ? 'data(stopColors)' : undefined,
    'line-gradient-stop-positions':
      phenoIsolationMode || settings.drawPaths ? 'data(stopPositions)' : undefined,
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

export const cytoscapeNodes = (
  segments: GfaSegment[],
  paths: Record<string, GfaPath>,
  settings: GraphSettings,
  pheno?: boolean,
  isolate?: PhenoIsolate,
) => {
  return segments.map((segment: GfaSegment) => {
    const isolatedColors = isolate
      ? Object.keys(isolate.isolateColors).length !== 0 && segment.name in isolate.isolateColors
        ? isolate.isolateColors[segment.name]
        : ['#000000']
      : undefined;
    const gradient = getGradient(segment, paths, settings, isolatedColors);
    const phenoIsolationMode = pheno && isolate !== undefined;
    return {
      // TODO: create type for data object
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
          settings.segmentThickness *
          (settings.drawPaths || phenoIsolationMode ? Math.max(segment.paths.length, 1) : 1),
        stopColors: gradient.stopColors,
        stopPositions: gradient.stopPositions,
        feature: { type: segment.type, name: segment.name },
      },
    };
  }) as NodeDefinition[];
};

export const cytoscapeEdges = (
  links: GfaLink[],
  paths: Record<string, GfaPath>,
  settings: GraphSettings,
  pheno?: boolean,
  isolate?: PhenoIsolate,
) => {
  const phenoIsolationMode = pheno && isolate !== undefined;
  return links.map((link: GfaLink) => {
    let isolatedColors = undefined;
    if (isolate) {
      if (
        Object.keys(isolate.isolateColors).length !== 0 &&
        link.from_segment in isolate.isolateColors &&
        link.to_segment in isolate.isolateColors
      ) {
        if (
          isolate.isolateColors[link.from_segment].length <
          isolate.isolateColors[link.to_segment].length
        ) {
          isolatedColors = isolate.isolateColors[link.from_segment];
        } else {
          isolatedColors = isolate.isolateColors[link.to_segment];
        }
      } else {
        isolatedColors = ['#000000'];
      }
    }

    if (link.name === 'S10->S12') {
      console.log(isolate);
    }
    const gradient = getGradient(link, paths, settings, isolatedColors);
    return {
      data: {
        id: link.name,
        source: link.from_segment,
        target: link.to_segment,
        width:
          settings.linkThickness *
          (settings.drawPaths || phenoIsolationMode ? Math.max(link.paths.length, 1) : 1),
        stopColors: gradient.stopColors,
        stopPositions: gradient.stopPositions,
        feature: { type: link.type, name: link.name },
      },
    };
  }) as EdgeDefinition[];
};

const getGradient = (
  feature: GfaFeature,
  paths: Record<string, GfaPath>,
  settings: GraphSettings,
  isolateColors?: string[],
) => {
  const gradient: { stopColors: string[]; stopPositions: number[] } = {
    stopColors: [],
    stopPositions: [],
  };

  if (isolateColors) {
    isolateColors.forEach((color, i, array) => {
      gradient.stopColors.push(color, color);
      gradient.stopPositions.push((i / array.length) * 100, ((i + 1) / array.length) * 100);
    });
  } else {
    if (Object.keys(paths).length === 0) {
      gradient.stopColors.push('#999999', '#999999');
      gradient.stopPositions.push(0, 100);
    } else {
      feature.paths.forEach((path, i, array) => {
        const index = paths[path].index;
        const c = settings.activePaths[index] ? settings.pathColors[index] : '#999999';
        gradient.stopColors.push(c, c);
        gradient.stopPositions.push((i / array.length) * 100, ((i + 1) / array.length) * 100);
      });
    }
  }

  return gradient;
};

export function createCytoscape(
  graph: Graph,
  settings: GraphSettings,
  layout: Layout,
  zoom?: number,
  pan?: Position,
  selectedFeature?: FeatureSelection,
  pheno?: boolean,
  isolate?: PhenoIsolate,
): cytoscape.Core {
  const s = new Set(graph.nodes.map((node) => node.data.id));
  const g = {
    nodes: graph.nodes,
    edges: graph.edges.filter((edge) => s.has(edge.data.source) && s.has(edge.data.target)),
  };
  const phenoIsolationMode = pheno && isolate !== undefined;
  const cy = cytoscape({
    container: document.getElementById('graph'),
    elements: {
      nodes: g.nodes,
      edges: g.edges,
    },
    layout: {
      name: 'preset',
      positions: Object.fromEntries(Object.entries(layout).map(([k, v], i) => [k, v.position])),
      fit: false,
    },
    style: [
      {
        selector: 'node',
        style: nodeStyle(settings, phenoIsolationMode),
      },
      {
        selector: 'edge',
        style: edgeStyle(settings, phenoIsolationMode),
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
    minZoom: 0.3,
    maxZoom: 7,
  });
  if (selectedFeature) {
    cy.$id(selectedFeature.name).select().active();
  }
  return cy;
}
