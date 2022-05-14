export type Phenotype = string | number;
export type PhenoFeature = string;
export type PhenoRecord = Record<PhenoFeature, Phenotype>;
export type Phenotypes = Record<string, Phenotype[]>;
export type PhenosPerSample = Record<string, PhenoRecord>;

export interface PhenoIsolate {
  isolateColors: Record<string, string[]>;
  phenoFeature: PhenoFeature;
}

export interface PhenoState {
  phenoFilters: Record<string, Set<Phenotype>>;
  phenoFilteredSegments: Set<string>;
  sampleFilters: Set<string>;
  sampleFilteredSegments: Set<string>;
  isolate?: PhenoIsolate;
}

export interface PhenoOption {
  readonly value: Phenotype;
  readonly label: string;
  readonly phenoFeature: PhenoFeature;
}

export interface PhenoGroupOption {
  readonly label: string;
  readonly options: readonly PhenoOption[];
}

export interface SampleOption {
  readonly value: string;
  readonly label: string;
}
