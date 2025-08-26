import React from "react"

type TableProps<T> = {
  headers: string[]
  rows: T[]
  statusKey?: keyof T
  actions?: (row: T) => React.ReactNode
}

export default function Table<T extends { id: number }>({
  headers,
  rows,
  statusKey,
  actions,
}: TableProps<T>) {
  return (
    <table className="w-full border border-gray-300 rounded-lg">
      <thead className="bg-gray-100">
        <tr>
          {headers.map((h) => (
            <th
              key={h}
              className="border px-3 py-2 text-left text-gray-700 font-semibold"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.id} className="hover:bg-gray-50">
            {Object.entries(row).map(([key, val], idx) => (
              <td key={idx} className="border px-3 py-2">
                {String(val)}
              </td>
            ))}
            {actions && (
              <td className="border px-3 py-2">{actions(row)}</td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  )
}
