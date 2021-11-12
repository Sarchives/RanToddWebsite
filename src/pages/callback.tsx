import React, { useEffect } from "react"
import Layout from "../components/layout"
import '../styles/CustomStyles.css'
import Seo from '../components/seo'
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator'
import { navigate } from "gatsby-link"

export default function Index() {

  useEffect(() => {
    const params = new URLSearchParams(window.location.search.substring(1));
    if (localStorage.getItem("token"))
      fetch(process.env.GATSBY_API_URL + "/token", {
        headers: localStorage.getItem("token") ? {
          "Code": params.get("code")!
        } : {}
      })
        .then(res => res.json())
        .then(result => {
          if (result.access_token) {
            localStorage.setItem("token", result.access_token)
          }
          navigate(-2)
        })
  }, [])


  return (
    <Layout>
      <Seo title="Please wait" />
      <ProgressIndicator />
    </Layout>
  )
}