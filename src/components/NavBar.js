import React, {useContext} from 'react';
import {Link, useLocation } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo_small_white from '../img/logo_small_white.png';
import "../Navbar.css";
import AuthContext from '../context/AuthContext'

const NavBar = () => {

  let {user, logoutUser} = useContext(AuthContext);
  const location = useLocation();
  console.log(location);

    return(
       <Container>
         <Navbar bg="transparent" variant="dark" className="nav-main">
            <Container>
              <Navbar.Brand href="#home">
                <img src={logo_small_white} className="logo-nav"/>
              </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="/" className={location.pathname === '/' ? 'active' : ''}>Centrum</Nav.Link>
                <Nav.Link href="/stocks" className={location.pathname === '/stocks' ? 'active' : ''}>Rynki</Nav.Link>
                <Nav.Link href="/wallets" className={location.pathname === '/wallets' ? 'active' : ''}>Portfele</Nav.Link>
              </Nav>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
                
            </Nav>
            <Nav className="justify-content-end">
            {(user) && (user.username != '') ? (
                <Dropdown>
                <Dropdown.Toggle className="loginBtn">
                  Witaj, {user.username}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item href={`/galeria/${user.id}`}>Galeria</Dropdown.Item>
                  <Dropdown.Item href="/profile">Profil</Dropdown.Item>
                  <Dropdown.Item href="/logout">Wyloguj</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
                <Link className="nav-link loginBtn" to="/login">
                    Login
                </Link>
            )}
            </Nav>
            </Navbar.Collapse>
            </Container>
          </Navbar>
       </Container>

    );
}
export {NavBar};