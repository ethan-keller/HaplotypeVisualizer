import { Table, Form, Button } from 'react-bootstrap';
import gfaApi from '../../api/gfa';
import Sidebar from './Sidebar';
import SidebarSection from './SidebarSection';

interface PopulationViewSidebarProps {}

const PopulationViewSidebar: React.FC<PopulationViewSidebarProps> = (props) => {
  // TODO: make lightweight graph info endpoint
  const {data: gfa} = gfaApi.useGetGfaQuery();

  return (
    <Sidebar title='Population view'>
      <SidebarSection title='Graph information'>
        <Table style={{ fontWeight: 100 }} borderless size='sm'>
          <tbody>
            <tr>
              <td>Nodes</td>
              <td>{gfa ? gfa.segments.length : '-'}</td>
            </tr>
            <tr>
              <td>Edges</td>
              <td>{gfa ? gfa.links.length : '-'}</td>
            </tr>
            <tr>
              <td>Paths</td>
              <td>{gfa ? gfa.paths.length : '-'}</td>
            </tr>
          </tbody>
        </Table>
        <Button size='sm'>More graph information</Button>
      </SidebarSection>
      <SidebarSection title='Layout options'>
        <Form.Check label='Draw paths' />
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
