import { useNavigate } from "@tanstack/react-router"
import { LogOut } from "lucide-react"
import MenuButton from "./MenuButton"
import { sidebarItems } from "../../lib/sidebarData"
import { useAuth } from "../../lib/AuthContext"
import ProfileView from "./ProfileView"

const Sidebar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate({ to: "/login", search: { redirect: undefined } })
  }

  return (
    <aside className="flex min-h-[calc(100vh-10rem)] w-72 shrink-0 flex-col gap-10 rounded-xl bg-white px-6 py-8 shadow-lg">
      <ProfileView
        image={user?.avatar ?? ""}
        name={user?.nama ?? "-"}
        job={user?.role ?? "-"}
      />

      <nav className="flex w-full flex-col gap-1">
        {sidebarItems.map(({ label, icon: Icon, link }) => (
          <MenuButton
            key={link}
            icon={<Icon size={20} />}
            url={link}
            label={label}
          />
        ))}
      </nav>

      <button
        type="button"
        onClick={handleLogout}
        className="mt-auto flex h-12 w-full items-center gap-2 rounded-lg p-2 text-sm font-semibold text-coral-glow transition hover:bg-coral-glow/10"
      >
        <LogOut size={20} />
        Keluar
      </button>
    </aside>
  )
}

export default Sidebar
