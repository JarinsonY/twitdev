import Avatar from "components/Avatar"
import Heart from "components/Icons/Heart"
import { likeDevit } from "firebase/client"
import useDateTimeFormat from "hooks/useDateTimeFormat"
import useTimeAgo from "hooks/useTimeAgo"
import Link from "next/link"
import { useRouter } from "next/router"
import { colors } from "styles/theme"

export default function Devit({
  avatar,
  userName,
  content,
  createdAt,
  likesCount,
  img,
  id,
}) {
  const timeago = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)
  const router = useRouter()

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  const handleLikeClick = (e) => {
    e.preventDefault()
    likeDevit(id, likesCount)
      .then(() => {
        console.log("You liked")
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (
    <>
      <article>
        <div className="avatar">
          <Avatar src={avatar} alt={userName} />
        </div>
        <section>
          <header>
            <div className="info">
              <strong>{userName}</strong>
              <span> · </span>
              <Link href={`/status/[${id}]`}>
                <a>
                  <time title={createdAtFormated}>{timeago}</time>
                </a>
              </Link>
            </div>
            <div className="likes" onClick={handleLikeClick}>
              <span>{likesCount} </span>
              <Heart stroke="#09f" className="heart" fill="#09f" />
            </div>
          </header>
          <div onClick={handleArticleClick}>
            <p>{content}</p>
            {img && <img src={img} />}
          </div>
        </section>
      </article>
      <style jsx>{`
        header {
          display: grid;
          width: 100%;
          grid-template-columns: repeat(2, 1fr);
        }

        .info {
        }

        .likes {
          display: flex;
          justify-self: end;
        }

        section {
          width: 100%;
        }

        article {
          border-bottom: 2px solid #eee;
          display: flex;
          padding: 10px 15px;
        }

        article:hover {
          background: #f5f8fa;
          cursor: pointer;
        }

        img {
          border-radius: 10px;
          height: auto;
          margin-top: 10px;
          width: 100%;
        }

        .avatar {
          padding-right: 10px;
        }

        p {
          line-height: 1.3125;
          margin: 0;
        }

        a {
          color: #555;
          font-size: 14px;
          text-decoration: none;
        }

        a:hover {
          text-decoration: underline;
        }

        .likes:hover {
          background: radial-gradient(#0099ff22, transparent);
          background-size: 180px 180px;
          background-position: center;
        }

        .likes:hover > :global(svg) {
          stroke: ${colors.secondary};
      `}</style>
    </>
  )
}
