import { useEffect, useState } from 'react';
import gfaApi from '../../api/gfa';
import layoutApi from '../../api/layout';
import { cytoscapeNodes, cytoscapeEdges } from '../../cytoscape/cytoscape';
import { useAppSelector } from '../../store';
import Graph from '../../types/graph';
import SpinnerAnnotated from '../SpinnerAnnotated';
import GraphComponent from './Graph';

interface GraphWrapperProps {}

const GraphWrapper: React.FC<GraphWrapperProps> = (props) => {
  // const { data: segments } = gfaApi.useGetSegmentsQuery();
  // const { data: links } = gfaApi.useGetLinksQuery();
  const { data: gfa } = gfaApi.useGetGfaQuery();
  const graphSettings = useAppSelector((state) => state.graphSettings);
  const [graph, setGraph] = useState<Graph | undefined>();
  const viewport = useAppSelector((state) => state.graphLayout.viewport);
  const { data: layout } = layoutApi.useGetRangeLayoutNodesQuery(viewport);

  useEffect(() => {
    if (gfa && layout) {
      setGraph({
        nodes: cytoscapeNodes(
          gfa.segments.filter((segment) => segment.name in layout),
          graphSettings,
        ),
        edges: cytoscapeEdges(
          gfa.links.filter((link) => link.from_segment in layout && link.to_segment in layout),
          graphSettings,
        ),
      });
    }
  }, [gfa, layout, graphSettings]);

  return graph && layout ? (
    <>
      <GraphComponent graph={graph} layout={layout} />
    </>
  ) : (
    <SpinnerAnnotated message='Loading graph' />
  );
};

export default GraphWrapper;
