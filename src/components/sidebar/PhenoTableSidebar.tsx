import phenoApi from '../../api/pheno';
import { addSampleFilter, addPhenoFilter } from '../../slices/pheno';
import { useAppDispatch } from '../../store';
import Sidebar from './Sidebar';
import SidebarSection from './SidebarSection';
import Select from 'react-select';
import SpinnerAnnotated from '../SpinnerAnnotated';
import VerticalSpacer from '../VerticalSpacer';
import { Form } from 'react-bootstrap';
import { PhenoRecord } from '../../types/pheno';
import StatTable from '../StatTable';

interface PhenoTableSidebarProps {}

const PhenoTableSidebar: React.FC<PhenoTableSidebarProps> = (props) => {
  const { data: phenotypes } = phenoApi.useGetPhenotypesQuery();
  const { data: samples } = phenoApi.useGetSampleNamesQuery();
  const dispatch = useAppDispatch();

  return (
    <Sidebar title='Phenotype table'>
      <SidebarSection title='Table stats'>
        <StatTable
          tableEntries={{
            samples: samples ? samples.length.toString() : '-',
            phenotypes: phenotypes ? Object.keys(phenotypes).length.toString() : '-',
          }}
        />
      </SidebarSection>
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
    </Sidebar>
  );
};

interface PhenoOption {
  readonly value: string;
  readonly label: string;
  readonly phenotype: string;
}

interface PhenoGroupOption {
  readonly label: string;
  readonly options: readonly PhenoOption[];
}

interface SampleOption {
  readonly value: string;
  readonly label: string;
}

export default PhenoTableSidebar;
