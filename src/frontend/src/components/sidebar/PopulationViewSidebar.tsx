import { useState } from 'react';
import { Button } from 'react-bootstrap';
import SidebarSection from './sidebar_section/SidebarSection';
import EditPathsModal from '../modals/EditPathsModal';
import GraphInfoSidebarSection from './sidebar_section/GraphInfoSidebarSection';
import Sidebar from './Sidebar';
import RangeSegmentThicknessWithLabel from '../range/with_label/RangeSegmentThicknessWithLabel';
import RangeLinkThicknessWithLabel from '../range/with_label/RangeLinkThicknessWithLabel';
import DrawPathsCheck from '../check/DrawPathsCheck';
import DrawLabelsCheck from '../check/DrawLabelsCheck';

interface PopulationViewSidebarProps {}

const PopulationViewSidebar: React.FC<PopulationViewSidebarProps> = (props) => {
  const [showEditColors, setShowEditColors] = useState<boolean>(false);

  return (
    <Sidebar title='Population view'>
      <GraphInfoSidebarSection />

      <SidebarSection title='Styling options'>
        <DrawPathsCheck />
        <DrawLabelsCheck />
        <RangeSegmentThicknessWithLabel title='Segment thickness' />
        <RangeLinkThicknessWithLabel title='Link thickness' />
        <Button onClick={() => setShowEditColors(true)} size='sm'>
          Edit paths
        </Button>
        <EditPathsModal show={showEditColors} onHide={() => setShowEditColors(false)} />
      </SidebarSection>
    </Sidebar>
  );
};

export default PopulationViewSidebar;
