"use client"
import { useEffect, useState } from "react"
import Table from "@/app/Components/dashboard/Table"
import Link from "next/link"

type Order = {
  id: number
  customer: string
  date: string
  total: number
  status: "pending" | "paid" | "shipped" | "canceled"
}

type TableRow = {
  id: number
  client: string
  date: string
  total: string
  statut: string
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOrder() {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch("http://localhost:3000/order/all", {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) throw new Error("Erreur API")
        const data = await res.json()

        type ApiOrder = {
          id: number
          user?: { firstName?: string; lastName?: string }
          createdAt: string
          total: number
          status: string
        }

        const mappedOrders: Order[] = (data as ApiOrder[]).map((order) => ({
          id: order.id,
          customer: order.user
            ? `${order.user.firstName ?? ""} ${order.user.lastName ?? ""}`
            : "Inconnu",
          date: new Date(order.createdAt).toLocaleDateString(),
          total: order.total,
          status: order.status as Order["status"],
        }))

        setOrders(mappedOrders)
      } catch (error) {
        console.error("Erreur:", error)
        alert("Erreur lors du chargement des commandes")
      } finally {
        setLoading(false)
      }
    }

    fetchOrder()
  }, [])

  const handleDelete = async (row: TableRow) => {
    if (!confirm("Confirmer la suppression de cette commande ?")) return
    try {
      const token = localStorage.getItem("token")
      const res = await fetch(`http://localhost:3000/order/${row.id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      if (!res.ok) throw new Error("Erreur lors de la suppression")
      setOrders((prev) => prev.filter((o) => o.id !== row.id))
      alert("Commande supprimée")
    } catch (error) {
      console.error("Erreur:", error)
      alert("Erreur lors de la suppression")
    }
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Liste des Commandes</h1>

      {loading ? (
        <p>Chargement...</p>
      ) : orders.length === 0 ? (
        <p>Aucune commande trouvée.</p>
      ) : (
        <Table<TableRow>
  headers={["ID", "Client", "Date", "Total", "Statut", "Actions"]}
  rows={orders.map((o) => ({
    id: o.id,
    client: o.customer,
    date: o.date,
    total: `${o.total} CFA`,
    statut: o.status,
  }))}
  statusKey="statut"
  actions={(row) => (
    <div className="flex gap-2">
      <Link
        href={`/dashboard/order/${row.id}`}
        className="px-2 py-1 bg-blue-500 text-white rounded"
      >
        Voir
      </Link>
      <Link
        href={`/dashboard/order/edit/${row.id}`}
        className="px-2 py-1 bg-yellow-500 text-white rounded"
      >
        Modifier
      </Link>
      <button
        onClick={() => handleDelete(row)}
        className="px-2 py-1 bg-red-500 text-white rounded"
      >
        Supprimer
      </button>
    </div>
  )}
/>
      )}
    </div>
  )
}
