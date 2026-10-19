import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import HeaderBar from '../../components/HeaderBar'
import Sidebar from '../../features/Sidebar'

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ location }) => {
    const raw = localStorage.getItem("auth.user");
    const isLoggedIn = !!raw && raw !== "null" && raw !== "undefined";

    if (!isLoggedIn) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  component: () => {
    return (
        <div className='relative flex flex-row'>
            <HeaderBar />
            <div className='absolute flex flex-row'>
              <Sidebar/>
              <Outlet />
            </div>
        </div>
    )
  }
})

