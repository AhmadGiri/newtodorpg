import {
  LayoutDashboard,
  ScrollText,
  Trophy,
  Backpack,
  BarChart3,
  Settings,
} from 'lucide-react'

import { NavLink } from 'react-router-dom'

const menus = [
  { name: 'Dashboard', icon: LayoutDashboard, path: '/' },
  { name: 'Quests', icon: ScrollText, path: '/quests' },
  { name: 'Achievements', icon: Trophy, path: '/achievements' },
  { name: 'Inventory', icon: Backpack, path: '/inventory' },
  { name: 'Stats', icon: BarChart3, path: '/stats' },
  { name: 'Settings', icon: Settings, path: '/settings' },
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
            <NavLink
              key={menu.name}
              to={menu.path}
              className={({ isActive }) =>
                `flex items-center gap-3 w-full rounded-2xl border px-4 py-4 transition-all duration-300 ${
                  isActive
                    ? 'border-violet-500 bg-violet-500/20 text-white'
                    : 'border-zinc-800 text-zinc-300 hover:border-violet-500/40 hover:bg-violet-500/10'
                }`
              }
            >
              <Icon size={20} />
              {menu.name}
            </NavLink>
          )
        })}
      </nav>
    </aside>
  )
}