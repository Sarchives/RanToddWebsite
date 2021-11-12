import React from "react"
import Layout from "../components/layout"
import Seo from '../components/seo'

export default function Index() {
  return (
    <Layout>
      <Seo title="About" />
      <div className="my-4">
        <h2 className="text-center">Who are we?</h2>
        <div className="padding-container">
          <h3><a href="https://github.com/SapphireDisD">Sapphire</a></h3>
          <p>RanTodd's author.</p>
          <h3><a href="https://github.com/dongle-the-gadget">Dongle</a></h3>
          <p>RanTodd's main dev.</p>
          <h3><a href="https://github.com/Ahmed605">Ahmed Walid</a></h3>
          <p>RanTodd's main rank card main developer.</p>
          <h3><a href="https://github.com/zeealeid">Zeealeid</a></h3>
          <p>RanTodd's main rank card main designer.</p>
          <h3><a href="https://github.com/KojiOdyssey">Koji</a>, <a href="https://github.com/dAKirby309">Kirby</a>, <a href="https://github.com/itsWindows11">SimpleBear</a></h3>
          <p>RanTodd's main rank card design collaborators.</p>
          <h3><a href="https://discord.com/users/188482204601548800">Fleuron</a></h3>
          <p>RanTodd's second rank card designer.</p>
          <h3><a href="https://github.com/Erisa">Erisa</a></h3>
          <p>Initial Docker support.</p>
        </div>
      </div>
    </Layout>
  )
}