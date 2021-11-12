import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { useStaticQuery, graphql } from 'gatsby'

export class SEOData {
  title: string | null = null
}

const SEO = ( data: SEOData ) => {
  const { site } = useStaticQuery(query)

  const {
    defaultTitle,
    titleTemplate,
  } = site.siteMetadata

  const seo = {
    title: data.title || defaultTitle,
  }

  return (
    <Helmet title={seo.title} titleTemplate={titleTemplate} bodyAttributes={{
      class: 'bg-custom text-body'
    }}>
      <meta charSet="UTF-8" />
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