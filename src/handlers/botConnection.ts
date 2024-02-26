import { WebSocket } from 'ws'
import { WS_ADDRESS } from '../../constants'
/**
 * Establishes a WebSocket connection with the server.
 * @returns {WebSocket} The WebSocket connection object.
 */
const botConnection = () => {
  const botWs: any = new WebSocket(WS_ADDRESS)

  // Event listener for when the connection is opened.
  botWs.on('open', () => {
    console.log('Bot connected')
  })

  // Event listener for when the connection is closed.
  botWs.on('close', () => {
    console.log('Bot disconnected')
  })

  return botWs
}

export default botConnection