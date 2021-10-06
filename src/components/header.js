import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button'
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog'
import { useBoolean } from '@fluentui/react-hooks'
import { navigate } from 'gatsby-link'

const Header = ({ siteTitle, menuLinks }) => {
  const [loggedInUser, setLoggedInUser] = useState(undefined)

  const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  }
  const dialogContentProps = {
    type: DialogType.normal,
    title: 'Sign out?',
    subText: 'Signing out will disable some features until you sign in again.',
  }

  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true)

  useEffect(() => {
  if(localStorage.getItem('token')) {
  fetch('https://discord.com/api/v9/users/@me', {
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    }
  })
            .then(res => res.json())
            .then(result => {
                setLoggedInUser(result)
              }
            )
            }

          }, [])

return (<Navbar id="navbar" bg={window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'} variant={window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'} expand="lg">
<Container>
  <Navbar.Brand href="/">{siteTitle}</Navbar.Brand>
  <Navbar.Toggle aria-controls="navbar" />
  <Navbar.Collapse id="navbar">
    <Nav>
    {menuLinks.map(link => (
        <Nav.Link href={link.link} key={link.name} active={window.location.pathname === link.link}>{link.name}</Nav.Link>
    ))}
    <button className="ms-auto antiButton" onClick={() => {
      if(!loggedInUser) {
        navigate("https://discord.com/api/oauth2/authorize?client_id=889281672988749855&redirect_uri=" + encodeURIComponent(window.location.origin + "/") + "callback&response_type=code&scope=guilds%20identify")
      } else {
        toggleHideDialog()
      }
    }}>
      <img src={loggedInUser ? ("https://cdn.discordapp.com/avatars/" + loggedInUser.id + "/" + loggedInUser.avatar + ".png?size=1024") : "https://cdn.discordapp.com/embed/avatars/1.png"} alt="" className="avatarMenu"></img>
    </button>
    </Nav>
  </Navbar.Collapse>
</Container>
<Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
      >
        <DialogFooter>
          <PrimaryButton onClick={() => {
            localStorage.removeItem("token")
            window.location.reload()
          }} text="Sign out" />
          <DefaultButton onClick={toggleHideDialog} text="Cancel" />
        </DialogFooter>
      </Dialog>
</Navbar>)
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: '',
}

export default Header