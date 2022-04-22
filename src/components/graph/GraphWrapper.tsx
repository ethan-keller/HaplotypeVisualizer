import { useEffect, useState } from 'react';
import gfaApi from '../../api/gfa';
import { cytoscapeNodes, cytoscapeEdges } from '../../cytoscape/cytoscape';
import { useAppSelector } from '../../store';
import Graph from '../../types/graph';
import SpinnerAnnotated from '../SpinnerAnnotated';
import GraphComponent from './Graph';

interface GraphWrapperProps {}

const GraphWrapper: React.FC<GraphWrapperProps> = (props) => {
  const { data: segments } = gfaApi.useGetSegmentsQuery();
  const { data: links } = gfaApi.useGetLinksQuery();
  const graphSettings = useAppSelector((state) => state.graphSettings);
  const [graph, setGraph] = useState<Graph | undefined>();

  useEffect(() => {
    if (segments && links) {
      setGraph({
        nodes: cytoscapeNodes(segments, graphSettings),
        edges: cytoscapeEdges(links, graphSettings),
      });
    }
  }, [segments, links, graphSettings]);

  return graph ? (
    <GraphComponent graph={graph} settings={graphSettings} />
  ) : (
    <SpinnerAnnotated message='Loading graph' />
  );
};

export default GraphWrapper;
