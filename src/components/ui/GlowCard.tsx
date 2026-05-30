import type { ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export default function GlowCard({ children, className }: Props) {
  return (
    <div
      className={`glass rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02] hover:border-violet-500/50 hover:shadow-[0_0_40px_rgba(168,85,247,0.2)] ${className}`}
    >
      {children}
    </div>
  )
}