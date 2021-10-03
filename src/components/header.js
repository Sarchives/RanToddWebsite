import React from "react"
import PropTypes from "prop-types"
import { Navbar, Container, Nav } from 'react-bootstrap';

const Header = ({ siteTitle, menuLinks }) => (
<Navbar id="navbar" bg={window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'} variant={window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'} expand="lg">
<Container>
  <Navbar.Brand href="/">{siteTitle}</Navbar.Brand>
  <Navbar.Toggle aria-controls="basic-navbar-nav" />
  <Navbar.Collapse id="basic-navbar-nav">
    <Nav className="me-auto">
    {menuLinks.map(link => (
        <Nav.Link href={link.link} key={link.name} active={window.location.pathname === link.link}>{link.name}</Nav.Link>
    ))}
    </Nav>
  </Navbar.Collapse>
</Container>
</Navbar>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header