// Core
import { Outlet } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// App
import { Toaster } from '@/components/ui/sonner'
import { Circle, CircleAlert, CircleCheck, CircleX } from 'lucide-react';

const queryClient = new QueryClient();
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <div className='min-h-dvh w-screen max-w-full'>
        <Outlet />
      </div>
      <Toaster position='top-right' icons={{
        success : <CircleCheck className='text-green-600'/>,
        error: <CircleX className='text-red-600'/>,
        loading: <Circle className='text-blue-600'/>,
        warning: <CircleAlert className='text-yellow-600'/>,
      }} />
    </QueryClientProvider>
  )
}

export default App
