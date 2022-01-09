import cytoscape from 'cytoscape';
import Gfa, { GfaLink, GfaSegment } from '../models/gfa';
import dagre from '.';
import { GraphSettings } from '../components/graph/Graph';

cytoscape.use(dagre);

const layoutSettings = {
  name: 'dagre',
  rankDir: 'LR',
  align: 'UL',
  fit: true,
  nodeDimensionsIncludeLabels: false,
  nodeSep: 35,
};

const nodeStyle = (settings: GraphSettings) => {
  return {
    shape: 'rectangle',
    width: 'data(width)',
    height: 'data(height)',
    'background-fill': settings.drawPaths ? 'linear-gradient' : 'solid',
    // TODO: try with line gradient (if it works remove 'as any')
    'background-gradient-stop-colors': settings.drawPaths ? 'data(stopColors)' : undefined,
    'background-gradient-stop-positions': settings.drawPaths ? 'data(stopPositions)' : undefined,
    label: settings.drawPaths ? 'data(id)' : undefined,
  };
};

const edgeStyle = {
  'target-arrow-shape': 'triangle',
  'curve-style': 'bezier',
  width: 'data(width)',
};

const cytoscapeNodes = (segments: GfaSegment[]) => {
  return segments.map((segment: GfaSegment) => {
    return {
      data: {
        id: segment.name,
        width:
          120 * Math.sqrt(segment.optionals ? segment.optionals['LN'] : segment.sequence.length),
        height: 10,
      },
    };
  });
};

const cytoscapeEdges = (links: GfaLink[], settings: GraphSettings) => {
  return links.map((link: GfaLink) => {
    return {
      data: {
        source: link.from_segment,
        target: link.to_segment,
        width: settings.linkWidth,
      },
    };
  });
};

// const coreStyle = {};

export function createCytoscape(settings: GraphSettings, gfa: Gfa): Promise<cytoscape.Core> {
  return new Promise((resolve, reject) => {
    resolve(
      cytoscape({
        container: document.getElementById('graph'),
        layout: layoutSettings as any,
        style: [
          // TODO: memoize style
          {
            selector: 'node',
            style: nodeStyle(settings) as any,
          },
          {
            selector: 'edge',
            style: edgeStyle,
          },
          // TODO: add special core styling
          // {
          //   selector: 'core',
          //   style: {
          //     'active-bg-color': 'blue'
          //   }
          // }
        ],
        elements: {
          nodes: cytoscapeNodes(gfa.segments),
          edges: cytoscapeEdges(gfa.links, settings),
        },
        minZoom: 0.1,
        maxZoom: 4,
        autoungrabify: true,
        selectionType: 'single',
        hideEdgesOnViewport: true,
        hideLabelsOnViewport: true,
        wheelSensitivity: 0.5,
      }),
    );
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

// function renderPaths(layers: any) {
//   layers.renderPerEdge(
//     layers.append('canvas'),
//     (ctx: CanvasRenderingContext2D, edge: EdgeSingular, path: Path2D) => {
//       if (edge.scratch('gradient_cache_key') !== path) {
//         const length = Math.sqrt(
//           (edge.sourceEndpoint().y - edge.targetEndpoint().y) ** 2 +
//             (edge.targetEndpoint().x - edge.sourceEndpoint().x) ** 2,
//         );
//         if (length > 0) {
//           const [x1, y1] = [
//             edge.midpoint().x -
//               (edge.width() / 2 / length) * (edge.sourceEndpoint().y - edge.targetEndpoint().y),
//             edge.midpoint().y -
//               (edge.width() / 2 / length) * (edge.targetEndpoint().x - edge.sourceEndpoint().x),
//           ];
//           const [x2, y2] = [
//             edge.midpoint().x +
//               (edge.width() / 2 / length) * (edge.sourceEndpoint().y - edge.targetEndpoint().y),
//             edge.midpoint().y +
//               (edge.width() / 2 / length) * (edge.targetEndpoint().x - edge.sourceEndpoint().x),
//           ];
//           const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
//           const stopColors: string[] = edge.data('stopColors');
//           const stopPositions = edge.data('stopPositions');
//           stopColors.forEach((color, index) => {
//             //console.log("color: " + color + "\n index: " + index + "\n\n")
//             gradient.addColorStop(stopPositions[index], color);
//           });
//           edge.scratch('gradient_cache_key', path);
//           edge.scratch('gradient_cache_value', gradient);
//           ctx.strokeStyle = gradient;
//           ctx.lineWidth = edge.width();
//           ctx.stroke(path);
//         }
//       } else {
//         ctx.strokeStyle = edge.scratch('gradient_cache_value');
//         ctx.lineWidth = edge.width();
//         ctx.stroke(path);
//       }
//     },
//   );
// }
