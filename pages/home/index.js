import Devit from "components/Devit"
import Header from "components/Header"
import Nav from "components/Nav"

import { listenLatestDevits } from "firebase/client"
import useUser from "hooks/useUser"
import Head from "next/head"
import { useEffect, useState } from "react"

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

  return (
    <>
      <Head>
        <title>Home | TwitDev</title>
      </Head>
      <Header titlePage='Home' />
      <section>
        {timeline.map(
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
        )}
      </section>
      <Nav position="sticky" />
      <style jsx>{`

        section {
          flex: 1;
        }

      `}</style>
    </>
  )
}
