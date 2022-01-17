import { Table, Form, Button } from 'react-bootstrap';
import Sidebar from './Sidebar';
import SidebarSection from './SidebarSection';

interface PopulationViewSidebarProps {}

const PopulationViewSidebar: React.FC<PopulationViewSidebarProps> = (props) => {
  return (
    <Sidebar>
      <SidebarSection title='Graph information'>
        <Table style={{fontWeight: 100}} borderless size='sm'>
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
      <SidebarSection title='Layout options'>
        <Form.Text>More</Form.Text>
      </SidebarSection>
    </Sidebar>
  );
};

export default PopulationViewSidebar;
