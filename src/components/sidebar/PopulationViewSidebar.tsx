import { useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import gfaApi from '../../api/gfa';
import { useAppDispatch, useAppSelector } from '../../store';
import GraphInfoModal from '../modals/GraphInfoModal';
import Sidebar from './Sidebar';
import SidebarSection from './SidebarSection';
import { updateDrawPaths } from '../../slices/graphSettings';
import RangeSegmentThickness from '../range/RangeSegmentThickness';
import RangeLinkThickness from '../range/RangeLinkThickness';

interface PopulationViewSidebarProps {}

const PopulationViewSidebar: React.FC<PopulationViewSidebarProps> = (props) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
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

        {showInfo ? <GraphInfoModal onHide={() => setShowInfo(false)} /> : false}
        <Button onClick={() => setShowInfo(true)} size='sm'>
          More graph information
        </Button>
      </SidebarSection>
      <SidebarSection title='Layout options'>
        <Button size='sm'>Edit layout</Button>
      </SidebarSection>
      <SidebarSection title='Styling options'>
        <Form.Check
          type='switch'
          label='Draw paths'
          checked={graphSettings.drawPaths}
          onChange={(e) => dispatch(updateDrawPaths(e.target.checked))}
        />

        <RangeSegmentThickness />
        <RangeLinkThickness />
      </SidebarSection>
    </Sidebar>
  );
};

export default PopulationViewSidebar;
