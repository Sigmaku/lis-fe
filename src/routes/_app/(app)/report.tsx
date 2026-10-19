import { createFileRoute } from '@tanstack/react-router'
import { ReportPage } from '../../../features/Report'

export const Route = createFileRoute('/_app/(app)/report')({
  component: ReportPage,
})
