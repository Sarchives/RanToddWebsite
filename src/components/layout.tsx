import React, { useEffect, useState, ReactNode } from 'react'
import { useMediaPredicate } from 'react-media-hook'
import { useStaticQuery, graphql } from 'gatsby'
import { Navbar, Container, Nav } from 'react-bootstrap'
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button'
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog'
import { useBoolean } from '@fluentui/react-hooks'
import { navigate } from 'gatsby-link'
import 'bootstrap/dist/css/bootstrap.min.css'
import { User } from '../User'

interface LayoutData {
  children: ReactNode;
}

// 2
interface HeaderData {
  site: {
    siteMetadata: {
      title: string;
      menuLinks: [{
        name: string;
        link: string;
      }]
    },
  };
}

const Layout: React.FunctionComponent<LayoutData> = (layout: LayoutData) => {
  const data: HeaderData = useStaticQuery(graphql`
     query SiteTitleQuery {
       site {
         siteMetadata {
           title
           menuLinks {
            name
            link
           }
         }
       }
     }
   `)

  const [loggedInUser, setLoggedInUser] = useState(new User())

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
    if (localStorage.getItem('token')) {
      fetch('https://discord.com/api/v9/users/@me', {
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      })
        .then(res => res.json())
        .then(result => {
          setLoggedInUser(result)
        })
    }
  }, [])

  return (
    <>
      <Navbar id="navbar" bg="custom" variant={useMediaPredicate("(prefers-color-scheme: dark") ? "light" : "dark"} expand="lg">
        <Container>
          <Navbar.Brand href="/">{data.site.siteMetadata.title}</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar" />
          <Navbar.Collapse id="navbar">
            <Nav>
              {data.site.siteMetadata.menuLinks.map(menuLink => (
                <Nav.Link href={menuLink.link} key={menuLink.name} active={window.location.pathname === menuLink.link}>{menuLink.name}</Nav.Link>
              ))}
              <button className="ms-auto antiButton" onClick={() => {
                if (!loggedInUser) {
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
      </Navbar>
      <div className="container-fluid">{layout.children}</div>
    </>
  )
}

export default Layout