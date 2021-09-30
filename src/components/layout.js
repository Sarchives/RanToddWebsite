import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import 'bootstrap/dist/css/bootstrap.min.css'
import SEO from './SEO'
import Header from "./header"

const Layout = ({ children, customSEO }) => {
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
        {!customSEO && <SEO />}
            <Header menuLinks={data.site.siteMetadata.menuLinks} siteTitle={data.site.siteMetadata.title} />
            <div className="content">{children}</div>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout