import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import logo_small_white from '../img/logo_small_white.png';
import "../Navbar.css";

const NavBar = () => {
    return(
       <Container>
         <Navbar bg="transparent" variant="dark" className="nav-main">
            <Container>
              <Navbar.Brand href="#home">
                <img src={logo_small_white} className="logo-nav"/>
              </Navbar.Brand>
              <Nav className="me-auto">
                <Nav.Link href="#home">Centrum</Nav.Link>
                <Nav.Link href="#features">Rynki</Nav.Link>
                <Nav.Link href="#pricing">Portfele</Nav.Link>
              </Nav>
            </Container>
          </Navbar>

       </Container>

    );
}
export {NavBar};