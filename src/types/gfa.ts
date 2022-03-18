// TODO: containment

interface Gfa {
  readonly header?: GfaHeader;
  readonly segments: GfaSegment[];
  readonly links: GfaLink[];
  readonly paths: GfaPath[];
}

interface GfaElement {
  type: 'segment' | 'link' | 'path';
  readonly name: string;
  // TODO: make sure that value string | number fits all scenarios
  readonly optionals?: Record<GfaOptional, any>;
}

interface GfaHeader {}

interface GfaSegment extends GfaElement {
  type: 'segment';
  readonly sequence: string;
  readonly paths: GfaPath[];
}

interface GfaLink extends GfaElement {
  type: 'link';
  readonly from_segment: string;
  readonly from_orient: string;
  readonly to_segment: string;
  readonly to_orient: string;
  readonly paths: GfaPath[];
  // TODO: overlap
}

interface GfaPath extends GfaElement {
  readonly type: 'path';
  readonly segment_names: string[];
  // TODO: overlaps
}

interface GfaInfo {
  readonly n_segments: number;
  readonly n_links: number;
  readonly n_paths: number;
}

interface GfaHist {
  readonly hist: number[];
  readonly bin_edges: number[];
}

type GfaOptional = 'VN' | 'LN' | 'RC' | 'FC' | 'KC' | 'SH' | 'UR' | 'MQ' | 'NM' | 'ID';
type GfaFeature = GfaSegment | GfaLink;

export const getSegmentLength = (segment: GfaSegment) => {
  if (segment.optionals && segment.optionals.LN) {
    return segment.optionals.LN;
  } else {
    return segment.sequence.length;
  }
};

export type {
  GfaElement,
  GfaHeader,
  GfaSegment,
  GfaLink,
  GfaOptional,
  GfaPath,
  GfaInfo,
  GfaHist,
  GfaFeature,
};
export default Gfa;
