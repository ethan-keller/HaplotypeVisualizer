export interface Position {
  x: number;
  y: number;
}

export interface Bounds {
  xl: number;
  xr: number;
}

// export interface LayoutNode {
//   segment: string;
//   position: Position;
// }

export interface RectangleRange {
  lu: Position;
  rd: Position;
}

export type Layout = Record<string, Position>;

export interface GraphLayoutState {
  viewport: RectangleRange;
  zoom: number;
  pan: Position;
}