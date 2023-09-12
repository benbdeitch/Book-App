import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink } from 'react-router-dom';
import UserSearch from '../forms/UserSearch';
import { useContext } from 'react';
import { UserContext } from '../contexts/UserProvider';

export default function Navbars() {
  const { username } = useContext(UserContext);


    return(
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand>BookApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to='/'>Home</Nav.Link>
            { username ? (
              <>
          
              <NavDropdown title="My Account" id="basic-nav-dropdown">
                <NavDropdown.Item as={NavLink} to={`/user-profile/${username}`}>User Profile</NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to={`/history/${username}`}>View Reading History</NavDropdown.Item>
                 <NavDropdown.Item  as={NavLink} to="/show-list" className = 'mr-3'>Show Reading List</NavDropdown.Item>
                 <NavDropdown.Divider />
                 <NavDropdown.Item as={NavLink} to="/logout" className = 'mr-3'>
                   Logout
                 </NavDropdown.Item>
               </NavDropdown>
              <NavDropdown title="Friends" id="basic-nav-dropdown">
                 <NavDropdown.Item as={NavLink} to={`/friends`}>View Friends List</NavDropdown.Item>
                 <NavDropdown.Item as={NavLink} to={'/friends/friend-requests'}>
                   Incoming Friend Requests
                 </NavDropdown.Item>

                 
               </NavDropdown>
    
               <NavDropdown title="Manage List" id="basic-nav-dropdown">
                 <NavDropdown.Item as={NavLink} to={'/recommendations'}>View Recommendations</NavDropdown.Item>
                 <NavDropdown.Item as={NavLink} to={'/book-search'}>
                   Search by Book
                 </NavDropdown.Item>
                 <NavDropdown.Item>
                 <Nav.Item>
              <Nav.Link as={NavLink} to="/sorting">
                  Reorder Reading List
                    </Nav.Link>
          </Nav.Item>
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