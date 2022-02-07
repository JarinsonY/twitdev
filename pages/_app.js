import AppLayout from "components/AppLayout"
import Head from "next/head"
import { colors } from "styles/theme"

export default function App({ Component, pageProps }) {
  return (
    <AppLayout>
      <Head>
        <link rel="icon" href="/favicon.png" />
        <meta name="theme-color" content={colors.primary} />
      </Head>
      <Component {...pageProps} />
    </AppLayout>
  )
}
