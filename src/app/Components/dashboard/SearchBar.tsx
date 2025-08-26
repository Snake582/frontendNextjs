type Props = {
  value: string
  onChange: (val: string) => void
  placeholder?: string
}

export default function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <input
      type="text"
      placeholder={placeholder || "Rechercher..."}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="px-8 py-2 rounded-xl border border-blue-200 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4 w-full lg:w-1/3"
    />
  )
}
