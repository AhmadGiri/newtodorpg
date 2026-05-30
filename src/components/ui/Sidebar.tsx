import {
  LayoutDashboard,
  ScrollText,
  Trophy,
  Backpack,
  BarChart3,
  Settings,
} from 'lucide-react'

const menus = [
  { name: 'Dashboard', icon: LayoutDashboard },
  { name: 'Quests', icon: ScrollText },
  { name: 'Achievements', icon: Trophy },
  { name: 'Inventory', icon: Backpack },
  { name: 'Stats', icon: BarChart3 },
  { name: 'Settings', icon: Settings },
]

export default function Sidebar() {
  return (
    <aside className="glass hidden md:flex flex-col w-72 p-6 border-r border-zinc-800 min-h-screen">
      <h1 className="font-orbitron text-3xl font-black bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent mb-10">
        TODO RPG
      </h1>

      <nav className="space-y-3">
        {menus.map((menu) => {
          const Icon = menu.icon

          return (
            <button
              key={menu.name}
              className="flex items-center gap-3 w-full rounded-2xl border border-zinc-800 px-4 py-4 text-zinc-300 transition-all duration-300 hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white"
            >
              <Icon size={20} />
              {menu.name}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}