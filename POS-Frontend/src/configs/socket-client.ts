import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel
} from '@microsoft/signalr'

import baseConfig from './base'
// import type { Order } from '@/api/types/order'

// SignalR socket client (Orders)
let socketClient: HubConnection | null = null
export const getSocket = () => {
  if (!socketClient) {
    socketClient = new HubConnectionBuilder()
      .withUrl(`${baseConfig.socketDomain}/hubs/orders`, { withCredentials: true })
      .withAutomaticReconnect([0, 2000, 5000, 10000])
      .configureLogging(LogLevel.Information)
      .build()

    socketClient.onreconnecting((err) => console.warn('[Order socket] Reconnecting', err))
    socketClient.onreconnected((id) => console.log('[Order socket] Reconnected', id))
    socketClient.onclose((err) => console.log('[Order socket] Disconnected', err))
  }
  return socketClient
}

export const connectSocket = async () => {
  const client = getSocket()
  if (client.state === HubConnectionState.Connected) return

  try {
    await client.start()
    console.log('[Order socket] Connected', client.connectionId)
  } catch (err) {
    console.error('[Order socket] Connect error', err)
  }
}

export const disconnectSocket = async () => {
  const client = getSocket()
  if (client.state !== HubConnectionState.Disconnected) {
    await client.stop()
    console.log('[Order socket] Disconnected manually')
  }
}
