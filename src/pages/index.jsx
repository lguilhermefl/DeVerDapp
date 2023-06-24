'use client'

import Carousel from './Carousel'
import Menu from '../components/Menu'
import Mint from '../components/Mint'

import localFont from 'next/font/local'
import styled from 'styled-components'

const hashira = localFont({
  src: [
    {
      path: './fonts/HashiraMt-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
})

export default function HomePage() {
  return (
    <>
      <Menu />
      <Main>
        <Wrapper>
          <Slogan className={hashira.className}>
            The Vincent de Ver NFT Collection Redefines Artistic Experiences
            Through Abstract Fusion
          </Slogan>
        </Wrapper>

        <CarouselContainer>
          <Carousel />
        </CarouselContainer>
        <Mint />
      </Main>
    </>
  )
}

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0rem 1.4rem 0rem;
  padding-bottom: 2rem;
  min-height: 100vh;
  @media (min-width: 768px) {
    padding-bottom: 6rem;
  }
`

const Wrapper = styled.div`
  margin-top: 0.5rem;
  max-width: 740px;
  text-align: center;
`

const Slogan = styled.h2`
  font-weight: 400;
  font-size: 1.3rem;
  line-height: 1.8rem;
  margin-top: 0.7rem;
  @media (min-width: 500px) {
    margin-top: 2.5rem;
    font-size: 1.5rem;
  }
  @media (min-width: 768px) {
    margin-top: 3.5rem;
    font-size: 2rem;
    line-height: 2.5rem;
  }
`
const CarouselContainer = styled.div`
  max-width: 90%;
  margin-left: 1.4rem;
  margin-right: 1.4rem;
`
