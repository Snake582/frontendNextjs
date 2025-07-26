import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <>
      <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-white to-blue-200'>
      <div className=" rounded-xl max-w-md w-full bg-white">
      <p className="text-xl m-2">
        Veuillez vous connecter pour accéder à votre compte.
      </p>
      <form className="shadow-md rounded-lg p-8 max-w-md w-full mt-3 border-x-8 border-indigo-500">
        <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">Email</label>
          <input type="email" placeholder='Email' className="mt-1 px-4 py-2 w-full bg-blue-200 rounded-md shadow-2xl" required />
        </div>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Mot de passe</label>
          <input type="password" placeholder='password' className="mt-1 px-4 py-2 w-full bg-blue-200 rounded-md shadow-2xl" required />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Se connecter</button>
      </form>
      </div>
        <p className="text-sm text-gray-600 mt-2">
            Pas encore de compte ? <Link href="/inscription" className="text-blue-600 hover:underline">Inscrivez-vous ici</Link>.
        </p>
      </div>
    </>
  )
}

export default page
