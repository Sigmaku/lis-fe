import MenuButton from "./MenuButton"
import { sidebarItems } from "../../lib/sidebarData"
import ProfileView from "./ProfileView"

const Sidebar = () => {
  return (

    <div className="px-10 py-28">

        <div className="flex flex-col gap-20 w-78.75 h-screen rounded-xl shadow-lg items-center bg-white px-10 py-12 ">

            <ProfileView image="sjdod" job="jaofo" name="aihfwe"/>

            <div className="flex flex-col w-full gap-1">
                {sidebarItems.map(({ label, icon: Icon, link }) => (
                    <MenuButton
                    key={link}
                    icon={<Icon size={20} />}
                    url={link}
                    label={label}
                    />
                ))}
            </div>
        </div>
    </div>
  )
}

export default Sidebar