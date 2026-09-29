import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/(app)/report')({
  component: () => {
    return (
      <div></div>
    )
  }
})

