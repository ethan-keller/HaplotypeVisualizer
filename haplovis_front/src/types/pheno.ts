export type PhenoValue = any;
export type PhenoRecord = Record<string, PhenoValue>;
export type PhenotypeValues = Record<string, PhenoValue[]>;
export type PhenosPerSample = Record<string, PhenoRecord>;
export type PhenoIsolate = { isolateSegments: Set<string>; color: string; pheno: PhenoOption };

export interface PhenoState {
  phenoFilters: Record<string, Set<PhenoValue>>;
  phenoFilteredSegments: Set<string>;
  sampleFilters: Set<string>;
  sampleFilteredSegments: Set<string>;
  isolate: PhenoIsolate;
}

export interface PhenoOption {
  readonly value: string;
  readonly label: string;
  readonly phenotype: string;
}

export interface PhenoGroupOption {
  readonly label: string;
  readonly options: readonly PhenoOption[];
}

export interface SampleOption {
  readonly value: string;
  readonly label: string;
}
