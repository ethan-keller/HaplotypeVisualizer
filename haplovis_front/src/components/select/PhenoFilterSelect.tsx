import { addPhenoFilter } from '../../slices/pheno';
import { PhenoOption, PhenoRecord, PhenosPerSample, Phenotype } from '../../types/pheno';
import Select from 'react-select';
import { useAppDispatch } from '../../store';
import phenoApi from '../../api/pheno';
import gfaApi from '../../api/gfa';
import { GfaPath } from '../../types/gfa';
import { useMemo } from 'react';

interface PhenoFilterSelectProps {}

const PhenoFilterSelect: React.FC<PhenoFilterSelectProps> = (props) => {
  const dispatch = useAppDispatch();
  const { data: phenotypes } = phenoApi.useGetPhenotypesQuery();
  const { data: phenosPerSample } = phenoApi.useGetPhenosPerSampleQuery();
  const { data: paths } = gfaApi.useGetPathsQuery();
  const options = useMemo(
    () =>
      phenotypes
        ? Object.entries(phenotypes).map(([phenoFeature, phenotypes]) => ({
            label: phenoFeature,
            options: phenotypes.map((phenotype) => ({
              value: phenotype,
              label: phenotype.toString(),
              phenoFeature: phenoFeature,
            })),
          }))
        : undefined,
    [phenotypes],
  );
  return phenotypes && phenosPerSample && paths ? (
    <Select<PhenoOption, true, { label: string; options: PhenoOption[] }>
      isSearchable
      isClearable
      isMulti
      closeMenuOnSelect={false}
      onChange={(values) => {
        const phenoFilters = values.map((v) => {
          let r: PhenoRecord = {};
          r[v.phenoFeature] = v.value;
          return r;
        });
        const phenos = transformPhenoFilters(phenoFilters);
        dispatch(
          addPhenoFilter({
            phenos: phenos,
            segments: getFilteredSegments(phenosPerSample, paths, phenos),
          }),
        );
      }}
      options={options}
    />
  ) : (
    <Select isDisabled />
  );
};

const transformPhenoFilters = (phenotypes: PhenoRecord[]) => {
  const result: Record<string, Set<Phenotype>> = {};
  phenotypes.forEach((phenoR) => {
    if (Object.keys(phenoR).length !== 1) return;
    const record = Object.entries(phenoR)[0];
    if (!(record[0] in result)) {
      result[record[0]] = new Set<Phenotype>();
    }
    result[record[0]].add(record[1]);
  });
  return result;
};

export const getFilteredSegments = (
  phenosPerSample: PhenosPerSample,
  paths: Record<string, GfaPath>,
  phenos: Record<string, Set<Phenotype>>,
) => {
  let result: string[] = [];
  for (const [sample, phenoRecord] of Object.entries(phenosPerSample)) {
    for (const [phenoFeature, phenotype] of Object.entries(phenoRecord)) {
      if (phenoFeature in phenos && phenos[phenoFeature].has(phenotype)) {
        result = result.concat(paths[sample].segment_names);
        break;
      }
    }
  }
  return result;
};

export default PhenoFilterSelect;
