import React from "react"
import Layout from "../components/layout"
import { Stack } from '@fluentui/react'
import { DefaultButton, PrimaryButton } from '@fluentui/react/lib/Button'
import { navigate } from "@reach/router"

export default function Index() {
  return (
    <Layout>
    <div className="text-center my-4">
      <h2>Rank your Discord server members with Ranker!</h2>
      <p>Ranker is a ranking Discord bot, it offers a list of members, ordered by XP called leaderboard, it also offers a command to show the rank of a specific user and a system to add roles.</p>
      <PrimaryButton text="Add to Discord" onClick={() => navigate('https://discord.com/api/oauth2/authorize?client_id=889281672988749855&permissions=378225675264&scope=bot%20applications.commands')} className="me-1" />
      <DefaultButton text="GitHub" onClick={() => navigate('https://github.com/Ranker-Team/Ranker')} />
    </div>
    </Layout>
  )
}