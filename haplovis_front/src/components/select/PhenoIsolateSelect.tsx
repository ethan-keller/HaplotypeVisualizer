import { useMemo } from 'react';
import phenoApi from '../../api/pheno';
import { PhenoOption } from '../../types/pheno';
import Select, { SingleValue } from 'react-select';

interface PhenoIsolateSelectProps {
  value?: SingleValue<PhenoOption>;
  onChange: (newPheno: SingleValue<PhenoOption>) => void;
}

const PhenoIsolateSelect: React.FC<PhenoIsolateSelectProps> = (props) => {
  const { data: phenotypes } = phenoApi.useGetPhenotypesQuery();
  const options = useMemo(
    () =>
      phenotypes
        ? Object.entries(phenotypes).map((p) => ({
            label: p[0],
            options: p[1].map((o) => ({ value: o, label: o, phenotype: p[0] })),
          }))
        : undefined,
    [phenotypes],
  );
  return (
    <Select<PhenoOption, false, { label: string; options: PhenoOption[] }>
      isSearchable
      isClearable
      closeMenuOnSelect
      value={props.value}
      options={options}
      onChange={(newPheno) => {
        props.onChange(newPheno);
      }}
    />
  );
};

export default PhenoIsolateSelect;
