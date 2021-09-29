import React from "react"
import { Helmet } from "react-helmet"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Container from 'react-bootstrap/Container';
import 'bootstrap/dist/css/bootstrap.min.css'

import Header from "./header"

const Layout = ({ children }) => {
    const data = useStaticQuery(graphql`
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

    return (
        <>
        <Helmet bodyAttributes={{
            class: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'bg-dark text-light' : ''
        }}>
            <meta charSet="utf-8" />
                <title>{data.site.siteMetadata.menuLinks.filter(x => window.location.pathname === x.link)[0].name} - {data.site.siteMetadata.title}</title>
            </Helmet>
            <Header menuLinks={data.site.siteMetadata.menuLinks} siteTitle={data.site.siteMetadata.title} />
            <Container>{children}</Container>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout