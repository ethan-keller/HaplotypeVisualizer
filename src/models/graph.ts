// import {SimulationLinkDatum, SimulationNodeDatum} from "d3-force"
// import GFA, { GFASegment, GFALink } from "./gfa/GFA"

// export interface GFAGraphNode extends SimulationNodeDatum {
//   id: string
// }

// export interface GFAGraphLink<T extends GFAFeature> extends SimulationLinkDatum<GFAGraphNode> {
//   feature: T
// }

// export interface GFAGraph {
//   nodes: GFAGraphNode[]
//   segmentLinks: GFAGraphLink<GFASegment>[]
//   linkLinks: GFAGraphLink<GFALink>[]
// }

// export interface GraphSettings {
//   segmentWidth: number
//   linkWidth: number
// }

// export interface GraphProps {
//   gfa: GFA
//   settings: GraphSettings
//   drawPaths: boolean
//   drawLabels: boolean
//   redraw: number
//   onFeatureClick: (feature?: GFAFeature) => void
//   pathColors: {color: string, enabled: boolean}[]
//   zoom: number
//   setZoom: (zoom: number) => void
// }

// //TODO: add GFAPath?
// export type GFAFeature = GFASegment | GFALink



// export function createGFAGraph(gfa: GFA, chunkSize: number): GFAGraph {
//   const graph: GFAGraph = {
//     nodes: [],
//     segmentLinks: [],
//     linkLinks: []
//   }
//   for (const segment of gfa.segments) {
//     const size = Math.ceil(segment.length / chunkSize)
//     for (let i = 0; i < size; i++) {
//       graph.nodes.push({
//         id: `${segment.name}-${i === 0 ? "start" : i}`
//       })
//       graph.segmentLinks.push({
//         feature: segment,
//         source: `${segment.name}-${i === 0 ? "start" : i}`,
//         target: `${segment.name}-${i < size - 1 ? i + 1 : "end"}`
//       })
//     }
//     graph.nodes.push({
//       id: `${segment.name}-end`
//     })
//   }
//   for (const link of gfa.links) {
//     graph.linkLinks.push({
//       feature: link,
//       source: `${link.from}-${link.fromOrient === "+" ? "end" : "start"}`,
//       target: `${link.to}-${link.toOrient === "+" ? "start" : "end"}`
//     })
//   }
//   return graph
// }

// export function projectLine(x1: number, y1: number, x2: number, y2: number, dt: number): number[] {
//   const d = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2)
//   return [x2 + dt * (x2 - x1) / d, y2 + dt * (y2 - y1) / d]
// }

// export function getGradientCoordinates(x1: number, y1: number, x2: number, y2: number, width: number): number[] {
//   let dx = x2 - x1
//   let dy = y2 - y1
//   const len = Math.sqrt(dx * dx + dy * dy)
//   const tmp = dx / len
//   dx = -dy / len * width
//   dy = tmp * width
//   return [x1 + dx * 0.5, y1 + dy * 0.5, x1 - dx * 0.5, y1 - dy * 0.5]
// }
export default {}