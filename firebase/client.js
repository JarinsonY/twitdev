import firebase from "firebase"

const firebaseConfig = JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_CONFIG)

/* Condicionar a firebase para que se inicialize solo 1 vez */
firebase.apps.length === 0 && firebase.initializeApp(firebaseConfig)

const db = firebase.firestore()

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL, uid } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
    uid,
  }
}

export const onAuthStateChanged = (onChange) => {
  return firebase.auth().onAuthStateChanged((user) => {
    const normalizedUser = user ? mapUserFromFirebaseAuthToUser(user) : null
    onChange(normalizedUser)
  })
}

export const loginWithGitHub = () => {
  const githubProvider = new firebase.auth.GithubAuthProvider()
  localStorage.setItem('userLikedPosts', '');
  return firebase.auth().signInWithRedirect(githubProvider)
}

export const logout = () => {
  return firebase.auth().signOut()
}

export const addDevit = ({ avatar, content, img, userId, userName }) => {
  return db.collection("devits").add({
    avatar,
    content,
    img,
    userId,
    userName,
    createdAt: firebase.firestore.Timestamp.fromDate(new Date()),
    likesCount: 0,
    sharedCount: 0,
  })
}

const mapDevitFromFirebaseToDevitObject = (doc) => {
  const data = doc.data()
  const id = doc.id
  const { createdAt } = data

  return {
    ...data,
    id,
    createdAt: +createdAt.toDate(),
  }
}

export const listenLatestDevits = (callback) => {
  return db
    .collection("devits")
    .orderBy("createdAt", "desc")
    .limit(20)
    .onSnapshot(({ docs }) => {
      const newDevits = docs.map(mapDevitFromFirebaseToDevitObject)
      callback(newDevits)
    })
}

export const devitsProfile = (callback, uid) => {
  db.collection("devits")
    .where("userId", "==", uid)
    .orderBy("createdAt", "desc")
    .onSnapshot(({ docs }) => {
      const newDevits = docs.map(mapDevitFromFirebaseToDevitObject)
      /* console.log(newDevits) */
      callback(newDevits)
    })
}

export const uploadImage = (file) => {
  const ref = firebase.storage().ref(`images/${file.name}`)
  const task = ref.put(file)

  return task
}

export const getPostsLiked = (uid) => {
  db.collection("userLikes")
    .doc(uid)
    .onSnapshot((doc) => {
      const { likesPosts } = doc.data()
      /* localStorage.setItem('likedPosts', JSON.stringify(likesPosts)); */
      localStorage.setItem('userLikedPosts', likesPosts);
    })
}

export const likeDevit = (post, userId, likesCount) => {

  

  /* Get posts liked  */
  /* const dataLocalStorage = JSON.parse(localStorage.getItem('likedPosts')); */
  const dataLocalStorage2 = localStorage.getItem('userLikedPosts');
  const arrayData = dataLocalStorage2.split(',').filter(post => post !== '')


  /* Add document in user posts liked */
  const validate = arrayData.find(doc => doc === post)

  /* Already like it */
  validate !== undefined
    && db.collection("userLikes").doc(userId).set({
      likesPosts: arrayData.filter(doc => doc !== post)
    })

  /* Haven't liked it */
  validate === undefined
    && db.collection("userLikes").doc(userId).set({
      likesPosts: arrayData.concat(post)
    })

  /* arrayData.find(doc => doc === post)
    ? console.log("Hubo un error")
    : (db.collection("userLikes").doc(userId).set({
      likesPosts: arrayData.concat(post)
    })) */

  return db
    .collection("devits")
    .doc(post)
    .update({
      likesCount: validate === undefined ? likesCount + 1 : likesCount - 1,
    })
    .then(() => { })
    .catch((error) => {
      console.log("Hubo un error: ", error)
    })

}
