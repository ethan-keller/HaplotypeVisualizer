import { useState } from 'react';
import { Table, Form, Button, FloatingLabel } from 'react-bootstrap';
import gfaApi from '../../api/gfa';
import GraphInfoModal from '../modals/GraphInfoModal';
import Sidebar from './Sidebar';
import SidebarSection from './SidebarSection';

interface PhenoGraphSidebarProps {}

const PhenoGraphSidebar: React.FC<PhenoGraphSidebarProps> = (props) => {
  const { data: gfaInfo } = gfaApi.useGetGraphInfoQuery();
  const [showInfo, setShowInfo] = useState<boolean>(false);

  return (
    <Sidebar title='Phenotype Graph'>
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

      <SidebarSection title='Phenotype options'>
        <FloatingLabel label='Select phenotypes'>
          {/* Add multiple select options */}
          <Form.Select size='sm'>
            <option value='1'>Blue</option>
            <option value='2'>Yellow</option>
            <option value='3'>Red</option>
          </Form.Select>
        </FloatingLabel>
      </SidebarSection>
      <SidebarSection title='Exclude options'>
        <FloatingLabel label='Exclude samples'>
          {/* Add multiple select options */}
          <Form.Select size='sm'>
            <option value='1'>G23</option>
            <option value='2'>GIO4</option>
            <option value='3'>KD</option>
          </Form.Select>
        </FloatingLabel>
      </SidebarSection>
    </Sidebar>
  );
};

export default PhenoGraphSidebar;
