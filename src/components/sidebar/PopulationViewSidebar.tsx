import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import gfaApi from '../../api/gfa';
import { useAppDispatch, useAppSelector } from '../../store';
import GraphInfoModal from '../modals/GraphInfoModal';
import Sidebar from './Sidebar';
import SidebarSection from './SidebarSection';
import { updateDrawLabels, updateDrawPaths } from '../../slices/graphSettings';
import RangeSegmentThickness from '../range/RangeSegmentThickness';
import RangeLinkThickness from '../range/RangeLinkThickness';
import EditLayoutModal from '../modals/EditLayoutModal';
import EditPathsModal from '../modals/EditPathsModal';
import StatTable from '../StatTable';

interface PopulationViewSidebarProps {}

const PopulationViewSidebar: React.FC<PopulationViewSidebarProps> = (props) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const [showEditLayout, setShowEditLayout] = useState<boolean>(false);
  const [showEditColors, setShowEditColors] = useState<boolean>(false);

  const { data: gfaInfo } = gfaApi.useGetGraphInfoQuery();
  const graphSettings = useAppSelector((state) => state.graphSettings);
  const dispatch = useAppDispatch();

  return (
    <Sidebar title='Population view'>
      <SidebarSection title='Graph information'>
        <StatTable
          tableEntries={{
            nodes: gfaInfo ? gfaInfo.n_segments.toString() : '-',
            edges: gfaInfo ? gfaInfo.n_links.toString() : '-',
            paths: gfaInfo ? gfaInfo.n_paths.toString() : '-',
          }}
        />
        <Button onClick={() => setShowInfo(true)} size='sm'>
          More graph information
        </Button>
        <GraphInfoModal show={showInfo} onHide={() => setShowInfo(false)} />
      </SidebarSection>

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
        <RangeSegmentThickness />
        <RangeLinkThickness />
        <Button onClick={() => setShowEditColors(true)} size='sm'>
          Edit paths
        </Button>
        <EditPathsModal show={showEditColors} onHide={() => setShowEditColors(false)} />
      </SidebarSection>

      <SidebarSection title='Layout options'>
        <Button onClick={() => setShowEditLayout(true)} size='sm'>
          Edit layout
        </Button>
        <EditLayoutModal show={showEditLayout} onHide={() => setShowEditLayout(false)} />
      </SidebarSection>
    </Sidebar>
  );
};

export default PopulationViewSidebar;
