import { Link, type LinkProps } from "@tanstack/react-router"
import type { ReactNode } from "react"

type MenuButtonProps = {
    label: string
    icon: ReactNode
    url: LinkProps['to']
}

const MenuButton = ({label, icon, url}: MenuButtonProps) => {
  return (
    <Link 
        to={url}
        activeProps={{ className: "bg-soft-peach text-white" }}
        className="flex w-full h-12 items-center gap-2 p-2 rounded-lg text-velvet-purple text-sm font-semibold hover:scale-103 transition-all duration-150"
    >
      {icon}
      <div className="">{label}</div>
    </Link>
  )
}

export default MenuButton