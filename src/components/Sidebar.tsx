import { Button, FormGroup, FormText } from 'react-bootstrap';
import Gfa from '../models/gfa';
import { GraphSettings } from './graph/Graph';

interface SidebarProps {
  gfa?: Gfa;
  setSettings: (settings: GraphSettings) => void
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <h5>Test</h5>
      <FormGroup>
        <FormText>segments: {props.gfa ? props.gfa.segments.length : '-'}</FormText>
        <br />
        <FormText>links: {props.gfa ? props.gfa.links.length : '-'}</FormText>
        <br />
        <FormText>paths: {props.gfa ? props.gfa.paths.length : '-'}</FormText>
      </FormGroup>

      <br />

      <Button>More info</Button>
      <br />

      <h5>Drawing</h5>
      <br />

      <h5>Display</h5>
    </div>
  );
};

export default Sidebar;
