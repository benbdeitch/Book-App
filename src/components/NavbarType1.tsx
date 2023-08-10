import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import UserSearch from './UserSearch';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserProvider';

export default function Navbars() {
  const { user } = useContext(UserContext);


    return(
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>BookApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to='/'>Home</Nav.Link>
            { user.username ? (
              <>
              <Nav.Item >
                <Nav.Link as={NavLink} to="/logout" className = 'mr-3'>
                   Logout
                </Nav.Link>
              </Nav.Item>
               <Nav.Link  as={NavLink} to={`/user-profile/${user.username}`}>User Profile</Nav.Link>
               <NavDropdown title="Manage List" id="basic-nav-dropdown">
                 <NavDropdown.Item href="#action/3.1">View Recommendations</NavDropdown.Item>
                 <NavDropdown.Item href="#action/3.2">
                   Search by Book 
                 </NavDropdown.Item>
                 <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                 <NavDropdown.Divider />
                 <NavDropdown.Item href="#action/3.4">
                   Separated link
                 </NavDropdown.Item>
               </NavDropdown>
               <UserSearch />
               </>
      ) : (
        <>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/login">
              Login
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={NavLink} to="/register">
              Register
            </Nav.Link>
          </Nav.Item>
        </>
      )}
           
          </Nav>
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
    )
}