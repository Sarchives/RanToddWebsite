import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

const SEO = ({ title }) => {
  const { site } = useStaticQuery(query)

  const {
    defaultTitle,
    titleTemplate,
  } = site.siteMetadata

  const seo = {
    title: title || defaultTitle,
  }

  return (
    <Helmet title={seo.title} titleTemplate={titleTemplate} bodyAttributes={{
      class: 'bg-custom text-body'
    }}>
      <meta charset="UTF-8" />
    </Helmet>
  )
}

export default SEO

SEO.propTypes = {
  title: PropTypes.string,
}

SEO.defaultProps = {
  title: null,
}

const query = graphql`
  query SEO {
    site {
      siteMetadata {
        defaultTitle: title
        titleTemplate
      }
    }
  }
`