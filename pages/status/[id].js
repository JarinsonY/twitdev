import Devit from "components/Devit"
import Head from "next/head"
import Link from "next/link"
import Nav from "components/Nav"

export default function DevitPage(props) {
  console.log(props)

  return (
    <>
      <Head>
        <title>{`Devit | ${props.userName}`}</title>
      </Head>
      <header>
        <Link href="/home">
          <a>
            <h2>Devit</h2>
          </a>
        </Link>
      </header>
      <Devit {...props} />
      <Nav position="absolute" />
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

        Nav {
          position: absolute;
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

/* export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "W3uwBXAJC1gLBkVr9kdK" } }],
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const { params } = context
  const { id } = params

  const apiResponse = await fetch(`http://localhost:3000/api/devits/${id}`)
  if (apiResponse.ok) {
    const props = await apiResponse.json()
    return { props }
  }
} */

export const getServerSideProps = async (context) => {
  const { params, res } = context
  const { id } = params

  const apiResponse = await fetch(`https://twitdev.vercel.app/api/devits/${id}`)
  if (apiResponse.ok) {
    const props = await apiResponse.json()
    return { props }
  }
  if (res) {
    res.writeHead(301, { Location: "/home" }).end()
  }
}
