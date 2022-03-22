import React, { useEffect, useState } from 'react';
import gfaApi from '../api/gfa';
import layoutApi from '../api/layout';
import Graph from '../components/graph/Graph';
import GraphType from '../types/graph';
import Header from '../components/Header';
import PhenoGraphSidebar from '../components/sidebar/PhenoGraphSidebar';
import SpinnerAnnotated from '../components/SpinnerAnnotated';
import { cytoscapeNodes, cytoscapeEdges } from '../cytoscape/cytoscape';
import { useAppSelector } from '../store';
import '../styles/pheno-graph-view.css';

interface PhenoGraphViewProps {}

const PhenoGraphView: React.FC<PhenoGraphViewProps> = (props) => {
  const { data: layout, isLoading } = layoutApi.useGetNodePositionsQuery();
  const { data: segments } = gfaApi.useGetSegmentsQuery();
  const { data: links } = gfaApi.useGetLinksQuery();
  const graphSettings = useAppSelector((state) => state.graphSettings);

  const [graph, setGraph] = useState<GraphType | undefined>(undefined);

  useEffect(() => {
    if (segments && links) {
      const graph = {
        nodes: cytoscapeNodes(segments, graphSettings),
        edges: cytoscapeEdges(links, graphSettings),
      };
      setGraph(graph);
    }
  }, [segments, links, graphSettings]);

  return (
    <>
      <Header />
      <div className='ph-g-container'>
        <div className='ph-g-sidebar'>
          <PhenoGraphSidebar />
        </div>

        <div className='ph-g-graph'>
          {isLoading ? (
            <SpinnerAnnotated message='Loading graph' />
          ) : layout && graph && graphSettings ? (
            <Graph graph={graph} settings={graphSettings} layout={layout} />
          ) : null}
        </div>

        <div className='ph-g-navigator' style={{ backgroundColor: '#dbebb7' }}>
          Navigator
        </div>
      </div>
    </>
  );
};

export default PhenoGraphView;
export const url = '/pheno_graph';
