'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function Sidebar() {
  const router = useRouter()
  const [open, setOpen] = useState(false)

  const handleLogout = () => {
    localStorage.clear()
    router.push('/connexion')
  }

  return (
    <>
      {/* Sidebar */}
      <aside className={`shadow-lg border-r ${open ? "w-60" : "w-14"} transition-all duration-300 lg:w-60 bg-white flex-shrink-0`}>
        {/* Mobile toggle */}
        <div className="lg:hidden p-4 border-b flex justify-between items-center shadow-md">
          <h1 className="text-lg font-bold">Admin</h1>
          <button onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
        </div>

        {/* Links */}
        <div className={`lg:h-screen w-60 bg-white border-r shadow-md transform transition-transform duration-300 z-50 flex flex-col justify-between
          ${open ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
          <div className={`flex-1 overflow-y-auto transition-all duration-300 ${open ? "opacity-100" : "opacity-0 hidden"} lg:opacity-100 lg:block`}>
            <h1 className="text-center text-2xl font-bold mt-6 mb-6">Dashboard</h1>
            <ul className="space-y-4 px-4">
              <li><Link href="/dashboard">Accueil</Link></li>
              <li><Link href="/dashboard/order">Commandes</Link></li>
              <li><Link href="/dashboard/users">Utilisateurs</Link></li>
              <li><Link href="/dashboard/product">Produits</Link></li>
            </ul>
          </div>
          <div className="flex items-center justify-center h-14 border-b">
            <button
              onClick={handleLogout}
              className="m-4 bg-red-600 text-white py-2 w-full rounded hover:bg-red-700 transition"
            >
              Déconnexion
            </button>
          </div>
        </div>
        {open && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setOpen(false)} />}
      </aside>
    </>
  )
}
