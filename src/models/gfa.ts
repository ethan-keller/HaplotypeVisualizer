// TODO: header
// TODO: containment

export interface GfaElement {
  // TODO: change any to union of more specific types
  readonly optionals?: { key: string; value: any };
}

export interface GfaSegment extends GfaElement {
  readonly name: string;
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
  readonly name: string;
  readonly segment_names: string[];
  // TODO: overlaps
}
