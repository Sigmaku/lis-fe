import { createFileRoute, Outlet } from '@tanstack/react-router'
import HeaderBar from '../../components/HeaderBar'
import Sidebar from '../../features/Sidebar'

export const Route = createFileRoute('/_app')({
  component: () => {
    return (
        <div className='relative flex flex-row'>
            <HeaderBar />
            <Sidebar />
            <div className=''>
              <Outlet />
            </div>
        </div>
    )
  }
})

