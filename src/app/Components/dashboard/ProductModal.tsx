"use client";

import { useState, useEffect } from "react";

export type ProductForm = {
  id?: number;
  alt: string;
  description: string;
  prix: number;
  stock: number;
  category: string;
  image: string; // URL Cloudinary
};

type ProductModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: ProductForm) => void;
  product?: ProductForm | null; // si présent = mode édition
};

export default function ProductModal({
  isOpen,
  onClose,
  onSave,
  product,
}: ProductModalProps) {
  const [form, setForm] = useState<ProductForm>({
    alt: "",
    description: "",
    prix: 0,
    stock: 0,
    category: "",
    image: "",
  });

  useEffect(() => {
    if (product) {
      setForm(product);
    } else {
      setForm({
        alt: "",
        description: "",
        prix: 0,
        stock: 0,
        category: "",
        image: "",
      });
    }
  }, [product]);

  if (!isOpen) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "prix" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "ml_default");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/daqiiskbs/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();
    if (result.secure_url) {
      setForm((prev) => ({ ...prev, image: result.secure_url }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">
          {product ? "Modifier un produit" : "Ajouter un produit"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="alt"
            value={form.alt}
            onChange={handleChange}
            placeholder="Nom du produit"
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            name="prix"
            value={form.prix}
            onChange={handleChange}
            placeholder="Prix"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="number"
            name="stock"
            value={form.stock}
            onChange={handleChange}
            placeholder="Stock"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="text"
            name="category"
            value={form.category}
            onChange={handleChange}
            placeholder="Catégorie"
            className="w-full border p-2 rounded"
            required
          />

          <div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="mb-2"
            />
            {form.image && (
              <img
                src={form.image}
                alt="preview"
                className="w-32 h-32 object-cover rounded"
              />
            )}
          </div>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-300"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              {product ? "Mettre à jour" : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
