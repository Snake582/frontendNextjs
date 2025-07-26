'use client'

import Image from 'next/image'
import { useState } from 'react'

type Picture = {
  id: number
  Image: string
  alt: string
  prix: number
  description?: string
  category?: string
  stock?: number
  rating?: {
    rate: number
    count: number
  }
  imagesSecondaires?: string[]
}

interface formData {
  produit: Picture
  couleur: string
  alt: string
  prix: number
}

const Data: Picture[] = [
  {
    id: 1,
    Image: "/Image/iphone-16-pink-128gb-back.jpg",
    alt: "iphone-16",
    prix: 500000,
    imagesSecondaires: [
      "/Image/apple_iphone_16_verde_04_ad_l.jpg",
      "/Image/iphone-16-white-128gb-back_3.jpg",
      "/Image/iphone-16-black-128gb-back.jpg",
      "/Image/iphone-16-pink-128gb-back.jpg",
      "/Image/iphone-16 ultramarine.jpeg",
    ],
    description: "iphone-16-pink 128GB",
    category: "Électronique",
    stock: 50,
    rating: { rate: 4.5, count: 120 }
  },
  {
    id: 2,
    Image: "/Image/talon-femme.jpeg",
    alt: "Chaussure Femme",
    prix: 10000,
     imagesSecondaires: [
      "/Image/talon-femme-side.jpeg",
      "/Image/talon-femme-white.jpeg",
      "/Image/talon-femme-left.jpeg",
      "/Image/talon-femme.jpeg",
    ],
    description: "Taille 39-43",
    category: "Chaussures",
    stock: 70,
    rating: { rate: 5, count: 100 }
  },
  {
    id: 3,
    Image: "/Image/jewelry.jpg",
    alt: "Collier en or",
    imagesSecondaires: [
      "/Image/jewelry-2.jpg",
      "/Image/jewelry-4.jpg",
      "/Image/jewelry.jpg",
    ],
    prix: 90000,
    description: "Collier en or 18 carats",
    category: "Bijoux",
    stock: 50,
    rating: {
      rate: 4.5,
      count: 120
    }
  },
  {
    id: 4,
    Image: "/Image/Rolex for men.jpg",
    alt: "Montre Rolex pour homme",
    prix: 100000,
    imagesSecondaires: [
      "/Image/Rolex for men-2.jpg",
      "/Image/Rolex for men-3.jpg",
      "/Image/Rolex for men-4.jpg",
      "/Image/Rolex for men.jpg",
    ],
    description: "Rolex homme en acier inoxydable",
    category: "Montres",
    stock: 30,
    rating: {
      rate: 5,
      count: 80
    }
  },
  {
    id: 5,
    Image: "/Image/lacoste.webp",
    alt: "Lacoste T-shirt",
    prix: 5000,
    imagesSecondaires: [
      "/Image/lacoste-2.webp",
      "/Image/lacoste-3.webp",
      "/Image/lacoste-4.webp",
      "/Image/lacoste-5.webp",
      "/Image/lacoste.webp",
    ],
    description: "T-shirt Lacoste en coton bio",
    category: "Vêtements",
    stock: 250,
    rating: {
      rate: 4.5,
      count: 170
    }
  },
   {
    id: 6,
    Image: "/Image/clim.jpg",
    alt: "Climatiseur",
    prix: 90000,
    imagesSecondaires: [
      "/Image/clim-2.jpg",
      "/Image/clim.jpg"
    ],
    description: "Climatiseur 12000 BTU",
    category: "Électroménager",
    stock: 20,
    rating: {
      rate: 4.5,
      count: 120
    }
  },
  {
    id: 7,
    Image: "/Image/black-bag-with-scarf.jpg",
    alt: "Sac à main avec écharpe",
    prix: 15000,
     imagesSecondaires: [
      "/Image/white-bag-with-scarf.jpg",
      "/Image/red-bag-with-scarf.jpg",
      "/Image/pink-bag-with-scarf.jpg",
      "/Image/black-bag-with-scarf.jpg",
    ],
    description: "Sac à main élégant en cuir",
    category: "Accessoires",
    stock: 45,
    rating: {
      rate: 5,
      count: 100
    }
  },
  {
    id: 8,
    Image: "/Image/view-3d-school-backpack.jpg",
    alt: "Sac à dos scolaire",
    imagesSecondaires: [
      "/Image/view-3d-school-backpack-marron.jpg",
      "/Image/view-3d-school-backpack-yellow.jpg",
      "/Image/view-3d-school-backpack-marronpink.jpg",
      "/Image/view-3d-school-backpack.jpg",
    ],
    prix: 8000,
    description: "Sac à dos scolaire en tissu imperméable",
    category: "Sacs",
    stock: 28,
    rating: {
      rate: 4.5,
      count: 120
    }
  },
  {
    id: 9,
    Image: "/Image/Macbook pro 14.jpeg",
    alt: "Macbook Pro 14",
    prix: 290000,
    imagesSecondaires: [
      "/Image/Macbook pro 14-2.jpeg",
      "/Image/Macbook pro 14-white.jpeg",
      "/Image/Macbook pro 14-4.jpeg",
      "/Image/Macbook pro 14.jpeg",
    ],
    description: "Macbook Pro 14 pouces avec M1 Pro",
    category: "Électronique",
    stock: 10,
    rating: {
      rate: 5,
      count: 80
    }
  },
  {
    id: 10,
    Image: "/Image/stove.jpg",
    alt: "Cuisinière à gaz",
    prix: 80000,
    imagesSecondaires: [
      "/Image/stove-2.jpg",
      "/Image/stove-3.jpg",
      "/Image/stove-4.jpg",
      "/Image/stove.jpg",
    ],
    description: "Cuisinière à gaz 4 feux",
    category: "Électroménager",
    stock: 150,
    rating: {
      rate: 4.5,
      count: 170
    }
  },
  {
    id: 11,
    Image: "/Image/Pink-dress.jpeg",
    alt: "Robe Enfant",
    prix: 6000,
    imagesSecondaires: [
      "/Image/Blue-dress.jpeg",
      "/Image/Floral-dress.jpeg",
      "/Image/White-dress.jpeg",
      "/Image/Pink-dress.jpeg",
    ],
    description: "Robe pour fille en coton",
    category: "Vêtements",
    stock: 200,
    rating: {
      rate: 4.5,
      count: 150
    }
  },
  {
    id: 12,
    Image: "/Image/PAW-PATROL-T-Shirt-Girl-Children.webp",
    alt: "T-shirt Enfant",
    prix: 3000,
    imagesSecondaires: [
      "/Image/p patrol.jpg",
      "/Image/p.jpg",
      "/Image/PAW-PATROL-T-Shirt-Children.webp",
      "/Image/PAW-PATROL-T-Shirt-Girl-Children.webp",
    ],
    description: "T-shirt enfant avec motif Paw Patrol",
    category: "Vêtements",
    stock: 100,
    rating: {
      rate: 5,
      count: 200
    }
  },
]

