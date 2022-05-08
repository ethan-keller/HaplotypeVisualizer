import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../../store';
import SidebarSection from './sidebar_section/SidebarSection';
import { updateDrawLabels, updateDrawPaths } from '../../slices/graphSettings';
import EditPathsModal from '../modals/EditPathsModal';
import GraphInfoSidebarSection from './sidebar_section/GraphInfoSidebarSection';
import Sidebar from './Sidebar';
import RangeSegmentThicknessWithLabel from '../range/with_label/RangeSegmentThicknessWithLabel';
import RangeLinkThicknessWithLabel from '../range/with_label/RangeLinkThicknessWithLabel';

interface PopulationViewSidebarProps {}

const PopulationViewSidebar: React.FC<PopulationViewSidebarProps> = (props) => {
  const [showEditColors, setShowEditColors] = useState<boolean>(false);

  const graphSettings = useAppSelector((state) => state.graphSettings);
  const dispatch = useAppDispatch();

  return (
    <Sidebar title='Population view'>
      <GraphInfoSidebarSection />

      <SidebarSection title='Styling options'>
        <Form.Check
          type='switch'
          label='Draw paths'
          checked={graphSettings.drawPaths}
          onChange={(e) => dispatch(updateDrawPaths(e.target.checked))}
        />
        <Form.Check
          type='switch'
          label='Draw labels'
          checked={graphSettings.drawLabels}
          onChange={(e) => dispatch(updateDrawLabels(e.target.checked))}
        />
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
