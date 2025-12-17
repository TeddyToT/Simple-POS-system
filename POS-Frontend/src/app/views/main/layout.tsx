

import { Header, MainTabs } from './components'
import { Outlet } from 'react-router-dom'
const Main = () => {

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
