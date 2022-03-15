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
      // TODO: memoize style
      {
        selector: 'node',
        style: nodeStyle(settings),
      },
      {
        selector: 'edge',
        style: edgeStyle(settings),
      },
      // TODO: add special core styling
      // {
      //   selector: 'core',
      //   style: {
      //     'active-bg-color': 'blue'
      //   }
      // }
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

const layoutSettings: dagre.DagreLayoutOptions = {
  name: 'dagre',
  rankDir: 'LR',
  //@ts-ignore 'align' is not in type declaration but it is in source code
  align: 'UL',
  fit: true,
  nodeSep: 35,
};


// export const renderPaths = (layers: any) => {
//   layers.renderPerEdge(layers.append("canvas"), (ctx: CanvasRenderingContext2D, edge: EdgeSingular, path: Path2D) => {
//     if (edge.scratch("gradient_cache_key") !== path) {
//       const length = Math.sqrt((edge.sourceEndpoint().y - edge.targetEndpoint().y) ** 2 + (edge.targetEndpoint().x - edge.sourceEndpoint().x) ** 2);
//       if (length > 0) {
//         const [x1, y1] = [edge.midpoint().x - edge.width() / 2 / length * (edge.sourceEndpoint().y - edge.targetEndpoint().y), edge.midpoint().y - edge.width() / 2 / length * (edge.targetEndpoint().x - edge.sourceEndpoint().x)];
//         const [x2, y2] = [edge.midpoint().x + edge.width() / 2 / length * (edge.sourceEndpoint().y - edge.targetEndpoint().y), edge.midpoint().y + edge.width() / 2 / length * (edge.targetEndpoint().x - edge.sourceEndpoint().x)];
//         const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
//         const stopColors: string[] = edge.data("stopColors");
//         const stopPositions = edge.data("stopPositions");
//         stopColors.forEach((color, index) => {
//           //console.log("color: " + color + "\n index: " + index + "\n\n")
//           gradient.addColorStop(stopPositions[index], color)
//         })
//         edge.scratch("gradient_cache_key", path);
//         edge.scratch("gradient_cache_value", gradient);
//         ctx.strokeStyle = gradient;
//         ctx.lineWidth = edge.width();
//         ctx.stroke(path);
//       }
//     } else {
//       ctx.strokeStyle = edge.scratch("gradient_cache_value");
//       ctx.lineWidth = edge.width();
//       ctx.stroke(path);
//     }
//   });
// }

// function setEventListeners(
//   cy: cytoscape.Core,
//   props: GraphProps,
//   onFeatureClick: (feature: GFAFeature | undefined) => void,
// ) {
//   cy.on('zoom', (e) => props.setZoom(e.cy.zoom()));
//   cy.on('unselect', (_) => onFeatureClick(undefined));
//   cy.on('select', (e) => onFeatureClick(e.target.data('feature')));
// }
