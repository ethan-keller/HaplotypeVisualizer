interface Layout {
  positions: Record<string, Position>;
}

export interface Position {
  x: number;
  y: number;
}

export default Layout;