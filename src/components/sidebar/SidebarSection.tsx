import { FormGroup } from 'react-bootstrap';

interface SidebarSectionProps {
  title: string;
}

const SidebarSection: React.FC<SidebarSectionProps> = (props) => {
  return (
    <>
      <FormGroup>
        <h5>{props.title}</h5>
        {props.children}
      </FormGroup>
      <br />
    </>
  );
};

export default SidebarSection;
