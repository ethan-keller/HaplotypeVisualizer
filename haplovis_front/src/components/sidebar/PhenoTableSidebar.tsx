import Sidebar from './Sidebar';
import PhenoFilterSidebarSection from './sidebar_section/PhenoFilterSidebarSection';
import PhenoStatsSidebarSection from './sidebar_section/PhenoStatsSidebarSection';

interface PhenoTableSidebarProps {}

const PhenoTableSidebar: React.FC<PhenoTableSidebarProps> = (props) => {
  return (
    <Sidebar title='Phenotype table'>
      <PhenoStatsSidebarSection />
      <PhenoFilterSidebarSection />
    </Sidebar>
  );
};

export default PhenoTableSidebar;
