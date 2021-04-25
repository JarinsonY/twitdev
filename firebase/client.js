import firebase from "firebase"

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiauQQJfBvr1VnnfiB4ipF1_X0ru9bc6o",
  authDomain: "twitdev-89d73.firebaseapp.com",
  projectId: "twitdev-89d73",
  storageBucket: "twitdev-89d73.appspot.com",
  messagingSenderId: "109137943896",
  appId: "1:109137943896:web:79c258a500fc8f1f1f192d",
  measurementId: "G-BN7L5YB17B",
}

/* Condicionar a firebase para que se inicialize solo 1 vez */
firebase.apps.length === 0 && firebase.initializeApp(firebaseConfig)

const mapUserFromFirebaseAuthToUser = (user) => {
  const { displayName, email, photoURL } = user

  return {
    avatar: photoURL,
    username: displayName,
    email,
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
  return firebase.auth().signInWithPopup(githubProvider)
}
