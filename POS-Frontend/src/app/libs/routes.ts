import type { RouteObject } from 'react-router-dom'
import { ROUTE_PATHS } from '@/constants/path'
import mainRoutes from '../views/main/lib/routes'

// App routes
const appRoutes: RouteObject[] = [
  {
    children: [
      // App
      {
        path: ROUTE_PATHS.app.path,
        lazy: async () => {
          const { default: App } = await import('../layout')
          return {
            Component: App
          }
        },
        children: [mainRoutes]
      }
    ],
  }
]

export default appRoutes



