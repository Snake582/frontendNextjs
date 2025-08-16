'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link';

const Page = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data);

   if (res.ok) {
  localStorage.setItem('token', data.access_token);
  localStorage.setItem('user', JSON.stringify(data.user));
  setMessage('Connexion réussie !');

  if (data.user.role === 'admin') {
    router.push('/dashboard'); 
  } else {
    router.push('/');
  }
} else {
  setMessage(data.message || 'Email ou mot de passe incorrect');
}

    } catch (err) {
      setMessage('Erreur serveur');
    }
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-white to-blue-200'>
      <div className="rounded-lg max-w-md w-full bg-white shadow-md p-6">
        <h2 className="text-xl font-bold mb-4 text-center">Connexion</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 bg-blue-100 rounded shadow-inner"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Mot de passe</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              className="mt-1 w-full px-4 py-2 bg-blue-100 rounded shadow-inner"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Se connecter
          </button>

          {message && (
            <p className="text-center text-green-700 mt-2">{message}</p>
          )}
        </form>
      </div>
      <p className="mt-4 text-sm text-gray-600">
        Pas encore de compte ? <Link href="/inscription" className="text-blue-600 hover:underline">Inscrivez-vous</Link>
      </p>
    </div>
  );
};

export default Page;
