import cytoscape, { EdgeDefinition, NodeDefinition } from 'cytoscape';
import { GfaFeature } from './gfa';

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

export interface GraphSelectionState {
  feature?: GfaFeature;
}