import React from "react"
import Layout from "../components/layout"
import { DefaultButton } from '@fluentui/react/lib/Button'
import { navigate } from "@reach/router"
import '../styles/CustomStyles.css'
import Seo from '../components/seo'

export default function Index() {
  return (
    <Layout>
      <Seo title="Home" />
      <div className="text-center my-4 padding-container">
        <h2>Rank your Discord server members with Ranker!</h2>
        <p>Ranker is a ranking Discord bot, it offers a list of members, ordered by XP called leaderboard, it also offers a command to show the rank of a specific user and a system to add roles.</p>
        <DefaultButton text="GitHub" onClick={() => navigate('https://github.com/Ranker-Team/Ranker')} />
      </div>
    </Layout>
  )
}