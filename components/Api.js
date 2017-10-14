import * as firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyDU-gFn2FU7PxcnuTCsa706mSIq6Kc80vo',
  authDomain: 'pronto-racing.firebaseapp.com',
  databaseURL: 'https://pronto-racing.firebaseio.com/',
  storageBucket: 'gs://pronto-racing.appspot.com'
}

const firebaseApp = firebase.initializeApp(config)
const database = firebaseApp.database()
const rooms = database.ref('rooms')

export function loginFacebook (onSuccess, onError) {
  firebase.auth().useDeviceLanguage()
  var provider = new firebase.auth.FacebookAuthProvider()
  provider.addScope('email')
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(function (authData) {
      console.log(authData)
      onSuccess(authData)
    })
    .catch(function (error) {
      console.log(error)
      onError(error)
    })
}

export function subscribeRoom (roomNumber, onChange, onError) {
  rooms.child(roomNumber).on(
    'value',
    snapshot => {
      onChange(snapshot.val())
    },
    error => {
      onError(error)
    }
  )
}

export function updateProgress (roomNumber, userProgress) {
  let progress = {
    lastTime: Date.now(),
    lastProgress: userProgress
  }
  rooms
    .child(`${roomNumber}/users/${firebase.auth().currentUser.uid}`)
    .update(progress)
}
