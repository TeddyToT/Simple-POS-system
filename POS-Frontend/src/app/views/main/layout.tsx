import { Header, MainTabs } from './components'
import { Outlet } from 'react-router-dom'
import { useOrderSocket } from '@/hooks/useOrderSocket'
const Main = () => {

  useOrderSocket()

  return(
  <div className='min-h-dvh w-screen max-w-full bg-background'>
    <Header />
    <main className="mx-auto h-full w-full max-w-384">
        <MainTabs />
        <Outlet />
    </main>
    </div>
  )
}

export default Main
