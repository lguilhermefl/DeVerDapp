'use client'

import styled from 'styled-components'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { Web3Button } from '@web3modal/react'
import { useState } from 'react'

import { ABI } from '../config'

import localFont from 'next/font/local'

const hashira = localFont({
  src: [
    {
      path: '../pages/fonts/HashiraMt-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
  ],
})

const CONFIG = {
  COLLECTION_NAME: 'Vincent de ver',
  SCAN_LINK:
    'https://etherscan.io/address/0x37e0de5361b42c85a4c4bcd44b0325abbab37e66#code',
  CONTRACT_ADDRESS: '0x8f6677b3a2843d11937debc2b9eabd3d70dcff4e',
  MAX_SUPPLY: 1111,
  MAX_PER_WALLET: 3,
  MARKETPLACE: 'Opensea',
  MARKETPLACE_LINK: 'https://opensea.io/collection/radialartcollection',
  DISPLAY_COST: 0.01,
  GWEI_COST: '10000000000000000',
  NETWORK: {
    SYMBOL: 'ETH',
  },
  totalSupply: 4,
}

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input

export default function Mint() {
  const [mintAmount, setMintAmount] = useState(1)
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: CONFIG.CONTRACT_ADDRESS,
    abi: ABI,
    functionName: 'mint',
    args: [parseInt(mintAmount)],
    value: BigInt(mintAmount * CONFIG.GWEI_COST),
  })

  const { data, error, isError, write } = useContractWrite(config)

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
  })

  const isDisabled = !write || isLoading

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1
    if (newMintAmount < 1) {
      newMintAmount = 1
    }
    setMintAmount(newMintAmount)
  }

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1
    if (newMintAmount > CONFIG.MAX_PER_WALLET) {
      newMintAmount = CONFIG.MAX_PER_WALLET
    }
    setMintAmount(newMintAmount)
  }

  return (
    <Container>
      <CollectionTitle className={hashira.className}>
        {CONFIG.COLLECTION_NAME}
      </CollectionTitle>
      <WrapperTotalMint>
        {CONFIG.totalSupply} / {CONFIG.MAX_SUPPLY}
      </WrapperTotalMint>
      <LinkWrapper>
        <StyledLink target={'_blank'} href={CONFIG.SCAN_LINK}>
          {truncate(CONFIG.CONTRACT_ADDRESS, 15)}
        </StyledLink>
      </LinkWrapper>
      {Number(CONFIG.totalSupply) >= CONFIG.MAX_SUPPLY ? (
        <>
          <p style={{ textAlign: 'center' }}>The sale has ended.</p>
          <p style={{ textAlign: 'center' }}>
            You can still find {CONFIG.COLLECTION_NAME} on
          </p>
          <LinkWrapper>
            <StyledLink
              target={'_blank'}
              rel="noopener noreferrer"
              href={CONFIG.MARKETPLACE_LINK}
            >
              {CONFIG.MARKETPLACE}
            </StyledLink>
          </LinkWrapper>
        </>
      ) : (
        <>
          <span style={{ textAlign: 'center' }}>
            1 NFT costs {CONFIG.DISPLAY_COST} {CONFIG.NETWORK.SYMBOL}
          </span>
          <span style={{ textAlign: 'center', 'font-size': '0.7rem' }}>
            Excluding gas fees
          </span>

          <Wrapper>
            <RoundButtonQuantity
              disabled={isDisabled || isLoading}
              isDisabled={isDisabled}
              onClick={decrementMintAmount}
            >
              -
            </RoundButtonQuantity>
            <MintAmount>{mintAmount}</MintAmount>
            <RoundButtonQuantity
              disabled={isDisabled || isLoading}
              isDisabled={isDisabled}
              onClick={incrementMintAmount}
            >
              +
            </RoundButtonQuantity>
          </Wrapper>
          <MintButton
            disabled={isDisabled || isLoading}
            isDisabled={isDisabled}
            onClick={() => write()}
          >
            {isLoading ? 'Minting...' : 'Mint'}
          </MintButton>
          {isSuccess && (
            <SucessMessage>
              <div>
                Successfully minted your NFT!
                <div>
                  <span>Transaction: </span>
                  <LinkWrapper>
                    <StyledLink
                      target="_blank"
                      rel="noopener noreferrer"
                      href={`https://etherscan.io/tx/${data?.hash}`}
                    >
                      Etherscan
                    </StyledLink>
                  </LinkWrapper>
                </div>
              </div>
            </SucessMessage>
          )}
        </>
      )}
      <Web3Button icon="show" label="Connect Wallet" balance="show" />
    </Container>
  )
}

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  padding: 1rem 1rem 1.25rem;
  box-sizing: border-box;
  width: 300px;
  border-radius: 12px;
  border: 1px solid #303030;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Ubuntu, 'Helvetica Neue', sans-serif;
  margin-top: 4rem;
  @media (min-width: 650px) {
    width: 400px;
  }
`
const CollectionTitle = styled.div`
  font-size: 1.8rem;
  font-weight: 500;
  margin: 10px 0 0;
`

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0;
  gap: 15px;
`

const WrapperTotalMint = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 5px;
  gap: 15px;
  font-size: 1.5rem;
  font-weight: 600;
`

const MintAmount = styled.span`
  font-size: 1.5rem;
`

const RoundButtonQuantity = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border: 1px solid #808080;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  font-size: 1rem;
  color: ${(props) => (props.isDisabled ? '#808080' : '#FFFFFF')};
  background-color: ${(props) =>
    props.isDisabled ? 'transparent' : '#000000'};
  cursor: ${(props) => (props.isDisabled ? 'default' : 'pointer')};
`

const MintButton = styled.button`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 40px;
  width: ${(props) => (props.isDisabled ? '10rem' : '12rem')};
  box-sizing: border-box;
  border: 1px solid #808080;
  border-radius: 10px;
  font-size: 1rem;
  text-transform: uppercase;
  font-weight: 800;
  color: ${(props) => (props.isDisabled ? '#808080' : '#FFFFFF')};
  background-color: ${(props) =>
    props.isDisabled ? 'transparent' : '#000000'};
  cursor: ${(props) => (props.isDisabled ? 'default' : 'pointer')};
`

const StyledLink = styled.a`
  color: #808080;
  font-style: italic;
  font-size: 0.8rem;
  line-height: 1.5rem;
`

const LinkWrapper = styled.div`
  :hover {
    color: #ffffff !important;
  }
`

const SucessMessage = styled.div`
  text-align: center;
  font-size: 0.8rem;
  line-height: 1.5rem;
`
