import { FormGroup } from 'react-bootstrap';

interface SidebarSectionProps {
  title: string;
}

const SidebarSection: React.FC<SidebarSectionProps> = (props) => {
  return (
    <>
      <FormGroup>
        <h6>{props.title}</h6>
        {props.children}
      </FormGroup>
      <br />
    </>
  );
};

export default SidebarSection;
