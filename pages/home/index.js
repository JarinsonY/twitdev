import Devit from "components/Devit"
import Create from "components/Icons/Create"
import Home from "components/Icons/Home"
import Search from "components/Icons/Search"
import { fetchLastestDevits } from "firebase/client"
import useUser from "hooks/useUser"
import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import { colors } from "styles/theme"

export default function HomePage() {
  const [timeline, setTimeline] = useState([])
  const user = useUser()

  useEffect(() => {
    user && fetchLastestDevits().then(setTimeline)
  }, [user])

  return (
    <>
      <Head>
        <title>Inicio | TwitDev</title>
      </Head>
      <header>
        <h2>Inicio</h2>
      </header>
      <section>
        {timeline.map(
          ({ createdAt, img, id, userName, avatar, content, userId }) => (
            <Devit
              avatar={avatar}
              content={content}
              createdAt={createdAt}
              id={id}
              img={img}
              key={id}
              userId={userId}
              userName={userName}
            />
          )
        )}
      </section>
      <nav>
        <Link href="/home">
          <a>
            <Home width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/search">
          <a>
            <Search width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/compose/tweet">
          <a>
            <Create width={32} height={32} stroke="#09f" />
          </a>
        </Link>
      </nav>
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

        h2 {
          font-size: 21px;
          font-weight: 800;
          padding-left: 15px;
        }

        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          display: flex;
          height: 49px;
          position: sticky;
          width: 100%;
        }

        nav a {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
        }

        nav a:hover {
          background: radial-gradient(#0099ff22 15%, transparent 16%);
          background-size: 180px 180px;
          background-position: center;
        }

        nav a:hover > :globla(svg) {
          stroke: ${colors.primary};
        }
      `}</style>
    </>
  )
}
