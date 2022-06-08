import { EdgeDefinition, NodeDefinition } from 'cytoscape';
import { Position } from './layout';

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
  drawArrows: boolean;
}

export interface FeatureSelection {
  type: string;
  name: string;
  position?: Position;
}

export interface GraphSelectionState {
  feature?: FeatureSelection;
}
