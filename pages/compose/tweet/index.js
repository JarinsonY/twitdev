import { useEffect, useState } from "react"
import Button from "components/Button"
import useUser from "hooks/useUser"
import { addDevit, uploadImage } from "firebase/client"
import { useRouter } from "next/router"
import Head from "next/head"
import Avatar from "components/Avatar"
import Nav from "components/Nav"
import Clip from "components/Icons/Clip"

const COMPOSE_STATES = {
  USER_NOT_KNOW: 0,
  LOADING: 1,
  SUCCESS: 2,
  ERROR: -1,
}

const DRAG_IMAGE_STATES = {
  ERROR: -1,
  NONE: 0,
  DRAG_OVER: 2,
  COMPLETE: 3,
}

export default function ComposeTweet() {
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState(COMPOSE_STATES.USER_NOT_KNOW)

  const [drag, setDrag] = useState(DRAG_IMAGE_STATES.NONE)
  const [task, setTask] = useState(null)
  const [imgURL, setImgURL] = useState(null)

  const user = useUser()
  const router = useRouter()

  useEffect(() => {
    if (task) {
      const onProgress = () => { }
      const onError = () => { }
      const onComplete = () => {
        console.log("onComplete")
        task.snapshot.ref.getDownloadURL().then(setImgURL)
      }
      task.on("state_changed", onProgress, onError, onComplete)
    }
  }, [task])

  const handleChange = (event) => {
    const { value } = event.target
    setMessage(value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setStatus(COMPOSE_STATES.LOADING)
    addDevit({
      //    Datos a guardar en firebase
      avatar: user.avatar,
      content: message,
      userId: user.uid,
      userName: user.username,
      img: imgURL,
    })
      .then(() => {
        router.push("/home")
      })
      .catch((err) => {
        console.log(err)
        setStatus(COMPOSE_STATES.ERROR)
      })
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.DRAG_OVER)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setDrag(DRAG_IMAGE_STATES.NONE)
    const file = e.dataTransfer.files[0]

    const task = uploadImage(file)
    setTask(task)
  }

  const handleChangeInput = (e) => {
    const file = e.target.files[0]
    const task = uploadImage(file)
    setTask(task)
  }

  const isButtonDisabled =
    message.length === 0 || status === COMPOSE_STATES.LOADING

  return (
    <>
      <Head>
        <title>New Devit | TwitDev</title>
      </Head>
      <section className="form-container">
        {user && (
          <section className="avatar-container">
            <Avatar src={user.avatar} />
          </section>
        )}
        <form onSubmit={handleSubmit}>
          <textarea
            onChange={handleChange}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            placeholder="¿Qué está pasando?"
            value={message}
          ></textarea>
          <div className="icon-clip">
            <label htmlFor="img"><Clip width={32} height={32} stroke="#09f" /></label>
            <input type="file" id="img" name="img" accept="image/*" onChange={(e) => handleChangeInput(e)} />
          </div>
          {imgURL && (
            <section className="remove-img">
              <button onClick={() => setImgURL(null)}>x</button>
              <img src={imgURL} />
            </section>
          )}
          <div className="divButton">
            <Button disabled={isButtonDisabled}>Devitear</Button>
          </div>
        </form>
      </section>
      <Nav position={imgURL ? "inherit" : "absolute"} />
      <style jsx>{`
        .divButton {
          padding: 15px;
        }

        .avatar-container {
          padding-top: 20px;
          padding-left: 10px;
        }

        button {
          background: rgba(0, 0, 0, 0.3);
          border-radius: 999px;
          border: 0;
          color: #fff;
          font-size: 24px;
          height: 32px;
          position: absolute;
          right: 15px;
          top: 15px;
          width: 32px;
        }

        .form-container {
          align-items: flex-start;
          display: flex;
        }

        .remove-img {
          position: relative;
        }

        form {
          flex: 1 1 auto;
          padding: 10px;
        }

        img {
          border-radius: 10px;
          height: auto;
          width: 100%;
        }

        textarea {
          border: ${drag === DRAG_IMAGE_STATES.DRAG_OVER
          ? "3px dashed #09f"
          : "3px solid #E5E5E5"};
          border-radius: 10px;
          font-size: 21px;
          min-height: 200px;
          padding: 15px;
          outline: 0;
          resize: none;
          width: 100%;
        }

        textarea:hover {
          border: 3px solid #09f;
        }

        .icon-clip{
          width: fit-content;
          position: absolute;
          right: 24px;
          top: 24px;
        }

        label{
          cursor: pointer;
        }

        input {
          display: none;
        }
      `}</style>
    </>
  )
}
