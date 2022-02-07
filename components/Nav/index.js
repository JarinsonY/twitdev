import Link from "next/link"
import Create from "components/Icons/Create"
import Home from "components/Icons/Home"
import { breakpoints, colors } from "styles/theme"
import User from "components/Icons/User"

export default function Nav({ position }) {
  return (
    <>
      <nav>
        <Link href="/home">
          <a>
            <Home width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        {/* <Link href="/search">
          <a>
            <Search width={32} height={32} stroke="#09f" />
          </a>
        </Link> */}
        <Link href="/compose/tweet">
          <a>
            <Create width={32} height={32} stroke="#09f" />
          </a>
        </Link>
        <Link href="/profile">
          <a>
            <User
              width={32}
              height={32}
              stroke="#09f"
              avatar="https://avatars.githubusercontent.com/u/19658821?v=4"
            />
          </a>
        </Link>
      </nav>

      <style jsx>{`
        nav {
          background: #fff;
          bottom: 0;
          border-top: 1px solid #eee;
          display: flex;
          height: 57px;
          position: ${position || 'fixed'};
          width: 100%;
          flex: 0 1 auto;
        }

        @media screen and (min-width: ${breakpoints.mobile}) {
          nav {
            position: absolute;
          }
        }

        nav a {
          align-items: center;
          display: flex;
          flex: 1 1 auto;
          height: 100%;
          justify-content: center;
          padding: 10px;
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
