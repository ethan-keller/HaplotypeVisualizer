import { useMemo } from 'react';
import { cytoscapeEdges, cytoscapeNodes } from './cytoscape';
import { Layout } from '../../types/layout';
import { Graph as GraphType } from '../../types/graph';
import { useAppSelector } from '../../store';
import gfaApi from '../../api/gfa';
import CytoscapeWrapper from './CytoscapeWrapper';
import SpinnerAnnotated from '../SpinnerAnnotated';
import { GfaLink, GfaSegment } from '../../types/gfa';

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
      return {
        nodes: cytoscapeNodes(
          filterSegments(segments, sampleFilteredSegments, phenoFilteredSegments),
          paths,
          graphSettings,
        ),
        edges: cytoscapeEdges(
          filterLinks(links, layout, sampleFilteredSegments, phenoFilteredSegments),
          paths,
          graphSettings,
        ),
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

const filterLinks = (
  links: GfaLink[],
  layout: Layout,
  sampleFilteredSegments?: Set<string>,
  phenoFilteredSegments?: Set<string>,
) => {
  return links.filter(
    (link) =>
      // check if in layout
      link.from_segment in layout &&
      link.to_segment in layout &&
      // check if in sample filter
      (isFilterAvailable(sampleFilteredSegments)
        ? sampleFilteredSegments!.has(link.from_segment) &&
          sampleFilteredSegments!.has(link.to_segment)
        : // check if in pheno filter
          true) &&
      (isFilterAvailable(phenoFilteredSegments)
        ? phenoFilteredSegments!.has(link.from_segment) &&
          phenoFilteredSegments!.has(link.to_segment)
        : true),
  );
};
const filterSegments = (
  segments: GfaSegment[],
  sampleFilteredSegments?: Set<string>,
  phenoFilteredSegments?: Set<string>,
) => {
  return segments.filter((segment) =>
    // check if in sample filter
    isFilterAvailable(sampleFilteredSegments)
      ? sampleFilteredSegments!.has(segment.name)
      : // check if in pheno filter
      true && isFilterAvailable(phenoFilteredSegments)
      ? phenoFilteredSegments!.has(segment.name)
      : true,
  );
};

const isFilterAvailable = (filter?: Set<string>) => {
  return filter !== undefined && filter.size !== 0;
};

export default Graph;
