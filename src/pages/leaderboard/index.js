import React, { useEffect, useState } from "react"
import Layout from "../../components/layout"
import Seo from '../../components/seo'
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator'

export default function Index() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [result, setResult] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      fetch(process.env.GATSBY_API_URL + "/commons", {
        headers: {
          "Code": localStorage.getItem("token")
        }
      })
        .then(res => res.json())
        .then(result => {
          setResult(result)
          setIsLoaded(true)
        }
        )
    } else {
      setIsLoaded(true)
    }
  }, []);

  if (!isLoaded) {
    return (
      <Layout>
        <Seo title="Leaderboards" />
        <ProgressIndicator />
      </Layout>
    )
  } else if (localStorage.getItem("token")) {
    return (
      <Layout>
        <Seo title="Leaderboards" />
        <div className="text-center my-4 padding-container">
          {result.map(guild => (<a href={"/leaderboard/" + guild.id} key={guild.id} className="leaderboardLink">{guild.icon ? <img src={"https://cdn.discordapp.com/icons/" + guild.id + "/" + guild.icon + ".png?size=64"} alt={guild.name} className="profile"></img> : <div className="profile"><h3>{guild.name.split("")[0]}</h3></div>}<h4>{guild.name}</h4></a>))}
        </div>
      </Layout>
    )
  } else {
    return (<Layout>
      <Seo title="Leaderboards" />
      <div className="text-center my-4 padding-container">
        <h2>You have to sign in to see this page.</h2>
      </div>
    </Layout>
    )
  }
}