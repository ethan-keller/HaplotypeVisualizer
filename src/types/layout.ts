export interface Position {
  x: number;
  y: number;
}

export interface Bounds {
  xl: number;
  xr: number;
}

export interface Layout {
  positions: Record<string, Position>;
}
