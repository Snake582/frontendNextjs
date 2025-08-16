'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

type ConnectedUser = {
  id: number
  prenom: string
  nom: string
  email: string
  role: string
}

const Navbar = () => {
  const [menuOuvert, setMenuOuvert] = useState(false)
  const [connectedUser, setConnectedUser] = useState<ConnectedUser | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const user = localStorage.getItem('user')
        if (user) {
         try {
          const parsedUser = JSON.parse(user) as ConnectedUser
          setConnectedUser(parsedUser)
        } catch (error) {
        console.error("Erreur lors du parsing JSON:", error)
  }
}

    }
  }, [])

  return (
    <>
      {/* Top Bar */}
      <div className="bg-blue-800 text-white text-sm px-4 py-2 flex flex-wrap justify-between items-center">
        <div className="flex gap-4 items-center border-r-2 border-blue-200 pr-4">
          <p>📧 shoptime@gmail.com</p>
          <p>📱 70 606 32 17</p>
        </div>
        <div className="flex gap-3 items-center mt-2 sm:mt-0">
          <p className="mr-2">Suivez-nous :</p>
          <Link href="#"><i className="ri-facebook-circle-fill hover:text-blue-300"></i></Link>
          <Link href="#"><i className="ri-instagram-fill hover:text-pink-400"></i></Link>
          <Link href="#"><i className="ri-twitter-fill hover:text-blue-400"></i></Link>
          <Link href="#"><i className="ri-whatsapp-fill hover:text-green-400"></i></Link>
        </div>
      </div>

      {/* Navbar */}
      <nav className="bg-blue-100 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          {/* Logo */}
          <div className="text-xl font-bold text-black">Shop Time</div>

          {/* Hamburger (mobile) */}
          <button
            className="md:hidden text-3xl text-blue-800 focus:outline-none"
            onClick={() => setMenuOuvert(!menuOuvert)}
          >
            <i className={menuOuvert ? 'ri-close-line' : 'ri-menu-line'}></i>
          </button>

          {/* Liens + Connexion (desktop) */}
          <div className="hidden md:flex items-center gap-8">
            <ul className="flex gap-4 items-center">
              <li><Link href="/" className="text-black font-semibold hover:text-blue-500">Home</Link></li>
              <li><Link href="/boutique" className="text-black font-semibold hover:text-blue-500">Boutique</Link></li>
              <li><Link href="/contact" className="text-black font-semibold hover:text-blue-500">Contact</Link></li>
              <li><Link href="/about" className="text-black font-semibold hover:text-blue-500">À propos</Link></li>
            </ul>
            {connectedUser ? (
              <Link href="/profil" className="text-black font-semibold flex items-center gap-1">
                {connectedUser.prenom} <i className="ri-user-fill hover:text-blue-500 text-2xl"></i>
              </Link>
            ) : (
              <Link href="/connexion" className="text-black font-semibold flex items-center gap-1">
                Se Connecter <i className="ri-user-fill hover:text-blue-500 text-2xl"></i>
              </Link>
            )}
          </div>
        </div>

        {/* Menu mobile */}
        {menuOuvert && (
          <div className="md:hidden px-4 pb-4 space-y-3 bg-blue-50">
            <ul className="flex flex-col gap-2">
              <li><Link href="/" className="text-black font-medium hover:text-blue-500">Home</Link></li>
              <li><Link href="/boutique" className="text-black font-medium hover:text-blue-500">Boutique</Link></li>
              <li><Link href="/contact" className="text-black font-medium hover:text-blue-500">Contact</Link></li>
              <li><Link href="/about" className="text-black font-medium hover:text-blue-500">À propos</Link></li>
            </ul>
            {connectedUser ? (
              <Link href="/profil" className="text-black font-semibold flex items-center gap-1">
                {connectedUser.prenom} <i className="ri-user-fill hover:text-blue-500 text-2xl"></i>
              </Link>
            ) : (
              <Link href="/connexion" className="text-black font-semibold flex items-center gap-1">
                Se Connecter <i className="ri-user-fill hover:text-blue-500 text-2xl"></i>
              </Link>
            )}
          </div>
        )}
      </nav>
    </>
  )
}

export default Navbar
