export const STORAGE_KEY = 'cognito-oauth2-demo'

let initialState = {}

// Local storage sync state
if (localStorage.getItem(STORAGE_KEY)) {
  initialState = JSON.parse(localStorage.getItem(STORAGE_KEY))
} else {
  initialState = {
    auth: {
      isLoggedIn: false,
      accessToken: null,
      idToken: null
    },
    user: {
      name: null,
      email: null,
      username: null
    }
  }
}

// Other state (not synced in local storage)
initialState.appnav = {
  searchText: '',
  searchTimestamp: null
}

export const state = initialState
