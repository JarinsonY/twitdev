import Devit from "components/Devit"
import Logo from "components/Icons/Logo"
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
        <title>Inicio | TwitDev</title>
      </Head>
      <header>
        <div>
          <Logo width="18" />
        </div>
        <h2>Inicio</h2>
      </header>
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
        header {
          align-items: center;
          background: #ffffffaa;
          backdrop-filter: blur(5px);
          border-bottom: 1px solid #eee;
          height: 49px;
          display: flex;
          position: sticky;
          top: 0;
          width: 100%;
        }

        section {
          flex: 1;
        }

        div {
          margin-left: 15px;
        }

        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }
      `}</style>
    </>
  )
}
