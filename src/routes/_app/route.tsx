import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import HeaderBar from '../../components/HeaderBar'
import Sidebar from '../../features/Sidebar'
import { isLoggedIn } from '../../lib/authStorage'

export const Route = createFileRoute('/_app')({
  beforeLoad: ({ location }) => {
    if (!isLoggedIn()) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      })
    }
  },
  component: () => {
    return (
      <div className="min-h-screen bg-stone-50 font-rubik">
        <HeaderBar />
        {/* konten naik menimpa area header supaya kartu sidebar & konten "melayang" */}
        <div className="relative -mt-13 flex items-start gap-6 pb-10 pl-10 pr-10">
          <Sidebar />
          <main className="min-w-0 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    )
  }
})
