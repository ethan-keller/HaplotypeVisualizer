// TODO: change any to all possible value types
export type PhenoValue = any;
export type PhenoRecord = Record<string, PhenoValue>;
export type PhenotypeValues = Record<string, PhenoValue[]>;
export type PhenosPerSample = Record<string, PhenoRecord>;

export interface PhenoState {
  phenoFilters: Record<string, PhenoValue[]>;
  sampleFilters: string[];
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
