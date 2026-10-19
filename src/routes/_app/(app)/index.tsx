import { createFileRoute } from '@tanstack/react-router'
import { BookPage } from '../../../features/Book'

export const Route = createFileRoute('/_app/(app)/')({
  component: BookPage,
})
