import { FormGroup } from 'react-bootstrap';

interface SidebarSectionProps {
  title: string;
}

const SidebarSection: React.FC<SidebarSectionProps> = (props) => {
  return (
    <>
      <FormGroup style={{ marginBottom: 20 }}>
        <h6>{props.title}</h6>
        {props.children}
      </FormGroup>
    </>
  );
};

export default SidebarSection;
