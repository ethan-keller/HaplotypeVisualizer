// TODO: header
// TODO: containment

export interface GfaElement {
  // TODO: change any to union of more specific types
  readonly name: string;
  readonly optionals?: Record<string, any>;
}

export interface GfaSegment extends GfaElement {
  readonly sequence: string;
}

export interface GfaLink extends GfaElement {
  readonly from_segment: string;
  readonly from_orient: string;
  readonly to_segment: string;
  readonly to_orient: string;
  // TODO: overlap
}

export interface GfaPath extends GfaElement {
  readonly segment_names: string[];
  // TODO: overlaps
}

export default interface Gfa {
  readonly segments: GfaSegment[];
  readonly links: GfaLink[];
  readonly paths: GfaPath[];
}
