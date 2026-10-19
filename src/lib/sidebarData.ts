import { BookOpen, FileText, Users, type LucideIcon } from "lucide-react"
import type { LinkProps } from "@tanstack/react-router"

export interface SidebarData {
  label: string
  icon: LucideIcon
  link: LinkProps['to']
}

export const sidebarItems: SidebarData[] = [
  { label: "Data Buku",   icon: BookOpen,  link: "/" },
  { label: "Data Anggota", icon: Users,     link: "/member" },
  { label: "Laporan",     icon: FileText, link: "/report" },
]