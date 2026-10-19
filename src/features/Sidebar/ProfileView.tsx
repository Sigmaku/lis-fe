interface ProfileProps {
  image: string
  name: string
  job: string
}

const ProfileView = ({image, name, job}: ProfileProps) => {
  return (
    <div className="bg-soft-peach w-full h-24 flex flex-row">
      <img src={image} alt="Profile Picture" />
      <div className="flex flex-col">
        <div className="text-4xl font-bold font-rubik">{name}</div>
        <div className="text-xl font-semibold text-gray-400 font-sans">{job}</div>
      </div>
    </div>
  )
}

export default ProfileView