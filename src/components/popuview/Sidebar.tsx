import { Button, FormGroup, FormText } from "react-bootstrap";

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = (props) => {
  return (
    <div
      style={{
        width: '100%',
      }}
    >
      <h5>Test</h5>
      <FormGroup>
        <FormText>Nodes: xxx</FormText>
        <br/>
        <FormText>Edges: xxx</FormText>
        <br/>
        <FormText>Paths: xxx</FormText>
        <br/>
        <FormText>Total length: xxx</FormText>
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
