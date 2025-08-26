'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"

type OrderItem = {
  id: number
  product: { name: string }
  quantity: number
  price: number
}

type Order = {
  id: number
  user: { firstName: string; lastName: string }
  createdAt: string
  total: number
  status: string
  items: OrderItem[]
}

export default function OrderDetailPage() {
  const { id } = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrder() {
      try {
        const token = localStorage.getItem("token")
        if (!token) {
          alert("Non authentifié")
          router.push("/login") // redirige si pas de token
          return
        }

        const res = await fetch(`http://localhost:3000/order/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error("Commande introuvable")
        const data = await res.json()
        setOrder(data)
      } catch (error) {
        console.error(error)
        alert("Erreur lors du chargement de la commande")
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [id, router])

  if (loading) return <p>Chargement...</p>
  if (!order) return <p>Commande introuvable</p>

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Commande #{order.id}</h1>
        <Link
          href="/dashboard/order"
          className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
        >
          Retour à la liste
        </Link>
      </div>

      <div className="mb-4">
        <p><strong>Client :</strong> {order.user.firstName} {order.user.lastName}</p>
        <p><strong>Date :</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
        <p><strong>Total :</strong> {order.total} CFA</p>
        <p><strong>Statut :</strong> {order.status}</p>
      </div>

      <h2 className="mt-6 font-semibold">Produits :</h2>
      <ul className="mt-2 list-disc list-inside">
        {order.items?.length ? (
          order.items.map(item => (
            <li key={item.id}>
              {item.product.name} x {item.quantity} → {item.price} CFA
            </li>
          ))
        ) : (
          <li>Aucun produit</li>
        )}
      </ul>
    </div>
  )
}
