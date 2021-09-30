import React from "react"
import { Helmet } from "react-helmet"
import Layout from "../../components/layout"
import { PrimaryButton } from '@fluentui/react/lib/Button'
import '../../styles/CustomStyles.css'

export default function Index() {
  return (
    <Layout>
        <Helmet>
                <title>Lol - {}</title>
            </Helmet>
    <div className="server-banner">
        <div className="actual-content">
          <div style={{display: "flex"}}>
            <img alt="Server icon" className="profile" src="favicon.ico"></img>
            <div style={{marginLeft: "20px"}}>
              <h4 className="leaderboard-server-name">Server name</h4>
              <p className="paragraph" style={{maxWidth: '600px'}}>Description</p>
            </div>
          </div>
          <div id="leaderboard-server-options">
            <button id="customize-rank-card" style={{marginRight: "10px"}} className="link">Customize your rank card</button>
            <PrimaryButton id="leaderboard-join-server" text="Join server" style={{marginTop: "25px"}} />
          </div>
        </div>
    </div>
    </Layout>
  )
}