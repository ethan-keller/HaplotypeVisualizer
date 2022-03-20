import { useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
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
        <Table style={{ fontWeight: 100 }} borderless size='sm'>
          <tbody>
            <tr>
              <td>Nodes</td>
              <td>{gfaInfo ? gfaInfo.n_segments : '-'}</td>
            </tr>
            <tr>
              <td>Edges</td>
              <td>{gfaInfo ? gfaInfo.n_links : '-'}</td>
            </tr>
            <tr>
              <td>Paths</td>
              <td>{gfaInfo ? gfaInfo.n_paths : '-'}</td>
            </tr>
          </tbody>
        </Table>
        <Button onClick={() => setShowInfo(true)} size='sm'>
          More graph information
        </Button>
        {showInfo ? <GraphInfoModal onHide={() => setShowInfo(false)} /> : false}
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
        {showEditColors ? <EditPathsModal onHide={() => setShowEditColors(false)} /> : false}
      </SidebarSection>

      <SidebarSection title='Layout options'>
        <Button onClick={() => setShowEditLayout(true)} size='sm'>
          Edit layout
        </Button>
        {showEditLayout ? <EditLayoutModal onHide={() => setShowEditLayout(false)} /> : false}
      </SidebarSection>
    </Sidebar>
  );
};

export default PopulationViewSidebar;
