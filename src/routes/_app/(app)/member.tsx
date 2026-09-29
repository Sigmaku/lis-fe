import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/(app)/member')({
  component: () => {
    return (
        <div></div>
    )
  }
})

