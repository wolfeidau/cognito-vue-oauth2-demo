import decode from 'jwt-decode'
import store from './store'
import router from './router'

/**
* Auth Plugin
*
* Handles login and token authentication using OAuth2.
*/
export default {

  /**
   * Install the Auth class.
   *
   * Creates a Vue-resource http interceptor to handle automatically adding auth headers
   * and refreshing tokens. Then attaches this object to the global Vue (as Vue.auth).
   *
   * @param {Object} Vue The global Vue.
   * @param {Object} options Any options we want to have in our plugin.
   * @return {void}
   */
  install (Vue, options) {
    Vue.http.interceptors.push((request, next) => {
      const token = store.state.auth.accessToken
      const hasAuthHeader = request.headers.has('Authorization')

      if (token && !hasAuthHeader) {
        this.setAuthHeader(request)
      }

      next((response) => {
        if (this._isInvalidToken(response)) {
          return this._refreshToken(request)
        }
      })
    })

    this.options = options || {}

    if (!options.cognitoDomain) {
      throw Error('cognitoDomain required configuration')
    }

    if (!options.clientId) {
      throw Error('clientId required configuration')
    }

    if (!options.redirectURL) {
      throw Error('redirectURL required configuration')
    }

    Vue.prototype.$auth = Vue.auth = this
  },

  /**
   * getLoginURL
   *
   * Build the login URL using environment variables.
   *
   * @return {string}
   */
  getLoginURL () {
    return `https://${this.options.cognitoDomain}/login?response_type=token&client_id=${this.options.clientId}&redirect_uri=${this.options.redirectURL}`
  },

  /**
   * storeTokens
   *
   * Parse the URL and extract the tokens.
   *
   * @return {boolean}
   */
  storeTokens () {
    let accessToken = getParameterByName('access_token')
    let idToken = getParameterByName('id_token')

    const auth = store.state.auth
    const user = store.state.user

    Object.assign(auth, {
      isLoggedIn: true,
      accessToken: accessToken,
      idToken: idToken
    })

    const tokenData = decode(idToken)

    console.log('tokenData', tokenData)

    Object.assign(user, {
      name: tokenData.name,
      email: tokenData.email,
      username: tokenData['cognito:username']
    })

    store.commit('UPDATE_AUTH', auth)
    store.commit('UPDATE_USER', user)

    return true
  },

  /**
   * getAccessToken
   *
   * Get the stored access token.
   *
   * @return {string}
   */
  getAccessToken () {
    return store.state.auth.accessToken
  },

  /**
   * getIdToken
   *
   * Get the stored id token.
   *
   * @return {string}
   */
  getIdToken () {
    return store.state.auth.idToken
  },

  /**
   * isLoggedIn
   *
   * Check if the user is logged in.
   *
   * @return {boolean}
   */
  isLoggedIn () {
    const idToken = this.getIdToken()
    return !!idToken && !isTokenExpired(idToken)
  },

  /**
   * Logout
   *
   * Clear all data in our Vuex store (which resets logged-in status) and redirect back
   * to login form.
   *
   * @return {void}
   */
  logout () {
    store.commit('CLEAR_ALL_DATA')
    router.push({ name: 'Home' })
  }

}

// Helper function that will allow us to extract the access_token and id_token
function getParameterByName (name) {
  let match = RegExp('[#&]' + name + '=([^&]*)').exec(window.location.hash)
  return match && decodeURIComponent(match[1].replace(/\+/g, ' '))
}

function getTokenExpirationDate (encodedToken) {
  const token = decode(encodedToken)
  if (!token.exp) { return null }

  const date = new Date(0)
  date.setUTCSeconds(token.exp)

  return date
}

function isTokenExpired (token) {
  const expirationDate = getTokenExpirationDate(token)
  return expirationDate < new Date()
}
