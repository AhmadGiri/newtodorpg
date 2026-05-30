interface Props {
  message: string
}

export default function Toast({ message }: Props) {
  return (
    <div className="fixed top-6 right-6 z-50 animate-bounce">
      <div className="glass rounded-2xl border border-emerald-500/40 px-5 py-3 shadow-[0_0_30px_rgba(16,185,129,0.4)]">
        <p className="font-semibold text-emerald-300">{message}</p>
      </div>
    </div>
  )
}