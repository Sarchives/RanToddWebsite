/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: 'Ranker',
    menuLinks: [
      {
         name: 'Home',
         link:'/'
      },
      {
         name: 'About',
         link: '/about'
      }
    ]
  },
  plugins: [`gatsby-plugin-react-helmet`],
}
