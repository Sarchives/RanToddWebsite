import React, { useEffect, useState } from "react"
import Layout from "../../components/layout"
import { PrimaryButton, DefaultButton } from '@fluentui/react/lib/Button'
import { ProgressIndicator } from '@fluentui/react/lib/ProgressIndicator'
import { Dialog, DialogType, DialogFooter } from '@fluentui/react/lib/Dialog'
import { ChoiceGroup } from '@fluentui/react/lib/ChoiceGroup'
import { useBoolean } from '@fluentui/react-hooks'
import { CircularProgressbarWithChildren } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'
import '../../styles/CustomStyles.css'
import SEO from '../../components/seo'
import { navigate } from "@reach/router"

export default function Index() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState([]);
    const [selectedKey, setSelectedKey] = useState("A");
    const [defaultSelectedKey, setDefaultSelectedKey] = useState("A");
    let page = 0;
    let scrollDone = true;


  const options = [
    { key: 'A', text: "Zeealeid's style" },
    { key: 'B', text: "Flueron's style" },
  ];

  const modelProps = {
    isBlocking: false,
    styles: { main: { maxWidth: 450 } },
  };
  const dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'Select your style',
    subText: 'Two people lead the creation of our rank cards. Here you can select one.',
  };

  const [hideDialog, { toggle: toggleHideDialog }] = useBoolean(true);

    useEffect(() => {
      fetch("https:/localhost:5001/style/" + window.location.pathname.split("/")[2], {
        headers: {
          "Code": localStorage.getItem("token")
        }})
      .then(res => res.json())
      .then(result => {
          setDefaultSelectedKey(result.fleuron ? "B" : "A");
        }
      )

  fetch("https:/localhost:5001/levels/" + window.location.pathname.split("/")[2] + "?page=" + page)
    .then(res => res.json())
    .then(result => {
        setResult(result);
        page++;
        setIsLoaded(true);
      }
    )

    window.addEventListener("scroll", () => {
        if((window.innerHeight + window.scrollY) >= document.body.offsetHeight && scrollDone) {
            scrollDone = false;
            fetch("https:/localhost:5001/levels/" + window.location.pathname.split("/")[2] + "?page=" + page)
    .then(res => res.json())
    .then(result => {
        if(result.players) {
        setResult(oldResults => {
            let newResults = Object.assign({}, oldResults);
            newResults.players = newResults.players.concat(result.players);
            return newResults;
        });
        page++;
    }
      }
    )
    scrollDone = true;
        }
    })

}, [])


if (!isLoaded) {
    return (
    <Layout>
      <SEO title="Loading" />
        <ProgressIndicator />
    </Layout>
        )
  } else {
  return (
    <Layout>
        <SEO title={result.guild.name} />
    <div className="server-banner">
        <div className="actual-content">
          <div style={{display: "flex"}}>
          {result.guild.icon ? <img alt="Server icon" className="profile" src={"https://cdn.discordapp.com/icons/" + window.location.pathname.split("/")[2] + "/" + result.guild.icon + ".png?size=64"}></img> : <div className="profile"><h3>{result.guild.name.split("")[0]}</h3></div>}
            <div style={{marginLeft: "20px"}}>
              <h4 className="leaderboard-server-name">{result.guild.name}</h4>
              <p className="paragraph" style={{maxWidth: '600px'}}>{result.guild.description ?? <i>No description</i>}</p>
            </div>
          </div>
          <div id="leaderboard-server-options">
            <button id="customize-rank-card" style={{marginRight: "10px"}} className="link" onClick={toggleHideDialog}>Customize your rank card</button>
            {result.guild.is_joinable && <PrimaryButton id="leaderboard-join-server" text="Join server" style={{marginTop: "25px"}} onClick={() => {
                fetch("https:/localhost:5001/invite/" + window.location.pathname.split("/")[2])
                .then(res => res.json())
                .then(result => {
                    navigate(result.url)
                  }
                )
            }} />}
          </div>
        </div>
    </div>
    <div className="row">
    <div className="mt-5 ms-3 col-9 players">
    {result.players?.map((player, i) => {
        const rank = i + 1;
        return (<div key={i} className="playerItem mb-3">
            <div className={"rankCircle " + (rank === 1 ? "gold" : rank === 2 ? "silver" : rank === 3 ? "bronce" : "normal")}>
                <h4>{rank}</h4>
            </div>
            <img className="avatar" src={player.avatar.split("=")[0] + "=64"} alt={player.username}></img>
            <h4 className="username">{player.username}</h4>
            <div className="right">
                <div className="boxy"> 
                    <h6>{player.messages}</h6>
                    <h6>MESSAGES</h6>
                </div>
                <div className="boxy preSpinner"> 
                    <h6>{player.totalXp}</h6>
                    <h6>EXPERIENCE</h6>
                </div>
                <div className="boxy spinner"> 
                  <CircularProgressbarWithChildren value={player.xp / player.nextXp * 100}>
                    <h6>{player.level}</h6>
                    <h6>LEVEL</h6>
                  </CircularProgressbarWithChildren>
                </div>
            </div>
            </div>)
         })}
    </div>
    <div className="mt-5 ms-3 col roles">
         <h4>Role rewards</h4>
         {result.roles.map((role, i) => <h6 key={i} className="role">Level {role.level} - {role.roleName}</h6>)}
    </div>
    </div>
    <Dialog
        hidden={hideDialog}
        onDismiss={toggleHideDialog}
        dialogContentProps={dialogContentProps}
        modalProps={modelProps}
      >
        <ChoiceGroup defaultSelectedKey={defaultSelectedKey} options={options} onChange={event => setSelectedKey(event.target.id.slice(event.target.id.length - 1))} />
        <DialogFooter>
          <PrimaryButton onClick={() => {
            fetch("https:/localhost:5001/style/" + window.location.pathname.split("/")[2], {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Code': localStorage.getItem('token')
              },
              body: JSON.stringify({ fleuron: selectedKey !== "A" })
            })
            .then(res => res.json())
            .then(result => {
                setDefaultSelectedKey(result.fleuron ? "B" : "A");
              })
            toggleHideDialog()
          }} text="Save" />
          <DefaultButton onClick={toggleHideDialog} text="Cancel" />
        </DialogFooter>
      </Dialog>
    </Layout>
  )

  }
}