import {Navbar, NavDropdown, NavLink} from "react-bootstrap"

interface HeaderProps {
    onData: (data: string) => void
    setShowAbout: (showAbout: boolean) => void
    setShowOpenFile: (showOpenFile: boolean) => void
}

const Header: React.FC<HeaderProps> = (props) => {
    return (
        <>
            <Navbar bg="light">
                <Navbar.Brand href=".">Haplotype Visualizer</Navbar.Brand>
                <NavDropdown title="File">
                    <NavDropdown.Item onClick={() => props.setShowOpenFile(true)}>Open file</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Examples">
                    <NavDropdown.Item onClick={() => props.onData("MT.gfa")}>MT GFA-spec example</NavDropdown.Item>
                </NavDropdown>
                <NavLink onClick={() => props.setShowAbout(true)}>About</NavLink>
            </Navbar>
        </>
    )
}

export default Header