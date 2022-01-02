import cytoscape from 'cytoscape';
import { Color } from 'd3';
import dagre, { DagreLayoutOptions } from 'cytoscape-dagre';
import { GfaLink, GfaSegment } from '../models/gfa';

export interface GraphSettings {
  drawPaths: boolean;
  drawLabels: boolean;
  segmentWidth: number;
  linkWidth: number;
  pathColors: Color[];
  enabledPaths: boolean[];
}
cytoscape.use(dagre);
export function createCytoscape(settings: GraphSettings, segments: GfaSegment[], links: GfaLink[]) {
  return cytoscape({
    container: document.getElementById('graph'),
    autounselectify: false,
    layout: {
      name: 'dagre',
      rankDir: 'LR',
      fit: false,
      nodeDimensionsIncludeLabels: false,
      nodeSep: 35,
    } as DagreLayoutOptions,
    style: [
      {
        selector: 'node',
        style: {
          shape: 'rectangle',
          width: 'data(width)',
          height: 'data(height)',
          'background-fill': settings.drawPaths ? 'linear-gradient' : 'solid',
          'background-gradient-stop-colors': settings.drawPaths ? 'data(stopColors)' : undefined,
          'background-gradient-stop-positions': settings.drawPaths
            ? 'data(stopPositions)'
            : undefined,
          label: settings.drawPaths ? 'data(id)' : undefined,
        } as any,
      },
      {
        selector: 'edge',
        style: {
          'target-arrow-shape': 'triangle',
          'curve-style': 'bezier',
          width: 'data(width)',
        },
      },
      {
        selector: ':selected',
        style: {
          'background-color': 'blue',
          'line-color': 'blue',
          'target-arrow-color': 'blue',
          'overlay-padding': '5px',
          'overlay-color': 'rgb(0,100,0)',
          'overlay-opacity': 0.25,
        },
      },
      {
        selector: ':active',
        style: {
          'overlay-padding': '5px',
          'overlay-color': 'rgb(0,100,0)',
          'overlay-opacity': 0.25,
        },
      },
    ],
    elements: {
      nodes: segments.map((segment: GfaSegment) => {
        return {
          data: {
            id: segment.name,
            width:
              2 * Math.sqrt(segment.optionals ? segment.optionals['LN'] : segment.sequence.length),
            height: 10,
          },
        };
      }),
      edges: links.map((link: GfaLink) => {
        return {
          data: {
            source: link.from_segment,
            target: link.to_segment,
            width: settings.linkWidth,
          },
        };
      }),
    },
    minZoom: 0.1,
    maxZoom: 4,
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
