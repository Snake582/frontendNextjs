'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function Profile() {
  const router = useRouter()
  const [user, setUser] = useState<{
    firstName: string
    name: string
    email: string
  } | null>(null)
  const [message, setMessage] = useState('')

useEffect(() => {
  const token = localStorage.getItem('token')

  if (!token) {
    router.push('/connexion')
    return
  }

  fetch('http://localhost:3000/users/me', {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => {
      if (res.status === 401) {
        localStorage.removeItem('token')
        router.push('/connexion')
        return null
      }
      return res.json()
    })
    .then(data => {
      if (data?.email) {
        setUser(data)
      } else {
        setMessage("Erreur lors de la récupération")
      }
    })
    .catch(() => setMessage("Erreur serveur"))
}, [router])
  if (!user) {
    return <div className="p-6">Chargement...</div>
  }
  if (message) {
    return <div className="p-6 text-red-600">{message}</div>
  }
  // Fonction pour gérer la déconnexion
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/connexion')
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profil</h1>
      {message && <p>{message}</p>}
      {user && (
        <>
          <p className="mb-4">
            Bienvenue, <span className="font-semibold">{user.firstName || user.name || user.email}</span> !
          </p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Déconnexion
          </button>
        </>
      )}
    </div>
  )
}
