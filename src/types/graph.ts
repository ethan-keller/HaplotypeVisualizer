import { EdgeDefinition, NodeDefinition } from "cytoscape";

interface Graph {
    nodes: NodeDefinition[];
    edges: EdgeDefinition[];
}

export interface GraphSettings {
    drawPaths: boolean;
    linkThickness: number;
    segmentThickness: number;
    pathColors: string[];
  }

export default Graph;