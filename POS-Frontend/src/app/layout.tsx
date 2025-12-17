// Core
import { Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// App
import { Toaster } from '@/components/ui/sonner'

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='min-h-dvh w-screen max-w-full'>
        <Outlet />
      </div>
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
