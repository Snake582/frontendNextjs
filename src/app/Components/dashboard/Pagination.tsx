type Props = {
  current: number
  total: number
  onChange: (page: number) => void
}

export default function Pagination({ current, total, onChange }: Props) {
  if (total <= 1) return null

  return (
    <div className="flex justify-center items-center gap-2 mt-4">
      <button
        disabled={current === 1}
        onClick={() => onChange(current - 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        ◀ Précédent
      </button>
      <span>Page {current} / {total}</span>
      <button
        disabled={current === total}
        onClick={() => onChange(current + 1)}
        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
      >
        Suivant ▶
      </button>
    </div>
  )
}
