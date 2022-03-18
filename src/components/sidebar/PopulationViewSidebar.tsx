import { useState } from 'react';
import { Table, Form, Button } from 'react-bootstrap';
import gfaApi from '../../api/gfa';
import { useAppSelector } from '../../store';
import GraphInfoModal from '../modals/GraphInfoModal';
import Sidebar from './Sidebar';
import SidebarSection from './SidebarSection';

interface PopulationViewSidebarProps {}

const PopulationViewSidebar: React.FC<PopulationViewSidebarProps> = (props) => {
  const [showInfo, setShowInfo] = useState<boolean>(false);
  const { data: gfaInfo } = gfaApi.useGetGraphInfoQuery();
  const graphSettings = useAppSelector((state) => state.graphSettings);

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
        <Button onClick={() => setShowInfo(true)} size='sm'>More graph information</Button>
      </SidebarSection>
      <SidebarSection title='Layout options'>
        <Button size='sm'>Edit layout</Button>
      </SidebarSection>
      <SidebarSection title='Styling options'>
        <Form.Check label='Draw paths' checked={graphSettings.drawPaths} />
        <>
          <Form.Label>Link thickness</Form.Label>
          <Form.Range />
        </>
        <>
          <Form.Label>Segment thickness</Form.Label>
          <Form.Range />
        </>
      </SidebarSection>
    </Sidebar>
  );
};

export default PopulationViewSidebar;
