import { useMemo } from 'react';
import { cytoscapeEdges, cytoscapeNodes } from './cytoscape';
import { Layout } from '../../types/layout';
import { Graph as GraphType } from '../../types/graph';
import { useAppSelector } from '../../store';
import gfaApi from '../../api/gfa';
import CytoscapeWrapper from './CytoscapeWrapper';
import SpinnerAnnotated from '../SpinnerAnnotated';

interface GraphProps {
  layout: Layout;
}

const Graph: React.FC<GraphProps> = ({ layout }) => {
  const segmentIds = useMemo(
    () => Object.values(layout).map((layoutNode) => layoutNode.segment_id),
    [layout],
  );
  const graphSettings = useAppSelector((state) => state.graphSettings);
  const { data: segments } = gfaApi.useGetSegmentsQuery(segmentIds);
  const { data: links } = gfaApi.useGetLinksQuery(segmentIds);
  const { data: paths } = gfaApi.useGetPathsQuery();
  const graph = useMemo(() => {
    if (segments && links && paths) {
      return {
        nodes: cytoscapeNodes(segments, paths, graphSettings),
        edges: cytoscapeEdges(
          links.filter((link) => link.from_segment in layout && link.to_segment in layout),
          paths,
          graphSettings,
        ),
      } as GraphType;
    }
  }, [segments, paths, links, layout, graphSettings]);

  return graph ? (
    <CytoscapeWrapper graph={graph} layout={layout} />
  ) : (
    <SpinnerAnnotated message='Loading graph' />
  );
};

export default Graph;
