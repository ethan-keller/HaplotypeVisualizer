import { useMemo } from 'react';
import phenoApi from '../../api/pheno';
import Select, { SingleValue } from 'react-select';
import { PhenoFeature } from '../../types/pheno';

interface PhenoFeatureIsolateSelectProps {
  value: SingleValue<{ label: string; value: PhenoFeature }>;
  onChange: (newPhenoFeature: SingleValue<{ label: string; value: PhenoFeature }>) => void;
}

const PhenoFeatureIsolateSelect: React.FC<PhenoFeatureIsolateSelectProps> = (props) => {
  const { data: phenotypes } = phenoApi.useGetPhenotypesQuery();
  const options = useMemo(
    () =>
      phenotypes
        ? Object.keys(phenotypes).map((phenotype) => ({ label: phenotype, value: phenotype }))
        : undefined,
    [phenotypes],
  );

  return (
    <Select<{ label: string; value: PhenoFeature }, false>
      isSearchable
      isClearable
      closeMenuOnSelect
      value={props.value}
      isDisabled={!options}
      options={options}
      onChange={(newPheno) => {
        props.onChange(newPheno);
      }}
    />
  );
};

export default PhenoFeatureIsolateSelect;
