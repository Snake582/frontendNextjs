'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'

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
  quantity?: number
  couleur: string
  alt: string
  prix: number
}

const Data: Picture[] = [
  {
    id: 1,
    Image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138151/iphone-16-pink-128gb-back_mzatea.jpg",
    alt: "iphone-16",
    prix: 500000,
    imagesSecondaires: [
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138106/apple_iphone_16_verde_04_ad_l_gihzz1.jpg",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138152/iphone-16-white-128gb-back_3_y58zug.jpg",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138147/iphone-16-black-128gb-back_lx2dik.jpg",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138151/iphone-16-pink-128gb-back_mzatea.jpg",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138142/iphone-16_ultramarine_yx2bg3.jpg",
    ],
    description: "iphone-16-128GB",
    category: "Électronique",
    stock: 50,
    rating: { rate: 4.5, count: 120 }
  },
  {
    id: 2,
    Image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138225/talon-femme_gkakwx.jpg",
    alt: "Chaussure Femme",
    prix: 10000,
     imagesSecondaires: [
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138223/talon-femme-side_blhxzs.webp",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138225/talon-femme-white_nmygjm.jpg",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138222/talon-femme-left_i4xuty.webp",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138225/talon-femme_gkakwx.jpg",
    ],
    description: "Taille 39-43",
    category: "Chaussures",
    stock: 70,
    rating: { rate: 5, count: 100 }
  },
  {
    id: 3,
    Image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138165/jewelry_chpaf2.jpg",
    alt: "Collier en or",
    imagesSecondaires: [
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138153/jewelry-2_f8sqvu.jpg",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138153/jewelry-4_ne17w9.jpg",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138165/jewelry_chpaf2.jpg",
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
    Image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138194/Rolex_for_men_qckd59.jpg",
    alt: "Montre Rolex pour homme",
    prix: 100000,
    imagesSecondaires: [
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138185/Rolex_for_men-2_udywtz.jpg",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138189/Rolex_for_men-3_o3ba2l.jpg",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138189/Rolex_for_men-4_aqmwc7.webp",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138194/Rolex_for_men_qckd59.jpg",
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
    Image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138167/lacoste_avgkfi.webp",
    alt: "Lacoste T-shirt",
    prix: 5000,
    imagesSecondaires: [
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138164/lacoste-2_fc7ag8.avif",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138159/lacoste-3_y8exz4.webp",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138165/lacoste-4_wao5ab.webp",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138165/lacoste-5_bo5zlf.webp",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138167/lacoste_avgkfi.webp",
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
    Image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138152/clim_f4ajws.jpg",
    alt: "Climatiseur",
    prix: 90000,
    imagesSecondaires: [
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138168/clim-2_wgtb7u.jpg",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138152/clim_f4ajws.jpg"
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
    Image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138151/black-bag-with-scarf_narfrc.jpg",
    alt: "Sac à main avec écharpe",
    prix: 15000,
     imagesSecondaires: [
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138245/white-bag-with-scarf_lszmht.jpg",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138175/red-bag-with-scarf_mtjpea.avif",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138172/pink-bag-with-scarf_s3koad.webp",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138151/black-bag-with-scarf_narfrc.jpg",
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
    Image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138240/view-3d-school-backpack_wvt5e4.jpg",
    alt: "Sac à dos scolaire",
    imagesSecondaires: [
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138227/view-3d-school-backpack-marron_cv9swh.avif",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138229/view-3d-school-backpack-yellow_meddfp.jpg",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138227/view-3d-school-backpack-marronpink_x6ymor.avif",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138240/view-3d-school-backpack_wvt5e4.jpg",
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
    Image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138174/Macbook_pro_14_x9adr4.jpg",
    alt: "Macbook Pro 14",
    prix: 290000,
    imagesSecondaires: [
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138167/Macbook_pro_14-2_q48n3k.jpg",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138168/Macbook_pro_14-white_xjhebr.webp",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138167/Macbook_pro_14-4_drm9vv.jpg",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138174/Macbook_pro_14_x9adr4.jpg",
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
    Image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138221/stove_vt0nfi.jpg",
    alt: "Cuisinière à gaz",
    prix: 80000,
    imagesSecondaires: [
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138192/stove-2_nyrcu1.jpg",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138195/stove-3_xilmqw.png",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138197/stove-4_npd66n.webp",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138221/stove_vt0nfi.jpg",
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
    Image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138174/Pink-dress_xc4ouq.jpg",
    alt: "Robe Enfant",
    prix: 6000,
    imagesSecondaires: [
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138106/Blue-dress_xilevp.jpg",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138113/Floral-dress_qy2efg.jpg",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138246/White-dress_geuloh.jpg",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138174/Pink-dress_xc4ouq.jpg",
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
    Image: "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138171/PAW-PATROL-T-Shirt-Girl-Children_akjpxw.webp",
    alt: "T-shirt Enfant",
    prix: 3000,
    imagesSecondaires: [
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138173/p_patrol_ax22mb.jpg",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138169/p_gfhuzz.jpg",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138174/PAW-PATROL-T-Shirt-Children_fppinm.webp",
      "https://res.cloudinary.com/daqiiskbs/image/upload/v1756138171/PAW-PATROL-T-Shirt-Girl-Children_akjpxw.webp",
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
  const [isAdmin, setIsAdmin] = useState(false)

  const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]))
        setIsAdmin(payload.role === 'admin')
      } catch (err) {
        console.error("Erreur décodage token:", err)
        setIsAdmin(false)
      }
    }
  }, [])

    useEffect(() => {
    const token = localStorage.getItem('token')
    setIsConnected(!!token)

    const panierStorage = localStorage.getItem('panier')
    if (panierStorage) setPanier(JSON.parse(panierStorage))
  }, [])

  const ajouterAuPanier = (item: formData) => {
    setPanier((prev) => {
      const existe = prev.find((p) => p.produit.id === item.produit.id)
      if (existe) {
        return prev.map((p) =>
          p.produit.id === item.produit.id
            ? { ...p, quantity: (p.quantity ?? 1) + 1 }
            : p
        )
      }
      return [...prev, { ...item, quantity: 1 }]
    })
  }

  const supprimerDuPanier = (index: number) => {
    const nouveauPanier = [...panier];
    nouveauPanier.splice(index, 1);
    setPanier(nouveauPanier);
  };

  const supprimerPanier = () => {
    setPanier([]);
  }

  const total = panier.reduce(
  (acc, item) => acc + item.prix * (item.quantity ?? 1),
  0
)

  const produitsFiltres = Data.filter((produit) =>
    produit.alt?.toLowerCase().includes(recherche.toLowerCase())
  )

const validerPanier = async () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Utilisateur non connecté");
    }

    if (panier.length === 0) throw new Error("Panier vide");

    const total = panier.reduce(
      (acc, item) => acc + item.prix * (item.quantity ?? 1),
      0
    );

    const response = await fetch("http://localhost:3000/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        items: panier.map((item) => ({
          productId: item.produit.id,
          quantity: item.quantity ?? 1, // 👈 obligatoire
          price: item.prix,
          image: item.produit.Image,
        })),
        total, // 👈 obligatoire
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      console.error("Erreur backend:", err);
      throw new Error("Erreur lors de la commande");
    }

    alert("Commande validée avec succès !");
    setPanier([]);
    localStorage.removeItem("panier");
  } catch (error) {
    console.error("Erreur:", error);
    alert(error instanceof Error ? error.message : "Erreur inconnue");
  }
};

