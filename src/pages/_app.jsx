import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'
import { Web3Modal } from '@web3modal/react'
import { useEffect, useState } from 'react'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet } from 'wagmi/chains'
import Head from 'next/head'

import './styles.css'
import './carousel.css'

// 1. Get projectID at https://cloud.walletconnect.com
if (!process.env.NEXT_PUBLIC_PROJECT_ID) {
  throw new Error('You need to provide NEXT_PUBLIC_PROJECT_ID env variable')
}
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID

// 2. Configure wagmi client
const chains = [mainnet]

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })])
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ version: 1, chains, projectId }),
  publicClient,
})

// 3. Configure modal ethereum client
const ethereumClient = new EthereumClient(wagmiConfig, chains)

// 4. Wrap your app with WagmiProvider and add <Web3Modal /> component
export default function App({ Component, pageProps }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    setReady(true)
  }, [])

  return (
    <>
      <Head>
        <title>Vincent de ver | A New World</title>
        <meta
          name="description"
          content="Redefine what you think and what you see."
        />
        <link rel="shortcut icon" href="./favicon.ico" />
      </Head>
      {ready ? (
        <WagmiConfig config={wagmiConfig}>
          <Component {...pageProps} />
        </WagmiConfig>
      ) : null}

      <Web3Modal
        themeMode="light"
        projectId={projectId}
        ethereumClient={ethereumClient}
        themeVariables={{
          '--w3m-color-overlay': 'rgb(255 255 255 / 45%)',
          '--w3m-accent-color': '#000000',
          '--w3m-background-color': '#000000',
        }}
      />
    </>
  )
}