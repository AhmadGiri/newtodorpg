import {
  LayoutDashboard,
  ScrollText,
  Trophy,
  Backpack,
  BarChart3,
} from 'lucide-react'

import { NavLink } from 'react-router-dom'

export default function MobileNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 glass border-t border-zinc-800 flex justify-around p-3">
      <NavLink to="/">
        <LayoutDashboard />
      </NavLink>

      <NavLink to="/quests">
        <ScrollText />
      </NavLink>

      <NavLink to="/stats">
        <BarChart3 />
      </NavLink>
      
      <NavLink to="/achievements">
        <Trophy />
      </NavLink>

      <NavLink to="/inventory">
        <Backpack />
      </NavLink>
      <NavLink to="/settings">
        <Backpack />
      </NavLink>
    </div>
  )
}