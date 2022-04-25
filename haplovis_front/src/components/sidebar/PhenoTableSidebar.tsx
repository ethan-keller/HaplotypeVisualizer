import phenoApi from '../../api/pheno';
import Sidebar from './Sidebar';
import SidebarSection from './sidebar_section/SidebarSection';
import StatTable from '../StatTable';
import PhenoFilterSidebarSection from './sidebar_section/PhenoFilterSidebarSection';

interface PhenoTableSidebarProps {}

const PhenoTableSidebar: React.FC<PhenoTableSidebarProps> = (props) => {
  const { data: phenotypes } = phenoApi.useGetPhenotypesQuery();
  const { data: samples } = phenoApi.useGetSampleNamesQuery();
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
      <PhenoFilterSidebarSection samples={samples} phenotypes={phenotypes} />
    </Sidebar>
  );
};

export default PhenoTableSidebar;
