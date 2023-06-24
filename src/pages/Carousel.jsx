'use client'

import { useState } from 'react'
import styled from 'styled-components'

export default function Carousel() {
  const [shape, setShape] = useState('cube')

  const cubeAnimationStyle = 'spin 15s infinite linear'
  const ringAnimationStyle = 'spin 20s infinite linear'
  const stylePropsConfig = {
    mobile: {
      cube: 'translateZ(75px)',
      cube35911: 'translateZ(60px)',
      ring: 'translateZ(275px)',
      height: '150px',
      width: '120px',
      top: '-6rem',
      bottom: '11rem',
    },
    tablet: {
      cube: 'translateZ(75px)',
      ring: 'translateZ(275px)',
      height: '150px',
      width: '120px',
      top: '-7rem',
      bottom: '12rem',
    },
    desktop: {
      cube: 'translateZ(100px)',
      cube35911: 'translateZ(80px)',
      ring: 'translateZ(350px)',
      height: '200px',
      width: '160px',
      top: '-3em',
      bottom: '16rem',
    },
  }

  const getInitialStylePropsConfig = () => {
    if (window.screen.width < 768) return stylePropsConfig.mobile
    else if (window.screen.width < 1024) return stylePropsConfig.tablet
    else return stylePropsConfig.desktop
  }

  const initialStylePropsConfig = getInitialStylePropsConfig()

  const [styleProps, setStyleProps] = useState({
    ...initialStylePropsConfig,
  })
  const [animation, setAnimation] = useState(cubeAnimationStyle)

  const toggleShape = () => {
    if (shape === 'cube') {
      setAnimation(ringAnimationStyle)
      setShape('ring')
    } else {
      setAnimation(ringAnimationStyle)
      setShape('cube')
    }
  }

  setTimeout(toggleShape, 15000)

  const mqlTablet = window.matchMedia('(min-width: 768px)')
  const mqlDesktop = window.matchMedia('(min-width: 1024px)')

  mqlTablet.onchange = (e) => {
    if (e.matches) {
      setStyleProps({
        ...stylePropsConfig.tablet,
      })
    } else {
      setStyleProps({
        ...stylePropsConfig.mobile,
      })
    }
  }

  mqlDesktop.onchange = (e) => {
    if (e.matches) {
      setStyleProps({
        ...stylePropsConfig.desktop,
      })
    }
  }

  const imgClasses = [
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
  ]

  const planes = imgClasses.map((name, i) => (
    <Plane
      styleProps={styleProps}
      key={`${name + '-' + i}`}
      className={`plane ${name}`}
    >
      <NftImage styleProps={styleProps} src={`/nfts/${i + 1}.png`} />
    </Plane>
  ))

  return (
    <Container styleProps={styleProps}>
      <Stage styleProps={styleProps}>
        <Shape
          styleProps={styleProps}
          animation={animation}
          className={`${shape} backfaces`}
        >
          {planes}
        </Shape>
      </Stage>
    </Container>
  )
}

const Container = styled.div`
  width: 100%;
  height: 100%;
  margin-top: ${(props) => props.styleProps.top};
  margin-bottom: ${(props) => props.styleProps.bottom};
  -webkit-perspective: 800; /* For compatibility with iPhone 3.0, we leave off the units here */
  -webkit-perspective-origin: 50% 225px;
`

