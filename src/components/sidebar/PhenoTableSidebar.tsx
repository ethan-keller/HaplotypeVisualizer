import { Table, Form, Button, FloatingLabel } from 'react-bootstrap';
import Sidebar from './Sidebar';
import SidebarSection from './SidebarSection';

interface PhenoTableSidebarProps {}

const PhenoTableSidebar: React.FC<PhenoTableSidebarProps> = (props) => {
  return (
    <Sidebar title='Phenotype table'>
      <SidebarSection title='Phenotypes'>
        <FloatingLabel label='Select phenotypes'>
          {/* Add multiple select options */}
          <Form.Select size='sm'>
            <option value='1'>Blue</option>
            <option value='2'>Yellow</option>
            <option value='3'>Red</option>
          </Form.Select>
        </FloatingLabel>
      </SidebarSection>

      <SidebarSection title='Samples'>
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

export default PhenoTableSidebar;
