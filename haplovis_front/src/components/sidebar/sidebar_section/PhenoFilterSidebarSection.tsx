import { Form } from 'react-bootstrap';
import Select from 'react-select';
import { addPhenoFilter, addSampleFilter } from '../../../slices/pheno';
import { useAppDispatch } from '../../../store';
import { PhenoOption, PhenoRecord, PhenotypeValues, SampleOption } from '../../../types/pheno';
import SpinnerAnnotated from '../../SpinnerAnnotated';
import VerticalSpacer from '../../VerticalSpacer';
import SidebarSection from './SidebarSection';

interface PhenoFilterSidebarSectionProps {
  samples?: string[];
  phenotypes?: PhenotypeValues;
}

const PhenoFilterSidebarSection: React.FC<PhenoFilterSidebarSectionProps> = ({
  samples,
  phenotypes,
}) => {
  const dispatch = useAppDispatch();

  return (
    <SidebarSection title='Filters'>
      <Form.Label style={{ fontSize: 14 }}>Phenotypes</Form.Label>
      {phenotypes ? (
        <Select<PhenoOption, true, { label: string; options: PhenoOption[] }>
          isSearchable
          isClearable
          isMulti
          closeMenuOnSelect={false}
          onChange={(values) => {
            const phenoFilters = values.map((v) => {
              let r = {} as PhenoRecord;
              r[v.phenotype] = v.value;
              return r;
            });
            dispatch(addPhenoFilter(phenoFilters));
          }}
          options={Object.entries(phenotypes).map((p) => ({
            label: p[0],
            options: p[1].map((o) => ({ value: o, label: o, phenotype: p[0] })),
          }))}
        />
      ) : (
        <SpinnerAnnotated message={'Loading phenotype filter'} />
      )}

      <VerticalSpacer space={10} />

      <Form.Label style={{ fontSize: 14 }}>Samples</Form.Label>
      {samples ? (
        <Select<SampleOption, true>
          isSearchable
          isClearable
          isMulti
          closeMenuOnSelect={false}
          closeMenuOnScroll
          onChange={(values) => dispatch(addSampleFilter(values.map((o) => o.value)))}
          options={samples.map((sample) => ({ value: sample, label: sample }))}
        />
      ) : (
        <SpinnerAnnotated message={'Loading sample filter'} />
      )}
    </SidebarSection>
  );
};

export default PhenoFilterSidebarSection;
