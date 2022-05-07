import { useMemo } from 'react';
import { cytoscapeEdges, cytoscapeNodes } from './cytoscape';
import { Layout } from '../../types/layout';
import { Graph as GraphType } from '../../types/graph';
import { useAppSelector } from '../../store';
import gfaApi from '../../api/gfa';
import CytoscapeWrapper from './CytoscapeWrapper';
import SpinnerAnnotated from '../SpinnerAnnotated';
import { GfaLink, GfaSegment } from '../../types/gfa';
import { intersection, isSetUndefinedOrEmpty } from '../../utils/sets';

interface GraphProps {
  layout: Layout;
  sampleFilteredSegments?: Set<string>;
  phenoFilteredSegments?: Set<string>;
}

const Graph: React.FC<GraphProps> = ({ layout, sampleFilteredSegments, phenoFilteredSegments }) => {
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
      const filter = intersection(sampleFilteredSegments, phenoFilteredSegments);
      console.log('filter', filter);
      return {
        nodes: cytoscapeNodes(
          isSetUndefinedOrEmpty(filter) ? segments : filterSegments(segments, filter!),
          paths,
          graphSettings,
        ),
        edges: cytoscapeEdges(filterLinks(links, layout, filter), paths, graphSettings),
      } as GraphType;
    }
  }, [
    segments,
    paths,
    links,
    layout,
    graphSettings,
    sampleFilteredSegments,
    phenoFilteredSegments,
  ]);

  return graph ? (
    <CytoscapeWrapper graph={graph} layout={layout} />
  ) : (
    <SpinnerAnnotated message='Loading graph' />
  );
};

const filterLinks = (links: GfaLink[], layout: Layout, filteredSegments?: Set<string>) => {
  if (isSetUndefinedOrEmpty(filteredSegments)) {
    return links.filter(
      (link) =>
        // check if in layout
        link.from_segment in layout && link.to_segment in layout,
    );
  } else {
    return links.filter(
      (link) =>
        // check if in layout
        link.from_segment in layout &&
        link.to_segment in layout &&
        // check if in filter
        filteredSegments!.has(link.from_segment) &&
        filteredSegments!.has(link.to_segment),
    );
  }
};
const filterSegments = (segments: GfaSegment[], filteredSegments: Set<string>) => {
  return segments.filter((segment) => filteredSegments.has(segment.name));
};

export default Graph;
