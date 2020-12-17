/*
* setting states to check whether a session is authenticated
* */
export function setAuthState (state, data) {
  state.isAuthenticated = data.isAuthenticated
  state.isReady = data.isReady
  state.uid = data.uid
}
