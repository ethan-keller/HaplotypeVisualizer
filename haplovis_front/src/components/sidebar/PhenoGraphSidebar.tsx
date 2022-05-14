import Sidebar from './Sidebar';
import GraphInfoSidebarSection from './sidebar_section/GraphInfoSidebarSection';
import PhenoFilterSidebarSection from './sidebar_section/PhenoFilterSidebarSection';
import PhenoIsolationSidebarSection from './sidebar_section/PhenoIsolationSidebarSection';
import PhenoStatsSidebarSection from './sidebar_section/PhenoStatsSidebarSection';

interface PhenoGraphSidebarProps {}

const PhenoGraphSidebar: React.FC<PhenoGraphSidebarProps> = (props) => {
  return (
    <Sidebar title='Phenotype Graph'>
      <GraphInfoSidebarSection />
      <PhenoStatsSidebarSection />
      <PhenoFilterSidebarSection />
      <PhenoIsolationSidebarSection />
    </Sidebar>
  );
};

export default PhenoGraphSidebar;
