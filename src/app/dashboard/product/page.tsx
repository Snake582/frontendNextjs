"use client";
import { useState, useEffect } from "react";
import ProductModal, { ProductForm } from "@/app/Components/dashboard/ProductModal";

export type Product = ProductForm & {
  imagesSecondaires?: string[];
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>(undefined);

  const API_URL = "http://localhost:3000/product";

  const fetchProducts = async () => {
    setLoading(true);
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(API_URL, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Voulez-vous vraiment supprimer ce produit ?")) return;
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) setProducts(products.filter((p) => p.id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleSave = async (form: ProductForm) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const method = form.id ? "PUT" : "POST";
      const url = form.id ? `${API_URL}/${form.id}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        fetchProducts();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Gestion des Produits</h1>
      <button
        onClick={() => {
          setSelectedProduct(undefined);
          setModalOpen(true);
        }}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
      >
        + Nouveau produit
      </button>

      {loading ? (
        <p>Chargement...</p>
      ) : (
        <table className="w-full border border-gray-200 rounded-lg shadow-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Nom</th>
              <th className="p-3 border">Description</th>
              <th className="p-3 border">Prix</th>
              <th className="p-3 border">Stock</th>
              <th className="p-3 border">Catégorie</th>
              <th className="p-3 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p.id} className="text-center hover:bg-gray-50">
                <td className="p-2 border">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.alt}
                      className="w-16 h-16 object-cover mx-auto rounded-lg shadow"
                    />
                  ) : (
                    <span className="text-gray-400">Aucune</span>
                  )}
                </td>
                <td className="p-2 border font-medium">{p.alt}</td>
                <td className="p-2 border text-sm text-gray-600">{p.description}</td>
                <td className="p-2 border">{p.prix} CFA</td>
                <td className="p-2 border">{p.stock}</td>
                <td className="p-2 border">{p.category || "-"}</td>
                <td className="p-2 border">
                  <button
                    onClick={() => {
                      setSelectedProduct(p);
                      setModalOpen(true);
                    }}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-lg mr-2 shadow hover:bg-yellow-600 transition"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDelete(p.id!)}
                    className="bg-red-600 text-white px-3 py-1 rounded-lg shadow hover:bg-red-700 transition"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {modalOpen && (
        <ProductModal
          isOpen={modalOpen}
          product={selectedProduct}
          onClose={() => setModalOpen(false)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
