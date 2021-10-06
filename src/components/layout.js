import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import 'bootstrap/dist/css/bootstrap.min.css'
import Header from "./header"

const Layout = ({ children}) => {
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
            <Header menuLinks={data.site.siteMetadata.menuLinks} siteTitle={data.site.siteMetadata.title} />
            <div className="container-fluid">{children}</div>
            {window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
              if(e.matches) {
              document.body.classList = "bg-dark text-light";
              document.getElementById("navbar").classList = "navbar navbar-expand-lg navbar-dark bg-dark";
              } else {
                document.body.classList = "";
                document.getElementById("navbar").classList = "navbar navbar-expand-lg navbar-light bg-light";
              }
            })}
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout