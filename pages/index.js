import Head from "next/head"
import { useEffect } from "react"

import Button from "components/Button"
import GitHub from "components/Icons/GitHub"

import { colors } from "styles/theme"

/* import Logo from "components/Icons/Logo" */

import { loginWithGitHub } from "firebase/client"

import { useRouter } from "next/router"
import useUser, { USER_STATES } from "hooks/useUser"

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
  }, [user])

  const handleClick = () => {
    loginWithGitHub().catch((err) => {
      console.log(err)
    })
  }

  return (
    <>
      <Head>
        <title>👨‍💻 TwitDev 👩‍💻</title>
        <link rel="icon" href="/favicon.png" />
      </Head>

      <section>
        {/* <Logo width="100" /> */}
        <img src='/TwitDevLogo.png' />
        <h1>TwitDev</h1>
        <h2>
          Talk about development <br /> with developers 👨‍💻👩‍💻
        </h2>

        <div>
          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>
              <GitHub fill="#fff" width={24} height={24} />
              Login with GitHub
            </Button>
          )}
          {user === USER_STATES.NOT_KNOWN && <img src="/spinner.gif" />}
        </div>
      </section>

      <style jsx>{`
        img {
          width: 120px;
        }

        div {
          margin-top: 24px;
        }

        section {
          display: grid;
          height: 100%;
          place-content: center;
          place-items: center;
        }

        h1 {
          color: ${colors.primary};
          font-weight: 800;
          font-size: 32px;
        }

        h2 {
          color: ${colors.secondary};
          font-size: 21px;
          margin: 0;
        }
      `}</style>
    </>
  )
}
