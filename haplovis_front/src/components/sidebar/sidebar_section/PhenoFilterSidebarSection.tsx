import { Form } from 'react-bootstrap';
import Select from 'react-select';
import gfaApi from '../../../api/gfa';
import phenoApi from '../../../api/pheno';
import { addPhenoFilter, addSampleFilter } from '../../../slices/pheno';
import { useAppDispatch } from '../../../store';
import { GfaPath } from '../../../types/gfa';
import {
  PhenoOption,
  PhenoRecord,
  PhenosPerSample,
  PhenoValue,
  SampleOption,
} from '../../../types/pheno';
import VerticalSpacer from '../../VerticalSpacer';
import SidebarSection from './SidebarSection';

interface PhenoFilterSidebarSectionProps {}

const PhenoFilterSidebarSection: React.FC<PhenoFilterSidebarSectionProps> = (props) => {
  const dispatch = useAppDispatch();
  const { data: phenotypes } = phenoApi.useGetPhenotypesQuery();
  const { data: phenosPerSample } = phenoApi.useGetPhenosPerSampleQuery();
  const { data: paths } = gfaApi.useGetPathsQuery();

  return (
    <SidebarSection title='Filters'>
      <Form.Label style={{ fontSize: 14 }}>Phenotypes</Form.Label>
      {phenotypes && phenosPerSample && paths ? (
        <Select<PhenoOption, true, { label: string; options: PhenoOption[] }>
          isSearchable
          isClearable
          isMulti
          closeMenuOnSelect={false}
          onChange={(values) => {
            const phenoFilters = values.map((v) => {
              let r: PhenoRecord = {};
              r[v.phenotype] = v.value;
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
          options={Object.entries(phenotypes).map((p) => ({
            label: p[0],
            options: p[1].map((o) => ({ value: o, label: o, phenotype: p[0] })),
          }))}
        />
      ) : (
        <Select isDisabled />
      )}

      <VerticalSpacer space={10} />

      <Form.Label style={{ fontSize: 14 }}>Samples</Form.Label>
      {paths ? (
        <Select<SampleOption, true>
          isSearchable
          isClearable
          isMulti
          closeMenuOnSelect={false}
          closeMenuOnScroll
          onChange={(values) =>
            dispatch(
              addSampleFilter({
                samples: values.map((v) => v.value),
                segments: values.flatMap((v) => paths[v.value].segment_names),
              }),
            )
          }
          options={Object.keys(paths).map((path) => ({ value: path, label: path }))}
        />
      ) : (
        <Select isDisabled />
      )}
    </SidebarSection>
  );
};

const transformPhenoFilters = (phenotypes: PhenoRecord[]) => {
  const result: Record<string, Set<PhenoValue>> = {};
  phenotypes.forEach((phenoR) => {
    if (Object.keys(phenoR).length !== 1) return;
    const record = Object.entries(phenoR)[0];
    if (!(record[0] in result)) {
      result[record[0]] = new Set<PhenoValue>();
    }
    result[record[0]].add(record[1]);
  });
  return result;
};

const getFilteredSegments = (
  phenosPerSample: PhenosPerSample,
  paths: Record<string, GfaPath>,
  phenos: Record<string, Set<PhenoValue>>,
) => {
  let result: string[] = [];
  Object.entries(phenosPerSample).forEach(([sample, phenotypes]) => {
    Object.entries(phenotypes).forEach(([phenotype, phenoValue]) => {
      if (phenotype in phenos && phenos[phenotype].has(phenoValue)) {
        result = result.concat(paths[sample].segment_names);
      }
    });
  });
  return result;
};

export default PhenoFilterSidebarSection;
