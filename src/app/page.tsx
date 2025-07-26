'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type Picture = {
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
}

const Data: Picture[] = [
  {
    Image: "/Image/iphone-16-pink-128gb-back.jpg",
    alt: "iphone-16-pink",
    prix: 500000,
    description: "iphone-16-pink 128GB",
    category: "Électronique",
    stock: 50,
    rating: {
      rate: 4.5,
      count: 120
    }
  },
  {
    Image: "/Image/talon-femme.jpeg",
    alt: "Chaussure Femme",
    prix: 10000,
    description: "Taille 39-43",
    category: "Chaussures",
    stock: 70,
    rating: {
      rate: 5,
      count: 100
    }
  },
  {
    Image: "/Image/jewelry.jpg",
    alt: "Collier en or",
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
    Image: "/Image/Rolex for men.jpg",
    alt: "Montre Rolex pour homme",
    prix: 100000,
    description: "Rolex homme en acier inoxydable",
    category: "Montres",
    stock: 30,
    rating: {
      rate: 5,
      count: 80
    }
  },
  {
    Image: "/Image/lacoste.webp",
    alt: "Lacoste T-shirt",
    prix: 5000,
    description: "T-shirt Lacoste en coton bio",
    category: "Vêtements",
    stock: 250,
    rating: {
      rate: 4.5,
      count: 170
    }
  },
  {
    Image: "/Image/clim.jpg",
    alt: "Climatiseur",
    prix: 90000,
    description: "Climatiseur 12000 BTU",
    category: "Électroménager",
    stock: 20,
    rating: {
      rate: 4.5,
      count: 120
    }
  },
  {
    Image: "/Image/black-bag-with-scarf.jpg",
    alt: "Sac à main avec écharpe",
    prix: 15000,
    description: "Sac à main élégant en cuir",
    category: "Accessoires",
    stock: 45,
    rating: {
      rate: 5,
      count: 100
    }
  },
  {
    Image: "/Image/view-3d-school-backpack.jpg",
    alt: "Sac à dos scolaire",
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
    Image: "/Image/Macbook pro 14.jpeg",
    alt: "Macbook Pro 14",
    prix: 290000,
    description: "Macbook Pro 14 pouces avec M1 Pro",
    category: "Electronique",
    stock: 10,
    rating: {
      rate: 5,
      count: 80
    }
  },
  {
    Image: "/Image/stove.jpg",
    alt: "Cuisinière à gaz",
    prix: 80000,
    description: "Cuisinière à gaz 4 feux",
    category: "Électroménager",
    stock: 150,
    rating: {
      rate: 4.5,
      count: 170
    }
  },
  {
    Image: "/Image/Pink-dress.jpeg",
    alt: "Robe Enfant",
    prix: 6000,
    description: "Robe pour fille en coton",
    category: "Vêtements",
    stock: 200,
    rating: {
      rate: 4.5,
      count: 150
    }
  },
  {
    Image: "/Image/PAW-PATROL-T-Shirt-Girl-Children.webp",
    alt: "T-shirt Enfant",
    prix: 3000,
    description: "T-shirt enfant avec motif Paw Patrol",
    category: "Vêtements",
    stock: 100,
    rating: {
      rate: 5,
      count: 200
    }
  }
]
const Page = () => {
  const [recherche, setRecherche] = useState('')

  const produitsFiltres = Data.filter((item) =>
    item.alt.toLowerCase().includes(recherche.toLowerCase())
  )

  
const images = [
  {
    src: '/Image/12133.jpg',
    texte: 'Livraison Rapide et Sécurisée',
    paragraphe: 'Profitez de notre service de livraison rapide et sécurisée pour recevoir vos produits en un temps record.',
  },
  {
    src: '/Image/6876539.jpg',
    texte: 'Service Client Réactif',
    paragraphe: 'Notre équipe est à votre écoute pour répondre à toutes vos questions et vous accompagner dans vos achats.',
  },
  {
    src: '/Image/9727570.jpg',
    texte: 'Produits de Qualité',
    paragraphe: 'Découvrez une sélection de produits de haute qualité, soigneusement choisis pour vous.',
  },
]

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [images.length])

  return (
     <>
    {/* Barre de recherche responsive */}
<div className="mb-6 relative w-full max-w-md mx-auto px-4 sm:px-0">
  <input
    type="text"
    placeholder="Rechercher un produit..."
    value={recherche}
    onChange={(e) => setRecherche(e.target.value)}
    className="px-4 py-2 w-full rounded-xl border border-blue-200 bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
  />
  <i className="ri-search-line absolute top-2.5 right-6 text-gray-400"></i>

  {/* Résultats filtrés */}
  {recherche && (
    <ul className="absolute top-12 left-0 w-full bg-white border border-gray-300 shadow-md rounded-md z-10 max-h-60 overflow-y-auto">
      {produitsFiltres.length > 0 ? (
        produitsFiltres.map((item, index) => (
          <li key={index} className="px-4 py-2 hover:bg-blue-100 text-sm cursor-pointer">
            <Link href="/boutique">{item.alt}</Link>
          </li>
        ))
      ) : (
        <li className="px-4 py-2 text-gray-500 text-sm">Aucun résultat</li>
      )}
    </ul>
  )}
</div>

{/* Section principale avec 2 images + texte central */}
<div className="w-full bg-gray-200 flex flex-col md:flex-row justify-between items-center px-4 py-8 gap-6">
  {/* Image gauche */}
  <div className="w-full md:w-1/3 h-64 md:h-96">
    <Image
      src="/Image/10613770.jpg"
      alt="Image gauche"
      width={800}
      height={800}
      className="w-full h-full object-cover rounded-lg shadow-lg"
    />
  </div>

  {/* Texte central */}
  <div className="w-full md:w-1/3 flex flex-col justify-center items-center text-center h-auto md:h-96">
    <h1 className="text-xl md:text-2xl font-semibold">
      Bienvenue dans <span className="font-bold text-blue-800">Shop Time</span>, votre boutique de marque en ligne.
    </h1>
    <p className="mt-4 text-black px-2 text-sm md:text-base">
      Shop Time vous propose des articles tendance, un service client réactif,
      et une expérience d’achat simple et sécurisée. Faites votre shopping en toute confiance, où que vous soyez.
    </p>
    <button className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">
      <Link href="/boutique">Commencer à magasiner</Link>
    </button>
  </div>

  {/* Image droite */}
  <div className="w-full md:w-1/3 h-64 md:h-96">
    <Image
      src="/Image/smiley-woman-clothing-store.jpg"
      alt="Image droite"
      width={800}
      height={800}
      className="w-full h-full object-cover rounded-lg shadow-lg"
    />
  </div>
</div>

   {/* Icônes scrollables sur mobile */}
<div className="w-full h-auto bg-gray-100 p-2 mt-4 flex justify-start md:justify-center items-center gap-4 overflow-x-auto scrollbar-hide">
  {[
    "/Image/smartphone_3437364.png",
    "/Image/weather_15423509.png",
    "/Image/headphone_11547750.png",
    "/Image/shirt_1440578.png",
    "/Image/shopping_16402869.png",
    "/Image/shoes_7745933.png",
    "/Image/necklace_9315890.png",
    "/Image/freezer_6086360.png",
    "/Image/fan_17909978.png",
    "/Image/cap_18184405.png",
  ].map((src, i) => (
    <div key={i} className="relative min-w-[40px] w-10 h-10 rounded-full overflow-hidden shadow-lg flex-shrink-0">
      <Image src={src} alt={`Icon ${i}`} fill className="object-cover" />
    </div>
  ))}
</div>
<div className="w-full bg-gray-200 flex flex-col lg:flex-row justify-between items-start mt-4 gap-5 p-4">
  <div className="relative w-full lg:w-1/2 h-96 flex items-center justify-center text-center">
    <Image
      src="/Image/portrait-handsome-male.jpg"
      alt="Image"
      width={800}
      height={800}
      className="w-full h-full object-cover rounded-lg shadow-lg"
    />
     <div className="absolute right-6 mr-4 w-72 rounded-2xl shadow-xl p-6">
      <h2 className="text-2xl font-bold text-blue-900 mb-2">Collection Automne-Hiver</h2>
      <p className="text-gray-700 mb-2">
        Découvrez notre nouvelle collection automne-hiver avec des vêtements tendance et confortables
        pour vous garder au chaud.
      </p>
      <p className="text-gray-700 mb-4">Profitez de nos offres exclusives et commencez votre shopping dès maintenant !</p>
    </div>
  </div>

  <div className="w-full lg:w-1/2 flex flex-col gap-4">
    <div className="flex flex-col sm:flex-row gap-4">
      <div className="w-full sm:w-1/2 h-48">
      <Image
      src="/Image/sunglasses.jpg"
      alt="Image"
      width={600}
      height={600}
      className="w-full h-full object-cover rounded-lg shadow-lg"
    />
      </div>
      <div className="relative w-full sm:w-1/2 h-48">
      <Image
      src="/Image/rendering-smart-home-device.jpg"
      alt="Image"
      width={600}
      height={600}
      className="w-full h-full object-cover rounded-lg shadow-lg"
    />
      </div>
    </div>
    <div className="w-full h-44">
      <Image
      src="/Image/portrait-woman.jpg"
      alt="Image"
      width={600}
      height={600}
      className="w-full h-full object-cover rounded-lg shadow-lg"
    />
    </div>
  </div>
</div>
<h2 className="text-center text-2xl font-bold text-blue-800 mt-6">
  Découvrez nos produits les plus populaires 🔥
</h2>
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 p-4">
  {Data.map((item, index) => (
    <div
      key={index}
      className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-lg transition duration-300 overflow-hidden"
    >
      {/* Image du produit */}
      <div className="w-full h-48 relative bg-white">
        <Image
          src={item.Image}
          alt={item.alt}
          fill
          className="object-contain p-2"
        />
      </div>

      {/* Contenu texte */}
      <div className="p-3 text-center w-full">
        <h3 className="text-base sm:text-lg font-semibold">{item.alt}</h3>
        <p className="text-sm text-green-700 font-medium mt-1">{item.prix.toLocaleString()} CFA</p>

        {/* Étoiles + avis */}
        {item.rating && (
          <div className="flex justify-center items-center mt-1 text-sm text-yellow-500 gap-1">
            {Array.from({ length: Math.floor(item.rating.rate) }, (_, i) => (
              <i key={i} className="ri-star-fill"></i>
            ))}
            <span className="text-gray-500 ml-1">({item.rating.count})</span>
          </div>
        )}

        {/* Description */}
        <p className="text-xs text-gray-500 mt-2 line-clamp-2">{item.description}</p>
      </div>
    </div>
  ))}
</div>

    <h2 className="text-center text-2xl font-bold text-blue-800 mt-6">
  Découvrez qui nous sommes et ce que nous faisons ou comment nous contacter📱 
    </h2>
    <div className="w-full h-auto bg-gray-700 p-4 mt-4 flex flex-col lg:flex-row gap-6 lg:gap-16 justify-center items-center">
  {/* Bloc À propos */}
  <div className="relative w-full lg:w-1/2 h-96">
    <Image
      src="/Image/portrait-man-wondering.jpg"
      alt="Image"
      width={800}
      height={800}
      className="w-full h-full object-cover rounded-lg shadow-lg"
    />
    <div className="absolute bottom-4 left-4 w-[90%] sm:w-80 bg-transparent rounded-2xl p-2 sm:p-6 shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">À propos de nous</h2>
      <p className="text-sm sm:text-base text-white mb-4">
        Chez <span className="font-semibold text-blue-800">Shop Time</span>, nous nous engageons à vous offrir une expérience d&apos;achat exceptionnelle.
        Qualité, fiabilité et satisfaction sont au cœur de notre mission.
      </p>
      <Link
        href="/about"
        className="inline-block px-4 py-2 text-sm rounded-xl border-2 border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white transition duration-300"
      >
        Plus sur nous
      </Link>
    </div>
  </div>

  {/* Bloc Contact */}
  <div className="relative w-full lg:w-1/2 h-96">
    <Image
      src="/Image/pensive-woman.jpg"
      alt="Image"
      width={800}
      height={800}
      className="w-full h-full object-cover rounded-lg shadow-lg"
    />
    <div className="absolute bottom-4 right-4 w-[90%] sm:w-80 bg-transparent rounded-2xl p-4 sm:p-6 shadow-md">
      <h2 className="text-xl sm:text-2xl font-bold text-blue-900 mb-2">Contactez-nous</h2>
      <p className="text-sm sm:text-base text-gray-800 mb-4">
        Une question, une suggestion ou besoin d’aide ? Notre équipe est à votre écoute.
        N’hésitez pas à nous écrire, nous vous répondrons dans les plus brefs délais.
      </p>
      <Link
        href="/contact"
        className="inline-block px-4 py-2 text-sm rounded-xl border-2 border-blue-800 text-blue-800 hover:bg-blue-800 hover:text-white transition duration-300"
      >
        Nous contacter
      </Link>
    </div>
  </div>
</div>


<div className="w-full h-64 sm:h-80 md:h-96 lg:h-[32rem] relative overflow-hidden rounded-lg shadow-lg mt-6">
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-1000 ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          {/* Image plein écran */}
          <Image
            src={img.src}
            alt={`Image ${index + 1}`}
            fill
            className="object-cover"
          />

          {/* Texte centré */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
            <h2 className="text-white text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center px-4">
              {img.texte}
            </h2>
            <p className="text-white text-sm sm:text-base md:text-lg lg:text-xl text-center mt-2 px-4">
              {img.paragraphe}
            </p>
          </div>
        </div>
      ))}
    </div>
    </>
  )
}

export default Page
