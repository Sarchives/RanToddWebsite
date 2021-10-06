import React from "react"
import Layout from "../components/layout"
import '../styles/CustomStyles.css'
import Seo from '../components/seo'

export default function Index() {
  return (
    <Layout>
      <Seo title="Error" />
      <div className="text-center my-4 padding-container">
        <h2>We are sorry, the page you requested cannot be found.</h2>
        <p>The URL may be misspelled or the page you're looking for is no longer available.</p>
      </div>
    </Layout>
  )
}