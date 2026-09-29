import { BookOpenText } from "lucide-react"

const HeaderBar = () => {
  return (
    <div className="w-full h-41 bg-soft-peach">
        <div className="flex flex-row w-full h-16 items-center shadow-lg justify-between bg-soft-peach px-12">
            <div className="flex flex-row items-center gap-4 text-white font-rubik">
                <BookOpenText size={30} className=""/>
                <div className="text-2xl ">|</div>
                <div className=" text-2xl font-semibold">Library Information Sistem</div>
            </div>
        </div>
    </div>
  )
}

export default HeaderBar