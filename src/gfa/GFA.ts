export interface GFAHeader {
    type: 'header';
    index: number;
    VN?: string;
  }
  
  export interface GFASegment {
    type: 'segment';
    index: number;
    name: string;
    sequence: string;
    length: number;
    LN?: number;
    RC?: number;
    FC?: number;
    KC?: number;
    SH?: string;
    UR?: string;
    paths: GFAPath[];
  }
  
  export interface GFALink {
    type: 'link';
    name: string;
    index: number;
    from: string;
    fromOrient: string;
    to: string;
    toOrient: string;
    overlap: string;
    MQ?: number;
    NM?: number;
    RC?: number;
    FC?: number;
    KC?: number;
    ID?: string;
    paths: GFAPath[];
  }
  
  export interface GFAContainment {
    type: 'containment';
    index: number;
    container: string;
    containerOrient: string;
    contained: string;
    containedOrient: string;
    pos: number;
    overlap: string;
    RC?: number;
    NM?: number;
    ID?: string;
  }
  
  export interface GFAPath {
    type: 'path';
    index: number;
    pathName: string;
    segmentNames: string[];
    overlaps: string[];
  }
  
  export interface GFA {
    headers: GFAHeader[];
    segments: GFASegment[];
    links: GFALink[];
    containments: GFAContainment[];
    paths: GFAPath[];
  }
  
  export let gfa: GFA;
  