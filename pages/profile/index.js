import Devit from "components/Devit"
import Dropdown from "components/Dropdown"
import Header from "components/Header"
import Nav from "components/Nav"

import { devitsProfile } from "firebase/client"
import useUser from "hooks/useUser"
import Head from "next/head"
import { useEffect, useState } from "react"
import { colors } from "styles/theme"

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
        <title>Profile | TwitDev</title>
      </Head>
      <Header titlePage='Your Devits' />
      <div className='container'>
        <main className='userDetail'>
          {user && (
            <>
              <div className='dataUser'>
                <img src={user.avatar} />
                <p className="username">{user.username}</p>
              </div>
              <Dropdown />
            </>
          )}
        </main>
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
      </div>
      <Nav />
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

        .userDetail {
          width: 100%;
          padding: 24px 16px;
          display: flex;
          align-items: center;
          flex-direction: row;
          background: #ffffffaa;
        }

        img {
          width: 150px;
          border-radius: 9999px;
          outline: 5px inset ${colors.primary};
        }

        .username {
          margin: 16px 0 0 0;
          font-size: 18px;
          font-weight: 600;
        }

        .container{
          overflow-y: auto;
          flex-direction: column;
          height: calc(100% - 57px);
          position: absolute;
          padding-top: 57px;
        }

        .dataUser{
          display: flex;
          flex: 1 1 auto;
          flex-direction: column;
          padding-left: 43px;
          align-items: center;
        }

        section {
          /* flex: 1; */
          flex: 1 1 auto;
          height: calc(100% - 57px);
        }

        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }

        .container::-webkit-scrollbar {
          width: 7px;
        }

        .container::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background: ${colors.primary};
        }

        .container::-webkit-scrollbar-track {
          border-radius: 10px;
          margin-top: 57px;
        }
      `}</style>
    </>
  )
}
