import { useState } from "react"

interface ProfileProps {
  image: string
  name: string
  job: string
}

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join("")

const ProfileView = ({ image, name, job }: ProfileProps) => {
  // fallback ke inisial kalau gambar gagal dimuat (offline / URL mati)
  const [failedSrc, setFailedSrc] = useState<string | null>(null)
  const showImage = !!image && failedSrc !== image

  return (
    <div className="flex w-full items-center gap-4 rounded-xl bg-soft-peach p-4">
      {showImage ? (
        <img
          src={image}
          alt={`Foto ${name}`}
          onError={() => setFailedSrc(image)}
          className="h-14 w-14 shrink-0 rounded-full border-2 border-white bg-white object-cover"
        />
      ) : (
        <div
          aria-hidden
          className="grid h-14 w-14 shrink-0 place-items-center rounded-full border-2 border-white bg-coral-glow text-lg font-bold text-white"
        >
          {initials(name)}
        </div>
      )}
      <div className="flex min-w-0 flex-col">
        <div className="truncate font-rubik text-xl font-bold text-stone-800">{name}</div>
        <div className="truncate font-sans text-sm font-semibold text-stone-500">{job}</div>
      </div>
    </div>
  )
}

export default ProfileView
