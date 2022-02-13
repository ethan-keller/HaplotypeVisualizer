interface Graph {
  nodes: Node[];
  edges: Edge[];
}

interface Node {
  id: string;
  position: Position;
}

interface Edge {
  id: string;
  position: Position;
}

interface Position {
  x: number;
  y: number;
}

export type { Node, Edge, Position };
export default Graph;
