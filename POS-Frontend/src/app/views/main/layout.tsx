

import { useEffect } from 'react'
import { Header, MainTabs } from './components'
import { Outlet } from 'react-router-dom'
import { connectSocket, disconnectSocket } from '@/configs/socket-client'
import { useOrderSocket } from '@/hooks/useOrderSocket'
const Main = () => {

    useOrderSocket()

    useEffect(() => {
    connectSocket()

    return () => {
      disconnectSocket()
    }
  }, [])
  return(
  <div className='min-h-dvh w-screen max-w-full bg-muted'>
    <Header />
    <main className="mx-auto h-full w-full max-w-384">
        <MainTabs />
        <Outlet />
    </main>
    </div>
  )
}

export default Main
