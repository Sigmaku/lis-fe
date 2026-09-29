import { File, Layers, UserRound, type LucideIcon } from "lucide-react"
import type { LinkProps } from "@tanstack/react-router"

export interface SidebarData {
  label: string
  icon: LucideIcon
  link: LinkProps['to']
}

export const sidebarItems: SidebarData[] = [
  { label: "Data Buku",   icon: Layers,    link: "/" },
  { label: "Data Anggota", icon: File,      link: "/member" },
  { label: "Laporan",     icon: UserRound, link: "/report" },
]