import Link from "next/link"
import React from "react"

const page = () => {
  return (
    <>
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
        <h1 className="text-2xl font-semibold mb-4 underline">🛍️ À PROPOS DE <span className="text-3xl font-bold text-blue-500">SHOP TIME</span></h1>
        <p className="mt-4 text-lg">
            Bienvenue sur Shop Time, votre plateforme de commerce électronique moderne.
        </p>
        <p className="mt-2 text-md text-gray-900">
            Bienvenue sur Shop Time, votre plateforme de commerce électronique moderne, conçue pour rendre vos achats en ligne simples, rapides et agréables.
            </p>
        <p className="mt-2 text-md text-gray-900">
Chez Shop Time, nous croyons que chaque client mérite une expérience d’achat fluide et sécurisée. C’est pourquoi nous mettons à votre disposition une large sélection de produits de qualité, une interface intuitive, ainsi qu’un service client à l’écoute.
</p>
        <p className="mt-2 text-md text-gray-900">
            Notre équipe travaille sans relâche pour vous offrir les meilleures offres et les dernières tendances du marché. Que vous soyez à la recherche de vêtements, d’électronique, de maison ou de beauté, Shop Time est là pour répondre à tous vos besoins.
        </p>
        <p className="mt-2 text-md text-gray-900">
Notre mission est de vous offrir le meilleur du shopping en ligne, que ce soit pour des articles de mode, des accessoires, de l’électronique ou bien plus encore. Grâce à des technologies récentes et une navigation optimisée, nous vous permettons de trouver facilement ce que vous cherchez, tout en vous garantissant des paiements sécurisés et des livraisons fiables.
Rejoignez la communauté Shop Time et découvrez une nouvelle façon de faire vos achats en toute confiance.
        </p>
        
          <p className="mt-6 text-md text-gray-900">  
            Contactez-nous pour toute question ou suggestion. Nous sommes là pour vous aider à chaque étape de votre expérience d’achat.
          </p>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-3"><Link href="/contact">Contact</Link></button>
    </div>
    </>
  )
}

export default page
