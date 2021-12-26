import { Container, Nav, Navbar, NavDropdown, NavLink } from 'react-bootstrap';

interface HeaderProps {
  setShowAbout: (showAbout: boolean) => void;
  setShowSettings: (showSettings: boolean) => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    // <>
    //   <Navbar bg='light'>
    //     <Navbar.Brand>Haplotype Visualizer</Navbar.Brand>
    //     <NavLink onClick={() => props.setShowSettings(true)}>Settings</NavLink>
    //     <NavLink onClick={() => props.setShowAbout(true)}>About</NavLink>
    //   </Navbar>
    // </>
    <Navbar bg='light'>
      <Navbar.Brand>Haplotype Visualizer</Navbar.Brand>
      <Nav>
        <Nav.Link href='#home'>Home</Nav.Link>
        <Nav.Link href='#link'>Link</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
