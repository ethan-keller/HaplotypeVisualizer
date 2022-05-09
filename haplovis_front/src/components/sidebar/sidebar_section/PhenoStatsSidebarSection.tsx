import phenoApi from '../../../api/pheno';
import StatTable from '../../StatTable';
import SidebarSection from './SidebarSection';

interface PhenoStatsSidebarSectionProps {}

const PhenoStatsSidebarSection: React.FC<PhenoStatsSidebarSectionProps> = (props) => {
  const { data: phenotypes } = phenoApi.useGetPhenotypesQuery();
  const { data: samples } = phenoApi.useGetSampleNamesQuery();
  return (
    <SidebarSection title='Phenotype information'>
      <StatTable
        tableEntries={{
          samples: samples ? samples.length.toString() : '-',
          phenotypes: phenotypes ? Object.keys(phenotypes).length.toString() : '-',
        }}
      />
    </SidebarSection>
  );
};

export default PhenoStatsSidebarSection;
