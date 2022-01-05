import cytoscape from 'cytoscape';
import { Color } from 'd3';
import dagre, { DagreLayoutOptions } from 'cytoscape-dagre';
import Gfa, { GfaLink, GfaSegment } from '../models/gfa';
import { Singular } from 'cytoscape';

export interface GraphSettings {
  drawPaths: boolean;
  drawLabels: boolean;
  segmentWidth: number;
  linkWidth: number;
  pathColors: Color[];
  enabledPaths: boolean[];
}
cytoscape.use(dagre);
export function createCytoscape(settings: GraphSettings, gfa?: Gfa): Promise<cytoscape.Core | undefined> {
  return new Promise((resolve, reject) => {
    if (!gfa) resolve(undefined);
    resolve(
      cytoscape({
        container: document.getElementById('graph'),
        autounselectify: false,
        layout: {
          name: 'dagre',
          rankDir: 'LR',
          fit: true,
          nodeDimensionsIncludeLabels: false,
          nodeSep: 35,
        } as DagreLayoutOptions,
        style: [
          // TODO: memoize style
          {
            selector: 'node',
            style: {
              shape: 'rectangle',
              width: 'data(width)',
              height: 'data(height)',
              'background-fill': settings.drawPaths ? 'linear-gradient' : 'solid',
              // TODO: try with line gradient (if it works remove 'as any')
              'background-gradient-stop-colors': settings.drawPaths
                ? 'data(stopColors)'
                : undefined,
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
              width: (ele: Singular) => ele.data('width'),
            },
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
          nodes: gfa!.segments.map((segment: GfaSegment) => {
            return {
              data: {
                id: segment.name,
                width:
                  2 *
                  Math.sqrt(segment.optionals ? segment.optionals['LN'] : segment.sequence.length),
                height: 10,
              },
            };
          }),
          edges: gfa!.links.map((link: GfaLink) => {
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
