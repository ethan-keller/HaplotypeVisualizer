// TODO: change any to all possible value types
export type PhenoValue = any;
export type PhenoRecord = Record<string, PhenoValue>;
export type PhenotypeValues = Record<string, PhenoValue[]>;
export type PhenosPerSample = Record<string, PhenoRecord>;

export interface PhenoState {
  phenoFilters: Record<string, PhenoValue[]>;
  sampleFilters: string[];
}
