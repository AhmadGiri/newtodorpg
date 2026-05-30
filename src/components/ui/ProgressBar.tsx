interface Props {
  value: number
}

export default function ProgressBar({ value }: Props) {
  return (
    <div className="w-full h-4 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
      <div
        className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-700"
        style={{ width: `${value}%` }}
      />
    </div>
  )
}