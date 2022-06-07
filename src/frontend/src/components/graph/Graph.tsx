import { useMemo } from 'react';
import { cytoscapeEdges, cytoscapeNodes } from './cytoscape_core';
import { Layout } from '../../types/layout';
import { Graph as GraphType, GraphSettings } from '../../types/graph';
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
  pheno?: boolean;
}

const Graph: React.FC<GraphProps> = ({
  layout,
  sampleFilteredSegments,
  phenoFilteredSegments,
  pheno,
}) => {
  const segmentIds = useMemo(
    () => Object.values(layout).map((layoutNode) => layoutNode.segment_id),
    [layout],
  );

  const graphSettings = useAppSelector((state) => state.graphSettings);
  const isolate = useAppSelector((state) => state.pheno.isolate);
  const { data: segments } = gfaApi.useGetSegmentsQuery(segmentIds);
  const { data: links } = gfaApi.useGetLinksQuery(segmentIds);
  const { data: paths } = gfaApi.useGetPathsQuery();

  const filter = useMemo(
    () => intersection(sampleFilteredSegments, phenoFilteredSegments),
    [sampleFilteredSegments, phenoFilteredSegments],
  );

  const graph = useMemo(() => {
    if (segments && links && paths) {
      const settings: GraphSettings = pheno
        ? { ...graphSettings, drawPaths: false }
        : graphSettings;
      return {
        nodes: cytoscapeNodes(filterSegments(segments, filter), paths, settings, pheno, isolate),
        edges: cytoscapeEdges(filterLinks(links, layout, filter), paths, settings, pheno, isolate),
      } as GraphType;
    }
  }, [paths, segments, links, graphSettings, filter, pheno, isolate]);

  return graph ? (
    <CytoscapeWrapper graph={graph} layout={layout} pheno={pheno} />
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
const filterSegments = (segments: GfaSegment[], filteredSegments?: Set<string>) => {
  return isSetUndefinedOrEmpty(filteredSegments)
    ? segments
    : segments.filter((segment) => filteredSegments!.has(segment.name));
};

export default Graph;
