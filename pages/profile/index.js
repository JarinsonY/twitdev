import Devit from "components/Devit"
import Header from "components/Header"
import Nav from "components/Nav"

import { devitsProfile } from "firebase/client"
import useUser from "hooks/useUser"
import Head from "next/head"
import { useEffect, useState } from "react"

export default function ProfilePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    let unsubscribe
    if (user) {
      unsubscribe = devitsProfile(setTimeline, user.uid)
    }
    return () => unsubscribe && unsubscribe()
  }, [user])

  return (
    <>
      <Head>
        <title>Inicio | TwitDev</title>
      </Head>
      <Header titlePage='Your Devits' />
      {user && (<main>
        <img src={user.avatar} />
        <p className="username">{user.username}</p>
      </main>)}
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

        div {
          margin-left: 15px;
        }

        main {
          width: 100%;
          padding: 24px;
          display: flex;
          align-items: center;
          flex-direction: column;
          background: #ffffffaa;
        }

        img {
          width: 150px;
          border-radius: 9999px;
        }

        .username {
          margin: 16px 0;
          font-size: 18px;
          font-weight: 600;
        }

        section {
          flex: 1;
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
