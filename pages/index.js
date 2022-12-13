import Head from "next/head"
import { useEffect } from "react"

import Button from "components/Button"
import GitHub from "components/Icons/GitHub"

import { colors } from "styles/theme"

/* import Logo from "components/Icons/Logo" */

import { getPostsLiked, loginWithGitHub } from "firebase/client"

import { useRouter } from "next/router"
import useUser, { USER_STATES } from "hooks/useUser"

export default function Home() {
  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    user && router.replace("/home")
    /* Save in local storage posts liked user */
    user && getPostsLiked(user.uid)
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
      </Head>

      <section>
        <div className='divLogo'>
          {/* <Logo width="100" /> */}
          <img src='/TwitDevLogo.png' />
          <h1>TwitDev</h1>
        </div>

        <div className='divContent'>
          <h2>
            Talk about development <br /> with developers
          </h2>
          <h2>
            Share your knowledge and more
            <br />👨‍💻👩‍💻
          </h2>

          {user === USER_STATES.NOT_LOGGED && (
            <Button onClick={handleClick}>
              <GitHub fill={colors.white} width={24} height={24} />
              Login with GitHub
            </Button>
          )}
          {user === USER_STATES.NOT_KNOWN && <img src="/spinner.gif" />}
        </div>
      </section>

      <style jsx>{`
        img {
          width: 120px;
          align-self: center;
        }

        section {
          display: grid;
          height: 100%;
          row-gap: 24px;
          place-content: center;
          place-items: center;
        }

        h1 {
          color: ${colors.primary};
          font-weight: 800;
          font-size: 32px;
          margin: auto;
        }

        h2 {
          color: ${colors.quinary};
          font: caption;
          text-align: center;
          margin: 0;
        }

        .divContent {
          display: flex;
          flex-direction: column;
          row-gap: 24px;
        }
      `}</style>
    </>
  )
}
