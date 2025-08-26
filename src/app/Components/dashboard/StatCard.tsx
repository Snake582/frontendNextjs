type Props = { title: string; value: string | number; color: 'blue' | 'green' | 'yellow' }

export default function StatCard({ title, value, color }: Props) {
  const colors: Record<string, string> = {
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    yellow: 'bg-yellow-100',
  }
  return (
    <div className={`${colors[color]} p-4 rounded-lg text-center`}>
      <p className="text-lg font-semibold">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
