// Remember, we have access to our Vue instance not using
// an arrow function in our actions file. This allows us
// to create a scoped reference to our firebaseService - $fb
// That was assigned to the Vue instance earlier in our serviceConnection
// boot file.
import { firestoreAction } from 'vuexfire'
import User from '../../models/User.js'

export const addUserToUsersCollection = async function (state, userRef) {


  let state2 = {fullName:state.email}
  const { email } = state,
        { fullName } = state2,
    user = new User({email,fullName})
  return userRef.set(user)
}

export const createNewUser = async function ($root, data) {
  const $fb = this.$fb
  const { email, password } = data
  const fbAuthResponse = await $fb.createUserWithEmail(email, password)
  const id = fbAuthResponse.user.uid
  const userRef = $fb.userRef('users', id)
  return addUserToUsersCollection({ email }, userRef)
}

export const loginUser = async function ($root, payload) {
  const $fb = this.$fb
  const { email, password } = payload
  return $fb.loginWithEmail(email, password)
}

export const logoutUser = async function ({ state }) {
  await firestoreAction(({ unbindFirestoreRef }) => { unbindFirestoreRef('currentUser') })
  //commit('user/setCurrentUserData', null, { root: true })
  this.$fb.logoutUser()
}

export function routeUserToHome () {
  this.$router.push({
    path: '/'
  }).catch(err => {})
}

