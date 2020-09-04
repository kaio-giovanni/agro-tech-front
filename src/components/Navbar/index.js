import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import './style.css';

const NavbarMenu = (props) => {
    return (
        <Navbar expand="lg" sticky="top">
            <Navbar.Brand href="#home"> Agro Tech</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default NavbarMenu;