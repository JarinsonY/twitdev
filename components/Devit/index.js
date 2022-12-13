import { Modal, Button, Text } from "@nextui-org/react";
import Avatar from "components/Avatar"
import Heart from "components/Icons/Heart"
import Trash from "components/Icons/Trash"
import { deleteDevit, likeDevit } from "firebase/client"
import useDateTimeFormat from "hooks/useDateTimeFormat"
import useTimeAgo from "hooks/useTimeAgo"
import useUser from "hooks/useUser"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { colors } from "styles/theme"

export default function Devit({
  avatar,
  userId,
  userName,
  content,
  createdAt,
  likesCount,
  img,
  id,
}) {
  const timeago = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)
  const user = useUser()
  const router = useRouter()
  const [visible, setVisible] = useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    // console.log("closed");
  };

  const handleArticleClick = (e) => {
    e.preventDefault()
    router.push(`/status/${id}`)
  }

  const handleLikeClick = (e) => {
    e.preventDefault()
    likeDevit(id, user.uid, likesCount)
      .then()
      .catch((error) => {
        console.log(error)
      })
  }

  const handleDeleteClick = () => {
    deleteDevit(id);
    setVisible(false);
  }

  const likeIt = () => {
    /* Validate I like it */
    const dataLocalStorage2 = localStorage.getItem('userLikedPosts');
    const arrayData = dataLocalStorage2.split(',').find(doc => doc === id)
    return Boolean(arrayData)
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
            <div className="rightContent">
              <div className="likes" onClick={handleLikeClick}>
                <span>{likesCount} </span>
                <Heart width={28} height={28} stroke={colors.secondary} className="heart" fill={likeIt() ? colors.primary : 'transparent'} />
              </div>
              {user?.uid === userId && (
                <div className="likes" onClick={handler}>
                  <Trash width={28} height={28} stroke={colors.red} />
                </div>
              )}
            </div>
          </header>
          <div onClick={handleArticleClick}>
            <p>{content}</p>
            {img && <img src={img} />}
          </div>
        </section>
      </article>

      {/* Modal for delete Devit */}
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header>
          <Text id="modal-title" size={18}>
            Eliminar{' '}
            <Text b size={18}>
              Devit
            </Text>
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>
            ¿Seguro que quieres eliminar este Devit? No se puede deshacer.
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <Button auto flat color="error" onClick={closeHandler}>
            No, cancelar
          </Button>
          <Button auto onClick={handleDeleteClick}>
            Sí, eliminar
          </Button>
        </Modal.Footer>
      </Modal>

      <style jsx>{`
        header {
          width: 100%;
          display: grid;
          align-items: center;
          grid-template-columns: repeat(2, 1fr);
        }

        .info {
        }

        .rightContent {
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }

        .likes {
          display: flex;
          padding: 0 0 0 5px;
          justify-self: end;
          align-items: center;
        }

        .delete {
          display: flex;
          justify-self: end;
          align-items: center;
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
        }
      `}</style>
    </>
  )
}
