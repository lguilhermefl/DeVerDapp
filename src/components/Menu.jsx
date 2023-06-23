'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'

export default function Menu() {
  const [muted, setMuted] = useState(false)
  const toggleMuted = () => setMuted(!muted)

  return (
    <Header>
      <Logo src="./new_logo.png" />
      <Nav>
        <audio muted={muted} autoPlay={true} loop className="mysong">
          <source
            src="https://dl.sndup.net/jkv6/Always-Pass-It-On.ogg"
            type="audio/ogg"
          />
          <source
            src="https://dl.sndup.net/nfsb/Always-Pass-It-On.mp3"
            type="audio/mpeg"
          />
        </audio>
        <ImageIcon
          onClick={toggleMuted}
          alt="mute/sound"
          src={muted ? './mute.png' : './sound.png'}
        />

        <SocialAnchor
          href="https://opensea.io/collection/radialartcollection"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImageIcon alt="Opensea" src="./opensea.png" />
        </SocialAnchor>

        <SocialAnchor
          href="https://etherscan.io/address/0x37e0de5361b42c85a4c4bcd44b0325abbab37e66#writeContract"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImageIcon alt="Etherscan" src="./etherscan.png" />
        </SocialAnchor>

        <SocialAnchor
          href="https://twitter.com/VincentDeVerNFT"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImageIcon alt="Twitter" src="./twitter.png" />
        </SocialAnchor>
      </Nav>
    </Header>
  )
}

const Header = styled.div`
  background-color: white;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2rem;
  width: 100%;
`

const Logo = styled.img`
  display: flex;
  height: 60px;
`

const Nav = styled.div`
  display: flex;
  color: black;
  gap: 20px;
  font-weight: 600;
  font-size: 1.2rem;
`

const ImageIcon = styled.img`
  width: 32px;
  height: 32px;
  cursor: pointer;
`

const SocialAnchor = styled.a`
  :hover {
    opacity: 0.7;
  }
`
