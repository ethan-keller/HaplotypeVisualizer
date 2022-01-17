import { Table, Form, Button } from 'react-bootstrap';
import Sidebar from './sidebar/Sidebar';
import SidebarSection from './sidebar/SidebarSection';

interface PopulationViewSidebarProps {}

const PopulationViewSidebar: React.FC<PopulationViewSidebarProps> = (props) => {
  return (
    <Sidebar>
      <SidebarSection title='Graph information'>
        <Table style={{fontWeight: 100}} borderless size='sm'>
          <tbody>
            <tr>
              <td>Nodes</td>
              <td>1233</td>
            </tr>
            <tr>
              <td>Edges</td>
              <td>44555</td>
            </tr>
            <tr>
              <td>Paths</td>
              <td>3</td>
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
