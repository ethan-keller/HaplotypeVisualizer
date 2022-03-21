import { useState } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { url as urlPhenoGraphView } from '../views/PhenoGraphView';
import { url as urlWelcomeView } from '../views/WelcomeView';
import { url as urlPhenoTableView } from '../views/PhenoTableView';
import { url as urlPopulationView } from '../views/PopulationView';
import AboutModal from './modals/AboutModal';
import BookmarksOffcanvas from './bookmarks/BookmarksOffcanvas';

interface HeaderProps {}

const Header: React.FC<HeaderProps> = (props) => {
  const [showAbout, setShowAbout] = useState(false);
  const [showBookmarks, setShowBookmarks] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <Navbar bg='light'>
        <Navbar.Brand href={urlPopulationView}>Haplotype Visualizer</Navbar.Brand>
        <Nav>
          <Nav.Link href={urlWelcomeView}>Imports</Nav.Link>
          <Nav.Link active={pathname === urlPopulationView} href={urlPopulationView}>
            PopuView
          </Nav.Link>
          <Nav.Link active={pathname === urlPhenoGraphView} href={urlPhenoGraphView}>
            PhenoGraph
          </Nav.Link>
          <Nav.Link active={pathname === urlPhenoTableView} href={urlPhenoTableView}>
            PhenoTable
          </Nav.Link>
          <Nav.Link onClick={() => setShowBookmarks(true)}>Bookmarks</Nav.Link>
          <BookmarksOffcanvas show={showBookmarks} onHide={() => setShowBookmarks(false)} />
          <Nav.Link onClick={() => setShowAbout(true)}>About</Nav.Link>
          <AboutModal show={showAbout} onHide={() => setShowAbout(false)} />
        </Nav>
      </Navbar>
    </>
  );
};

export default Header;
