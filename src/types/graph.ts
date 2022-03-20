import { EdgeDefinition, NodeDefinition } from 'cytoscape';

interface Graph {
  nodes: NodeDefinition[];
  edges: EdgeDefinition[];
}

export interface GraphSettings {
  drawPaths: boolean;
  drawLabels: boolean;
  linkThickness: number;
  segmentThickness: number;
  pathColors: string[];
  activePaths: boolean[];
}

export default Graph;
