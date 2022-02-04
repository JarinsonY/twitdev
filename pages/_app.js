import AppLayout from "components/AppLayout"
import Head from "next/head"

export default function App({ Component, pageProps }) {
  return (
    <AppLayout>
      <Head>
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Component {...pageProps} />
    </AppLayout>
  )
}
