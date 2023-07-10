'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { CONFIG } from '../config'

export default function Menu() {
  const [playing, setPlaying] = useState(false)

  const toggle = () => {
    const audio = document.getElementsByClassName('song')[0]
    setPlaying(!playing)
    if (playing) return audio.pause()
    return audio.play()
  }

  useEffect(() => {
    const audio = document.getElementsByClassName('song')[0]
    const body = document.body
    const handleEvent = () => {
      audio.play()
      setPlaying(true)
      body.removeEventListener('click', handleEvent, false)
    }
    
    body.addEventListener('click', handleEvent, false)
  }, [])

  return (
    <>
      <Header>
        <Logo src="./new_logo.png" />
        <Nav>
          <audio loop className="song">
            <source
              src="https://dl.sndup.net/jkv6/Always-Pass-It-On.ogg"
              type="audio/ogg"
            />
            <source
              src="https://dl.sndup.net/nfsb/Always-Pass-It-On.mp3"
              type="audio/mpeg"
            />
          </audio>
          <AudioButton onClick={toggle}>
            {playing ? (
              <img alt="pause" src="./pause.png" />
            ) : (
              <img alt="play" src="./play.png" />
            )}
          </AudioButton>

          <SocialAnchor
            href={CONFIG.MARKETPLACE_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ImageIcon alt="Opensea" src="./opensea.png" />
          </SocialAnchor>

          <SocialAnchor
            href={CONFIG.SCAN_LINK}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ImageIcon alt="Etherscan" src="./etherscan.png" />
          </SocialAnchor>

          <SocialAnchor
            href={CONFIG.TWITTER_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <ImageIcon alt="Twitter" src="./twitter.png" />
          </SocialAnchor>
        </Nav>
      </Header>
      <NavMobile>
        <AudioButton onClick={toggle}>
          {playing ? (
            <img alt="pause" src="./pause-w.png" />
          ) : (
            <img alt="play" src="./play-w.png" />
          )}
        </AudioButton>

        <SocialAnchor
          href="https://opensea.io/collection/radialartcollection"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImageIcon alt="Opensea" src="./opensea-w.png" />
        </SocialAnchor>

        <SocialAnchor
          href="https://etherscan.io/address/0x37e0de5361b42c85a4c4bcd44b0325abbab37e66#writeContract"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImageIcon alt="Etherscan" src="./etherscan-w.png" />
        </SocialAnchor>

        <SocialAnchor
          href="https://twitter.com/VincentDeVerNFT"
          target="_blank"
          rel="noopener noreferrer"
        >
          <ImageIcon alt="Twitter" src="./twitter-w.png" />
        </SocialAnchor>
      </NavMobile>
    </>
  )
}

const Header = styled.div`
  background-color: white;
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;
  width: 100%;
  @media (min-width: 500px) {
    justify-content: space-between;
  }
`

const Logo = styled.img`
  display: flex;
  height: 60px;
`

const Nav = styled.div`
  display: none;
  color: black;
  gap: 20px;
  font-weight: 600;
  font-size: 1.2rem;
  @media (min-width: 500px) {
    display: flex;
  }
`
const NavMobile = styled.div`
  display: flex;
  height: 40px;
  gap: 1.5rem;
  width: 100%;
  margin-top: 2rem;
  justify-content: center;
  align-items: center;
  padding: 0 2rem;

  @media (min-width: 500px) {
    display: none;
  }
`
const AudioButton = styled.div`
  width: fit-content;
  margin: none;
  cursor: pointer;
  :hover {
    opacity: 0.7;
  }
  img {
    width: 32px;
    height: 32px;
  }
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