const ajouterProduit = async (produit: Picture) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3000/product', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
  alt: produit.alt,                  // string
  description: produit.description,  // string
  prix: Number(produit.prix),        // number
  stock: Number(produit.stock),      // number
  category: produit.category || '',  // string optionnel
  Image: produit.Image || '',        // string optionnel
  imagesSecondaires: produit.imagesSecondaires || [], // tableau optionnel
})

    });

    if (!response.ok) throw new Error("Erreur lors de l'ajout du produit");

    const data = await response.json();
    console.log("Produit ajouté:", data);
    alert("Produit ajouté avec succès !");
  } catch (error) {
    console.error("Erreur:", error);
    alert("Erreur lors de l'ajout du produit");
  }
};

useEffect(() => {
  const panierStorage = localStorage.getItem('panier');
  if (panierStorage) {
    setPanier(JSON.parse(panierStorage));
  }
}, []);

useEffect(() => {
  localStorage.setItem('panier', JSON.stringify(panier));
}, [panier]);


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
                        unoptimized
                        priority
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
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
                              unoptimized
                              priority
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
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

  {/* Bouton Ajouter au panier */}
  <button
    onClick={() =>
      ajouterAuPanier({
        produit,
        couleur: imagePrincipale,
        alt: produit.alt,
        prix: produit.prix,
      })
    }
    className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  >
    Ajouter au panier
  </button>

  {/* Bouton Ajouter au backend */}
  {isAdmin && (
    <div className="mt-2">
  <button
    onClick={() => ajouterProduit(produit)}
    className="mt-2 px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
  >
    Ajouter au backend
  </button>
  </div>)}
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
                <p className="text-sm text-gray-600">{item.prix.toLocaleString()} CFA x {item.quantity}</p>
              </div>
              <div className="flex items-center gap-2">
             <button
               onClick={() =>
               setPanier((prev) =>
               prev.map((p, i) =>
                 i === index
                  ? { ...p, quantity: Math.max((p.quantity ?? 1) - 1, 1) }
                  : p
              ))}
            className="px-1 py-1 bg-gray-200 rounded hover:bg-red-400">
        ➖</button>

            <span>{item.quantity}</span>

            <button
               onClick={() =>
               setPanier((prev) =>
               prev.map((p, i) =>
                 i === index
                  ? { ...p, quantity: (p.quantity ?? 1) + 1 }
                  : p
            ))}
           className="px-1 py-1 bg-gray-200 rounded hover:bg-green-400"> ➕
            </button>
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