export default function Boutique() {
  const [recherche, setRecherche] = useState('')
  const [panier, setPanier] = useState<formData[]>([])
  const [imagesPrincipales, setImagesPrincipales] = useState<{ [id: number]: string }>({})

  const ajouterAuPanier = (produit: formData,) => {
    console.log("Produit ajouté au panier:", produit)
    setPanier((prev) => [...prev, produit,])
  }

  const supprimerDuPanier = (index: number) => {
    const nouveauPanier = [...panier];
    nouveauPanier.splice(index, 1);
    setPanier(nouveauPanier);
  };

  const supprimerPanier = () => {
    setPanier([]);
    alert("Souhaitez-vous vraiment vider le panier ?");
  }

  const validerPanier = () => {
    setPanier([]);
    alert("Merci pour votre commande !");
  }

  const total = panier.reduce((acc, item) => acc + item.produit.prix, 0)

  const produitsFiltres = Data.filter((produit) =>
    produit.alt.toLowerCase().includes(recherche.toLowerCase())
  )

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-center mb-6">Bienvenue dans notre Boutique</h1>

      {/* 🔍 Barre de recherche */}
      <div className="mb-6">
        <input
          type="text"
          placeholder="Rechercher un produit..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="px-4 py-2 rounded-xl border border-blue-200 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Produits */}
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {produitsFiltres.length > 0 ? (
            produitsFiltres.map((produit) => {
              const imagePrincipale = imagesPrincipales[produit.id] || produit.Image

              return (
                <div key={produit.id} className="bg-white shadow-xl rounded-lg overflow-hidden p-2">
                  <div className="flex">
                    {/* Image principale */}
                    <div className="relative w-52 h-60">
                      <Image
                        src={imagePrincipale}
                        alt={produit.alt}
                        fill
                        className="object-contain"
                      />
                    </div>

                    {/* Miniatures */}
                    {produit.imagesSecondaires && (
                      <div className="flex flex-col justify-center ml-2 gap-2">
                        {produit.imagesSecondaires.map((img, i) => (
                          <div
                            key={i}
                            className="w-8 h-8 rounded-full overflow-hidden border-2 border-gray-300 hover:border-blue-500 cursor-pointer"
                            onClick={() =>
                              setImagesPrincipales((prev) => ({
                                ...prev,
                                [produit.id]: img,
                              }))
                            }
                          >
                            <Image
                              src={img}
                              alt={`Vue ${i}`}
                              width={42}
                              height={42}
                              className="object-cover w-full h-full"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

          <div className="p-4 space-y-2">
       <h2 className="text-xl font-semibold">{produit.alt}</h2>
         <p className="text-green-600 font-bold text-lg">{produit.prix.toLocaleString()} CFA</p>

         <p className="text-sm text-gray-700">
          <span className="font-semibold">Description:</span> {produit.description}
         </p>
         <p className="text-sm text-gray-700">
          <span className="font-semibold">Catégorie:</span> {produit.category}
         </p>
         <p className="text-sm text-gray-700">
           <span className="font-semibold">Stock:</span> {produit.stock}
         </p>
             <p className="text-sm text-gray-700">
               <span className="font-semibold">Avis:</span> {produit.rating?.rate} ⭐ ({produit.rating?.count} votes)
              </p>
              <button
                 onClick={() => 
                   ajouterAuPanier({
                   produit,
                   couleur: imagePrincipale,
                   alt: produit.alt,
                   prix: produit.prix,
                 }) 
                }
               className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Ajouter au panier
              </button>
              </div>
                </div>
              )
            })
          ) : (
            <p className="text-gray-500 col-span-full">Aucun produit trouvé.</p>
          )}
        </div>

        {/* Panier */}
        <div className="bg-blue-400 p-4 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">🧺 Mon Panier</h2>
      {panier.length === 0 ? (
        <p className="text-gray-500">Le panier est vide.</p>
      ) : (
        <ul className="space-y-2">
          {panier.map((item, index) => (
            <li key={index} className="flex justify-between items-center p-2">
              <div>
                <p className="font-medium">{item.alt}</p>
                <p className="text-sm text-gray-600">{item.prix} CFA</p>
              </div>
              <button
                onClick={() => supprimerDuPanier(index)}
                className="text-red-600 hover:text-red-800"
                title="Supprimer"
              >
                🗑️
              </button>
            </li>
          ))}
        </ul>
      )}
      <hr className="my-4" />
      <p className="font-bold">Total : {total} CFA</p>
      {panier.length > 0 && (
        <div className='mt-4'>
          <button
            className="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            onClick={() => validerPanier()}
            title="Valider la commande"
          >
            Valider la commande
          </button>
          <button 
            className="mt-2 w-full px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => supprimerPanier()}
            title="Vider le panier"
          >
            Vider le panier 
          </button>
        </div>
      )}
    </div>
      </div>
    </div>
  )
}
