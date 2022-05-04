import { useState } from 'react';
import { Button } from 'react-bootstrap';
import EditPhenotypesModal from '../modals/EditPhenotypesModal';
import Sidebar from './Sidebar';
import GraphInfoSidebarSection from './sidebar_section/GraphInfoSidebarSection';
import PhenoFilterSidebarSection from './sidebar_section/PhenoFilterSidebarSection';
import PhenoStatsSidebarSection from './sidebar_section/PhenoStatsSidebarSection';
import SidebarSection from './sidebar_section/SidebarSection';

interface PhenoGraphSidebarProps {}

const PhenoGraphSidebar: React.FC<PhenoGraphSidebarProps> = (props) => {
  const [showEditPhenotypes, setShowEditPhenotypes] = useState<boolean>(false);

  return (
    <Sidebar title='Phenotype Graph'>
      <GraphInfoSidebarSection />
      <PhenoStatsSidebarSection />
      <PhenoFilterSidebarSection />
      <SidebarSection title=''>
        <Button size='sm' onClick={() => setShowEditPhenotypes(true)}>
          Edit phenotypes
        </Button>
        <EditPhenotypesModal
          show={showEditPhenotypes}
          onHide={() => setShowEditPhenotypes(false)}
        />
      </SidebarSection>
    </Sidebar>
  );
};

export default PhenoGraphSidebar;
