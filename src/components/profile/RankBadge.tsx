type Props = {
  rank: string
}

export default function RankBadge({
  rank,
}: Props) {
  return (
    <div className="inline-flex px-4 py-2 rounded-full bg-violet-500/20 border border-violet-500 text-violet-300 font-bold">
      {rank}
    </div>
  )
}