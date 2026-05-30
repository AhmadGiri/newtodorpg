const items = [
  {
    name: 'Mana Potion',
    rarity: 'Common',
  },
  {
    name: 'Shadow Blade',
    rarity: 'Epic',
  },
  {
    name: 'Hunter Badge',
    rarity: 'Rare',
  },
  {
    name: 'Ancient Scroll',
    rarity: 'Legendary',
  },
]

export default function InventoryPage() {
  return (
    <section>
      <h1 className="font-orbitron text-4xl mb-6">
        Inventory
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
        {items.map((item) => (
          <div
            key={item.name}
            className="glass rounded-2xl p-5 border border-zinc-800 hover:border-violet-500 hover:scale-105 transition-all"
          >
            <div className="h-24 rounded-xl bg-zinc-900 mb-4" />

            <h3>{item.name}</h3>

            <p className="text-zinc-400">
              {item.rarity}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}