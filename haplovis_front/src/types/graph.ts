import { EdgeDefinition, NodeDefinition } from 'cytoscape';

export interface Graph {
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

export interface FeatureSelection {
  type: string;
  name: string;
}

export interface GraphSelectionState {
  feature?: FeatureSelection;
}
