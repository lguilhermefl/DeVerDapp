'use client'

import styled from 'styled-components'
import {
  usePrepareContractWrite,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi'
import { Web3Button } from '@web3modal/react'
import { useState } from 'react'

const CONFIG = {
  COLLECTION_NAME: 'VINCENT DE VER',
  CONTRACT: {
    address: '0x8f6677b3a2843d11937debc2b9eabd3d70dcff4e',
  },
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

export default function Mint() {
  const [mintAmount, setMintAmount] = useState(1)
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
  } = usePrepareContractWrite({
    address: '0x8f6677b3a2843d11937debc2b9eabd3d70dcff4e',
    abi: [
      {
        inputs: [
          { internalType: 'uint256', name: '_mintAmount', type: 'uint256' },
        ],
        name: 'mint',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
      },
    ],
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
      <span>{CONFIG.COLLECTION_NAME}</span>
      <Wrapper>
        {CONFIG.totalSupply} / {CONFIG.MAX_SUPPLY}
      </Wrapper>
      {Number(CONFIG.totalSupply) >= CONFIG.MAX_SUPPLY ? (
        <>
          <p style={{ textAlign: 'center' }}>The sale has ended.</p>
          <p style={{ textAlign: 'center', color: 'var(--accent-text)' }}>
            You can still find {CONFIG.COLLECTION_NAME} on
          </p>
          <a target={'_blank'} href={CONFIG.MARKETPLACE_LINK}>
            {CONFIG.MARKETPLACE}
          </a>
        </>
      ) : (
        <>
          <span style={{ textAlign: 'center' }}>
            1 NFT costs {CONFIG.DISPLAY_COST} {CONFIG.NETWORK.SYMBOL}
          </span>
          <span style={{ textAlign: 'center' }}>Excluding gas fees</span>

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
            <div>
              Successfully minted your NFT!
              <div>
                <a href={`https://etherscan.io/tx/${data?.hash}`}>Etherscan</a>
              </div>
            </div>
          )}
          {(isPrepareError || isError) && (
            <div>Error: {(prepareError || error)?.message.split('.')[0]}</div>
          )}
        </>
      )}
      <Web3Button icon="show" label="Connect Wallet" balance="show" />
    </Container>
  )
}

const Container = styled.div`
  @import url('https://fonts.googleapis.com/css2?family=Roboto&display=swap');
  padding: 1rem;
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
const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
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
  width: ${(props) => (props.isDisabled ? '193.75px' : '221.47px')};
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
