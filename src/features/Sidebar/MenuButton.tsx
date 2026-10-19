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
        activeOptions={{ exact: url === "/" }}
        activeProps={{ className: "bg-soft-peach text-stone-900" }}
        className="flex h-12 w-full items-center gap-2 rounded-lg p-2 text-sm font-semibold text-stone-600 transition-all duration-150 hover:bg-soft-peach/50"
    >
      {icon}
      <div>{label}</div>
    </Link>
  )
}

export default MenuButton
