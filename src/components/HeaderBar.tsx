import { BookOpenText } from "lucide-react"

const HeaderBar = () => {
  return (
    <div className="h-41 w-full bg-soft-peach">
      <div className="flex h-16 w-full flex-row items-center justify-between bg-soft-peach px-12 shadow-lg">
        <div className="flex flex-row items-center gap-4 font-rubik text-white">
          <BookOpenText size={30} />
          <div className="text-2xl">|</div>
          <div className="text-2xl font-semibold">Library Information System</div>
        </div>
      </div>
    </div>
  )
}

export default HeaderBar
