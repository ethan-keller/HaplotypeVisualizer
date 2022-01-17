import { Form } from 'react-bootstrap';

interface SidebarProps {}

const Sidebar: React.FC<SidebarProps> = (props) => {
  return (
    <div className='sidebar'>
      <Form>{props.children}</Form>
    </div>
  );
};

export default Sidebar;
