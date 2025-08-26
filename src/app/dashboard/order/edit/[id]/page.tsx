"use client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"

type Order = {
  id: number
  status: string
}

const statuses = ["pending", "paid", "shipped", "canceled"]

export default function OrderEditPage() {
  const { id } = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<Order | null>(null)
  const [status, setStatus] = useState<string>("pending")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    async function fetchOrder() {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`http://localhost:3000/order/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!res.ok) throw new Error("Commande introuvable")
        const data = await res.json()
        setOrder(data)
        setStatus(data.status)
      } catch (error) {
        console.error(error)
        alert("Erreur lors du chargement de la commande")
      } finally {
        setLoading(false)
      }
    }
    fetchOrder()
  }, [id])

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`http://localhost:3000/order/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      })
      if (!res.ok) throw new Error("Erreur lors de la mise à jour")
      alert("Statut mis à jour")
      router.push("/dashboard/order")
    } catch (error) {
      console.error(error)
      alert("Erreur lors de la mise à jour")
    }
  }

  if (loading) return <p>Chargement...</p>
  if (!order) return <p>Commande introuvable</p>

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Modifier le statut de la commande #{order.id}</h1>

      <label className="block mb-2 font-semibold">Statut :</label>
      <select
        className="border px-2 py-1"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        {statuses.map(s => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <button
        onClick={handleSubmit}
        className="ml-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Enregistrer
      </button>
    </div>
  )
}
