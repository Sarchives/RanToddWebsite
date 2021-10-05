import React, { useEffect } from "react"
import Layout from "../components/layout"
import '../styles/CustomStyles.css'
import SEO from '../components/seo'
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator'
import { navigate } from "gatsby-link"

export default function Index() {
    useEffect(() => {
        const params = new URLSearchParams(window.location.search.substring(1));
        fetch("https:/localhost:5001/token", {
            headers: {
              "Code": params.get("code")
            }})
          .then(res => res.json())
          .then(result => {
              if(result.access_token) {
              localStorage.setItem("token", result.access_token)
              }
              navigate(-2)
            }
          )
      
      }, [])


  return (
    <Layout>
      <SEO title="Please wait" />
      <ProgressIndicator />
    </Layout>
  )
}