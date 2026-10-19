import { createFileRoute } from '@tanstack/react-router'
import { MembersPage } from '../../../features/Members'

export const Route = createFileRoute('/_app/(app)/member')({
  component: MembersPage,
})
