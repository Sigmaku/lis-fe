import { Outlet, createRootRoute } from '@tanstack/react-router'
import { AuthProvider } from '../features/Auth/AuthProvider'

export const Route = createRootRoute({
  component: () => {
    return (
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    )
  }
})
