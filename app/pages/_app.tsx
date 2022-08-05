import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Link Previewer — Preview and embed title, thumbnail image, description of any public link</title>

      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