const Stage = styled.div`
  width: 100%;
  height: 100%;
  -webkit-transition: -webkit-transform 4s;
  -webkit-transform-style: preserve-3d;
  .cube > .one {
    opacity: 1;
    -webkit-transform: scale3d(1.2, 1.2, 1.2) rotateX(90deg)
      ${(props) => props.styleProps.cube};
    transform: scale3d(1.2, 1.2, 1.2) rotateX(90deg)
      ${(props) => props.styleProps.cube};
  }
  .cube > .two {
    opacity: 1;
    -webkit-transform: scale3d(1.2, 1.2, 1.2)
      ${(props) => props.styleProps.cube};
    transform: scale3d(1.2, 1.2, 1.2) ${(props) => props.styleProps.cube};
  }

  .cube > .three {
    opacity: 1;
    -webkit-transform: scale3d(1.2, 1.2, 1.2) rotateY(90deg)
      ${(props) => props.styleProps.cube35911};
    transform: scale3d(1.2, 1.2, 1.2) rotateY(90deg)
      ${(props) => props.styleProps.cube35911};
  }

  .cube > .four {
    opacity: 1;
    -webkit-transform: scale3d(1.2, 1.2, 1.2) rotateY(180deg)
      ${(props) => props.styleProps.cube};
    transform: scale3d(1.2, 1.2, 1.2) rotateY(180deg)
      ${(props) => props.styleProps.cube};
  }

  .cube > .five {
    opacity: 1;
    -webkit-transform: scale3d(1.2, 1.2, 1.2) rotateY(-90deg)
      ${(props) => props.styleProps.cube35911};
    transform: scale3d(1.2, 1.2, 1.2) rotateY(-90deg)
      ${(props) => props.styleProps.cube35911};
  }

  .cube > .six {
    opacity: 1;
    -webkit-transform: scale3d(1.2, 1.2, 1.2) rotateX(-90deg)
      ${(props) => props.styleProps.cube} rotate(180deg);
    transform: scale3d(1.2, 1.2, 1.2) rotateX(-90deg)
      ${(props) => props.styleProps.cube} rotate(180deg);
  }

  .cube > .seven {
    -webkit-transform: scale3d(0.8, 0.8, 0.8) rotateX(90deg)
      ${(props) => props.styleProps.cube} rotate(180deg);
    transform: scale3d(0.8, 0.8, 0.8) rotateX(90deg)
      ${(props) => props.styleProps.cube} rotate(180deg);
  }

  .cube > .eight {
    -webkit-transform: scale3d(0.8, 0.8, 0.8)
      ${(props) => props.styleProps.cube};
    transform: scale3d(0.8, 0.8, 0.8) ${(props) => props.styleProps.cube};
  }

  .cube > .nine {
    -webkit-transform: scale3d(0.8, 0.8, 0.8) rotateY(90deg)
      ${(props) => props.styleProps.cube35911};
    transform: scale3d(0.8, 0.8, 0.8) rotateY(90deg)
      ${(props) => props.styleProps.cube35911};
  }

  .cube > .ten {
    -webkit-transform: scale3d(0.8, 0.8, 0.8) rotateY(180deg)
      ${(props) => props.styleProps.cube};
    transform: scale3d(0.8, 0.8, 0.8) rotateY(180deg)
      ${(props) => props.styleProps.cube};
  }

  .cube > .eleven {
    -webkit-transform: scale3d(0.8, 0.8, 0.8) rotateY(-90deg)
      ${(props) => props.styleProps.cube35911};
    transform: scale3d(0.8, 0.8, 0.8) rotateY(-90deg)
      ${(props) => props.styleProps.cube35911};
  }

  .cube > .twelve {
    -webkit-transform: scale3d(0.8, 0.8, 0.8) rotateX(-90deg)
      ${(props) => props.styleProps.cube};
    transform: scale3d(0.8, 0.8, 0.8) rotateX(-90deg)
      ${(props) => props.styleProps.cube};
  }

  /* ---------- ring styles ------------- */
  .ring > .one {
    -webkit-transform: ${(props) => props.styleProps.ring};
    transform: ${(props) => props.styleProps.ring};
  }

  .ring > .two {
    -webkit-transform: rotateY(30deg) ${(props) => props.styleProps.ring};
    transform: rotateY(30deg) ${(props) => props.styleProps.ring};
  }

  .ring > .three {
    -webkit-transform: rotateY(60deg) ${(props) => props.styleProps.ring};
    transform: rotateY(60deg) ${(props) => props.styleProps.ring};
  }

  .ring > .four {
    -webkit-transform: rotateY(90deg) ${(props) => props.styleProps.ring};
    transform: rotateY(90deg) ${(props) => props.styleProps.ring};
  }

  .ring > .five {
    -webkit-transform: rotateY(120deg) ${(props) => props.styleProps.ring};
    transform: rotateY(120deg) ${(props) => props.styleProps.ring};
  }

  .ring > .six {
    -webkit-transform: rotateY(150deg) ${(props) => props.styleProps.ring};
    transform: rotateY(150deg) ${(props) => props.styleProps.ring};
  }

  .ring > .seven {
    -webkit-transform: rotateY(180deg) ${(props) => props.styleProps.ring};
    transform: rotateY(180deg) ${(props) => props.styleProps.ring};
  }

  .ring > .eight {
    -webkit-transform: rotateY(210deg) ${(props) => props.styleProps.ring};
    transform: rotateY(210deg) ${(props) => props.styleProps.ring};
  }

  .ring > .nine {
    -webkit-transform: rotateY(-120deg) ${(props) => props.styleProps.ring};
    transform: rotateY(-120deg) ${(props) => props.styleProps.ring};
  }

  .ring > .ten {
    -webkit-transform: rotateY(-90deg) ${(props) => props.styleProps.ring};
    transform: rotateY(-90deg) ${(props) => props.styleProps.ring};
  }

  .ring > .eleven {
    -webkit-transform: rotateY(300deg) ${(props) => props.styleProps.ring};
    transform: rotateY(300deg) ${(props) => props.styleProps.ring};
  }

  .ring > .twelve {
    -webkit-transform: rotateY(330deg) ${(props) => props.styleProps.ring};
    transform: rotateY(330deg) ${(props) => props.styleProps.ring};
  }
`

const Shape = styled.div`
  position: relative;
  top: 160px;
  margin: 0 auto;
  height: ${(props) => props.styleProps.height};
  width: ${(props) => props.styleProps.width};
  box-shadow: none;
  -webkit-transform-style: preserve-3d;
  -webkit-animation: spin 24s infinite linear;
  animation: spin 24s infinite linear;
`

const Plane = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${(props) => props.styleProps.height};
  width: ${(props) => props.styleProps.width};
  border: 1px solid #303030;
  -webkit-border-radius: 12px;
  -webkit-box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.6);
  -webkit-transition: -webkit-transform 5s, opacity 2s;
`

const NftImage = styled.img`
  height: ${(props) => props.styleProps.width};
`
