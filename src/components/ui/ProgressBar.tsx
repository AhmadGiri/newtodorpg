interface Props {
  value: number
}

export default function ProgressBar({ value }: Props) {
  return (
    <div className="relative h-5 bg-zinc-900 rounded-full overflow-hidden">
  <div
    style={{
      width: `${value}%`,
    }}
    className="
      h-full
      bg-gradient-to-r
      from-cyan-500
      via-violet-500
      to-cyan-500
      transition-all
      duration-700
      shadow-[0_0_25px_rgba(139,92,246,0.8)]
    "
  />
</div>
  )
}