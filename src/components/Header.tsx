import { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { url as urlPhenoGraphView } from '../views/PhenoGraphView';
import { url as urlPopulationView } from '../views/PopulationView';
import AboutModal from './modals/AboutModal';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = (props) => {
  // state: about modal
  const [showAbout, setShowAbout] = useState(false);
  // state: settings modal
  // const [showSettings, setShowSettings] = useState(false);

  return (
    <>
      <Navbar bg='light'>
        <Navbar.Brand href={urlPopulationView}>Haplotype Visualizer</Navbar.Brand>
        <Nav>
          {/* <Nav.Link href='#pheno'>Pheno</Nav.Link>
        <Nav.Link href='#trio'>Trio</Nav.Link> */}
          <Nav.Link href='#settings'>Settings</Nav.Link>
          <Nav.Link href='#about'>About</Nav.Link>
          <Nav.Link href={urlPhenoGraphView}>PhenoGraph</Nav.Link>
        </Nav>
      </Navbar>
      {showAbout && <AboutModal onHide={() => setShowAbout(false)} />}
    </>
  );
};

export default Header;
