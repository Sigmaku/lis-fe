import * as React from 'react'
import { Outlet, createRootRoute } from '@tanstack/react-router'
import { AuthProvider } from '../features/Auth/AuthProvider'

export const Route = createRootRoute({
  component: () => {
    return (
        <React.Fragment>
            <AuthProvider>
              <Outlet />
            </AuthProvider>
        </React.Fragment>
    )
  }
})
