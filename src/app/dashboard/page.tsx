'use client'

import { useEffect, useState } from 'react'
import Sidebar from '../Components/dashboard/sidebar'
import StatCard from '../Components/dashboard/StatCard'

type DashboardData = {
  orders: number
  revenue: number
  users: number
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardData | null>(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return

    fetch('http://localhost:3000/dashboard', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => res.json())
      .then(setStats)
      .catch(console.error)
  }, [])

  if (!stats) return <p className="text-center mt-10">Chargement...</p>

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <StatCard title="Commandes" value={stats.orders} color="blue" />
          <StatCard title="Revenus" value={`${stats.revenue} CFA`} color="green" />
          <StatCard title="Utilisateurs" value={stats.users} color="yellow" />
        </div>
      </main>
    </div>
  )
}
