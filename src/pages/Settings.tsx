type Props = {
  username: string
  setUsername: (v: string) => void
}

export default function SettingsPage({
  username,
  setUsername,
}: Props) {
  return (
    <section className="space-y-6">
      <h1 className="font-orbitron text-4xl">
        Settings
      </h1>

      <div className="glass rounded-2xl p-6">
        <label className="block mb-2">
          Hunter Name
        </label>

        <input
          value={username}
          onChange={(e) =>
            setUsername(e.target.value)
          }
          className="w-full rounded-xl bg-zinc-900 border border-zinc-800 p-3"
        />
      </div>
    </section>
  )
}