'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

type DashboardData = {
  orders: number
  revenue: number
  users: number
}

type Order = {
  id: number
  date: string
  total: number
  statut?: string
}

type User = {
  id: number
  firstName: string
  name: string
  email: string
}

type Product = {
  id: number
  name: string
  price: number
  imageSecondaire?: string[]
  actions?: string // placeholder for actions
}

export default function DashboardPage() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [orders, setOrder] = useState<Order[]>([])
  const [users, setUsers] = useState<User[]>([])
  const [products, setProduct] = useState<Product[]>([])

  const closeMenu = () => setOpen(false)

  // Vérifie l'authentification et récupère les stats globales
  const fetchDashboardStats = async () => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')

    if (!token || !userData) {
      setError('Non connecté')
      return router.push('/connexion')
    }

    const parsedUser = JSON.parse(userData)
    if (parsedUser.role !== 'admin') {
      setError('Accès interdit')
      return router.push('/')
    }

    try {
      const res = await fetch('http://localhost:3000/dashboard', {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) throw new Error('Erreur API')

      const data: DashboardData = await res.json()
      setDashboardData(data)
    } catch {
      setError('Erreur lors de la récupération des données')
    } finally {
      setLoading(false)
    }
  }

  // Récupère les listes (orders, users, products)
  const fetchLists = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setError('Non connecté')
      return router.push('/connexion')
    }
    try {
      const [ordersRes, usersRes, productsRes] = await Promise.all([
        fetch('http://localhost:3000/order', 
          { headers: { Authorization: `Bearer ${token}` } }
        ).then(res => res.json()),
        fetch('http://localhost:3000/users',
          { headers: { Authorization: `Bearer ${token}` } }
        ).then(res => res.json()),
        fetch('http://localhost:3000/product', 
          { headers: { Authorization: `Bearer ${token}` } }
        ).then(res => res.json()),
      ])

  setOrder(
    ordersRes
  )
      setUsers(usersRes)
      setProduct(productsRes)
    } catch (err) {
      console.error('Erreur lors du chargement des données', err)
    }
  }

  useEffect(() => {
    fetchDashboardStats()
    fetchLists()
    const interval = setInterval(fetchLists, 30000) // toutes les 30s
    return () => clearInterval(interval)
  }, [])

  if (loading) return <p className="text-center mt-10">Chargement...</p>
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>
  if (!dashboardData) return null

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Sidebar */}
      <aside className={`shadow-lg border-r ${open ? "w-60" : "w-14"} transition-all duration-300 lg:w-60 bg-white flex-shrink-0`}>
        {/* Burger Menu Mobile */}
        <div className="lg:hidden p-4 border-b flex justify-between items-center shadow-md">
          <h1 className="text-lg font-bold">Admin Dashboard</h1>
          <button onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
        </div>

        {/* Menu */}
        <div
          className={`lg:h-screen w-60 bg-white border-r shadow-md transform transition-transform duration-300 z-50 flex flex-col justify-between
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}
        >
          <div className={`flex-1 overflow-y-auto transition-all duration-300 ${open ? "opacity-100" : "opacity-0 hidden"} lg:opacity-100 lg:block`}>
            <h1 className="text-center text-2xl font-bold mt-6 mb-6">Admin Dashboard</h1>
            <ul className="space-y-4 px-4">
              <SidebarLink href="/commandes" onClick={closeMenu}>Commandes</SidebarLink>
              <SidebarLink href="/utilisateurs" onClick={closeMenu}>Utilisateurs</SidebarLink>
              <SidebarLink href="/produits" onClick={closeMenu}>Produits</SidebarLink>
            </ul>
          </div>
          <div className="flex items-center justify-center h-14 border-b lg:hidden">
            <button
              onClick={() => {
                localStorage.clear()
                router.push('/connexion')
                closeMenu()
              }}
              className="m-4 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Overlay mobile */}
        {open && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={closeMenu}></div>}
      </aside>

      {/* Main Content */}
      <main className="flex-1 max-w-full lg:max-w-6xl mx-auto mt-3 p-4 lg:p-6">
        {/* Statistiques */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          <StatCard title="Commandes" value={dashboardData.orders} color="blue" />
          <StatCard title="Revenus" value={`${dashboardData.revenue} CFA`} color="green" />
          <StatCard title="Utilisateurs" value={dashboardData.users} color="yellow" />
        </div>

        {/* Sections */}
        <Section title="Dernières commandes">
          <Table
            headers={['ID', 'Date', 'Total', 'Statut', 'Actions']}
            rows={orders.map(order => ({
              id: order.id,
              date: order.date,
              total: order.total,
              statut: order.statut ?? '',
              actions: 'view', // action placeholder
            }))}
          />
        </Section>
        <Section title="Derniers utilisateurs">
          <Table
            headers={['ID', 'FirstName', 'Name', 'Email']}
            rows={users.map(user => ({
              id: user.id,
              firstName: user.firstName,
              name: user.name,
              email: user.email,
            }))}
          />
        </Section>
        <Section title="Derniers produits">
          <Table
            headers={['ID', 'Nom', 'Prix']}
            rows={products.map(product => ({
              id: product.id,
              name: product.name,
              prix: product.price,
              imageSecondaire: product.imageSecondaire?.join(', ') || 'Aucune image secondaire',
              actions: 'view', // action placeholder
            }))}
          />
        </Section>
      </main>
    </div>
  )
}

function SidebarLink({ href, onClick, children }: { href: string; onClick?: () => void; children: React.ReactNode }) {
  return (
    <li>
      <Link href={href} className="block hover:text-blue-500 transition" onClick={onClick}>
        {children}
      </Link>
    </li>
  )
}

function StatCard({ title, value, color }: { title: string; value: string | number; color: string }) {
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

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-center">{title}</h2>
      {children}
    </div>
  )
}

function Table({ headers, rows }: { headers: string[]; rows: Array<Record<string, unknown>> }) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-2 text-left text-sm font-semibold">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows && rows.length > 0 ? (
            rows.map((row, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                {headers.map((header) => {
                  const key = header === 'FirstName' ? 'firstName'
                            : header === 'Nom' ? 'name'
                            : header.toLowerCase();
                  return (
                    <td key={header} className="px-4 py-2 text-sm">
                      {header === 'Actions' && row.actions
                        ? <button className="text-blue-500 hover:underline">Voir</button>
                        : String(row[key] ?? '')}
                    </td>
                  )
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={headers.length} className="border px-4 py-2 text-gray-500 text-center">
                Aucune donnée disponible
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
