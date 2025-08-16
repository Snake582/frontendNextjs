'use client'

import Link from 'next/link'
import React, { useState } from 'react'

const Page = () => {
  const [form, setForm] = useState({
    firstName: '',
    name: '',
    email: '',
    number: '',
    password: '',
    role: 'user', // par défaut
  });
  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.access_token);
        setMessage('Inscription réussie !');
        // Redirige vers la page de connexion ou profil
        window.location.href = '/connexion';
      } else {
        setMessage(data.message || 'Erreur inscription');
      }
    } catch (err) {
      setMessage('Erreur serveur');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-white to-blue-200'>
      <div className="rounded-lg max-w-md w-full bg-white shadow-md">
        <p className="text-xl m-4 text-center">
          Veuillez vous inscrire pour ouvrir votre compte.
        </p>

        <form onSubmit={handleSubmit} className="rounded-lg p-6 max-w-md w-full border-x-8 border-indigo-500">
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">Prénom</label>
            <input name="firstName" onChange={handleChange} type="text" placeholder="Prénom" className="mt-1 px-4 py-2 w-full bg-blue-200 rounded-md shadow-inner" required />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">Nom</label>
            <input name="name" onChange={handleChange} type="text" placeholder="Nom" className="mt-1 px-4 py-2 w-full bg-blue-200 rounded-md shadow-inner" required />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input name="email" onChange={handleChange} type="email" placeholder="Email" className="mt-1 px-4 py-2 w-full bg-blue-200 rounded-md shadow-inner" required />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">Téléphone</label>
            <input name="number" onChange={handleChange} type="tel" placeholder="Téléphone" className="mt-1 px-4 py-2 w-full bg-blue-200 rounded-md shadow-inner" required />
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700">Mot de passe</label>
            <input name="password" onChange={handleChange} type="password" placeholder="Mot de passe" className="mt-1 px-4 py-2 w-full bg-blue-200 rounded-md shadow-inner" required />
          </div>

          <div className="mb-6">
            <label className="text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
            <input type="password" placeholder="Confirmer le mot de passe" className="mt-1 px-4 py-2 w-full bg-blue-200 rounded-md shadow-inner" required />
          </div>

          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
            S&apos;inscrire
          </button>
          {message && <p className="mt-2 text-red-500 text-center">{message}</p>}
        </form>
      </div>

      <p className="text-sm text-gray-600 mt-4">
        Vous avez déjà un compte ?{' '}
        <Link href="/connexion" className="text-blue-600 hover:underline">
          Connectez-vous ici
        </Link>
      </p>
    </div>
  )
}

export default Page
