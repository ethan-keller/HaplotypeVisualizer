import { Form } from 'react-bootstrap';

interface SidebarProps {
  title: string;
  description?: string;
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  return (
    <div className='sidebar'>
      <h5 style={{ marginBottom: 20 }}>{props.title}</h5>
      <Form>
        <Form.Text>{props.description}</Form.Text>
        {props.children}
      </Form>
    </div>
  );
};

export default Sidebar;
