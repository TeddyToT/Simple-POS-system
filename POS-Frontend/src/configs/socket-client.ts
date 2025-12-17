import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel
} from '@microsoft/signalr'

import baseConfig from './base'
import type { Order } from '@/api/types/order'

// SignalR socket client (Orders)

const socketClient: HubConnection = new HubConnectionBuilder()
  .withUrl(`${baseConfig.socketDomain}/hubs/orders`, {
    withCredentials: true
    // authentication later
  })
  .withAutomaticReconnect([0, 2000, 5000, 10000])
  .configureLogging(LogLevel.Information)
  .build()

// Connection lifecycle

socketClient.onreconnecting((error) => {
  console.warn('[Order socket] Reconnecting...', { error })
})

socketClient.onreconnected((connectionId) => {
  console.log('[Order socket] Reconnected', { connectionId })
})

socketClient.onclose((error) => {
  console.log('[Order socket] Disconnected', { error })
})

// Connect / Disconnect

export const connectSocket = async () => {
  if (socketClient.state === HubConnectionState.Connected) return

  try {
    await socketClient.start()
    console.log('[Order socket] Connected', {
      state: socketClient.state,
      connectionId: socketClient.connectionId
    })
  } catch (err) {
    console.error('[Order socket] Connect error', err)
  }
}

export const disconnectSocket = async () => {
  if (socketClient.state !== HubConnectionState.Disconnected) {
    await socketClient.stop()
    console.log('[Order socket] Disconnected manually')
  }
}

// Events

export const onOrderCreated = (callback: (order: Order) => void) => {
  socketClient.on('OrderCreated', (order: Order) => {
    console.log('[Order socket] OrderCreated', order)
    callback(order)
  })
}

export const offOrderCreated = () => {
  socketClient.off('OrderCreated')
}

// Export

export { socketClient }
export default socketClient
