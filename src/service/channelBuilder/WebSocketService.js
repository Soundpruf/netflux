const CONNECT_TIMEOUT = 2000

class WebSocketService {

  constructor (options = {}) {
    this.defaults = {
      host: '127.0.0.1',
      port: 8080
    }
    this.settings = Object.assign({}, this.defaults, options)
  }

  /**
   * Creates WebSocket with server.
   * @param {string} url - Server url
   * @return {Promise} It is resolved once the WebSocket has been created and rejected otherwise
   */
  connect (url) {
    return new Promise((resolve, reject) => {
      let WebSocket
      if (typeof window === 'undefined') WebSocket = require('ws')
      else WebSocket = window.WebSocket
      try {
        let ws = new WebSocket(url)
        ws.onopen = () => resolve(ws)
        ws.onerror = (evt) => {
          console.error(`WebSocket with ${url}: ${evt.type}`)
          reject(evt.type)
        }
        ws.onclose = (closeEvt) => {
          if (closeEvt.code !== 1000) {
            console.error(`WebSocket with ${url} has closed. ${closeEvt.code}: ${closeEvt.reason}`)
            reject(closeEvt.reason)
          }
        }
      } catch (err) { reject(err.message) }
    })
  }

}

export default WebSocketService
