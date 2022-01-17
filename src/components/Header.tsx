import { Nav, Navbar } from 'react-bootstrap';
import { url as urlPhenoGraphView } from '../views/PhenoGraphView'

interface HeaderProps {
  setShowAbout: (showAbout: boolean) => void;
  setShowSettings: (showSettings: boolean) => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  return (
    <Navbar bg='light'>
      <Navbar.Brand>Haplotype Visualizer</Navbar.Brand>
      <Nav>
        {/* <Nav.Link href='#pheno'>Pheno</Nav.Link>
        <Nav.Link href='#trio'>Trio</Nav.Link> */}
        <Nav.Link href='#settings'>Settings</Nav.Link>
        <Nav.Link href='#about'>About</Nav.Link>
        <Nav.Link href={urlPhenoGraphView}>PhenoGraph</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default Header;
