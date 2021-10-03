/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  siteMetadata: {
    title: 'Ranker',
    titleTemplate: "%s - Ranker",
    menuLinks: [
      {
         name: 'Home',
         link: '/'
      },
      {
        name: 'Leaderboard',
        link: '/leaderboard'
      },
      {
         name: 'About',
         link: '/about'
      }
    ]
  },
  plugins: [`gatsby-plugin-react-helmet`],
}
