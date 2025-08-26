'use client'

import Pagination from '@/app/Components/dashboard/Pagination'
import SearchBar from '@/app/Components/dashboard/SearchBar'
import Sidebar from '@/app/Components/dashboard/sidebar'
import Table from '@/app/Components/dashboard/Table'
import { useEffect, useState } from 'react'

type User = {
  id: number
  firstName: string
  name: string
  email: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const perPage = 5

  // Fetch utilisateurs
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    fetch('http://localhost:3000/users', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setUsers)
      .catch(console.error)
  }, [])

  // Filtrage par recherche
  const filtered = users.filter(
    u =>
      u.firstName.toLowerCase().includes(search.toLowerCase()) ||
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  )

  // Pagination
  const paginated = filtered.slice((page - 1) * perPage, page * perPage)
  const totalPages = Math.ceil(filtered.length / perPage)

  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Utilisateurs</h1>

        <SearchBar
          value={search}
          onChange={(val) => {
            setSearch(val)
            setPage(1) // reset page lors de la recherche
          }}
          placeholder="Rechercher un utilisateur..."
        />

        <Table
          headers={['ID', 'FirstName', 'Name', 'Email']}
          rows={paginated.map(u => ({
            id: u.id,
            firstname: u.firstName,
            name: u.name,
            email: u.email,
          }))}
        />

        <Pagination
          current={page}
          total={totalPages}
          onChange={setPage}
        />
      </main>
    </div>
  )
}
