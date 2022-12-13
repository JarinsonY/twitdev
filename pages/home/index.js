import Devit from "components/Devit"
import Header from "components/Header"
import Nav from "components/Nav"
import NoDevit from "components/NoDevit"

import { listenLatestDevits } from "firebase/client"
import useUser from "hooks/useUser"
import Head from "next/head"
import { useEffect, useState } from "react"
import { colors } from "styles/theme"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    let unsubscribe
    if (user) {
      unsubscribe = listenLatestDevits(setTimeline)
    }
    return () => unsubscribe && unsubscribe()
  }, [user])

  const twitDevsForUniversity = timeline.filter(
    (twitdev) => twitdev.forUniversity === true
  ) // Filter the twitdevs for university

  return (
    <>
      <Head>
        <title>Home | TwitDev</title>
      </Head>
      <Header titlePage='Home' />
      <section>
        {twitDevsForUniversity.length === 0 ? (
          <NoDevit />
        ) : (
          twitDevsForUniversity.map(
            ({
              likesCount,
              createdAt,
              img,
              id,
              userName,
              avatar,
              content,
              userId,
            }) => (
              <Devit
                avatar={avatar}
                content={content}
                createdAt={createdAt}
                likesCount={likesCount}
                id={id}
                img={img}
                key={id}
                userId={userId}
                userName={userName}
              />
            )
          )
        )}
      </section>
      <Nav />
      <style jsx>{`

        section {
          /* flex: 1; */
          width: 100%;
          flex: 1 1 auto;
          overflow-y: auto;
          height: calc(100% - 57px);
          position: absolute;
          padding-top: 57px;
        }

        section::-webkit-scrollbar {
          width: 7px;
        }

        section::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: ${colors.primary};
        }

        section::-webkit-scrollbar-track {
          border-radius: 10px;
          margin-top: 57px;
        }

      `}</style>
    </>
  )
}
