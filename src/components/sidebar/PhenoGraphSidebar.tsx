import { Table, Form, Button, FloatingLabel } from 'react-bootstrap';
import Sidebar from './Sidebar';
import SidebarSection from './SidebarSection';

interface PhenoGraphSidebarProps {}

const PhenoGraphSidebar: React.FC<PhenoGraphSidebarProps> = (props) => {
  return (
    <Sidebar>
      <SidebarSection title='Graph information'>
        <Table style={{ fontWeight: 100 }} borderless size='sm'>
          <tbody>
            <tr>
              <td>Nodes</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Edges</td>
              <td>-</td>
            </tr>
            <tr>
              <td>Paths</td>
              <td>-</td>
            </tr>
          </tbody>
        </Table>
        <Button size='sm'>More graph information</Button>
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
      <SidebarSection title='Exlcude options'>
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
