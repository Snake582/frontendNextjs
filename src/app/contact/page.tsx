'use client'

import React from 'react'
import { useForm, ValidationError } from '@formspree/react'

const Page = () => {
  const [state, handleSubmit] = useForm("xldlbawd") // Remplace par ton ID Formspree

  if (state.succeeded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-white to-blue-200">
        <p className="text-green-600 font-semibold text-lg">✅ Merci pour votre message !</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen p-4 gap-6 bg-gradient-to-r from-white to-blue-200">
      {/* Formulaire de contact */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg border-l-8 border-blue-300">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Contactez-nous</h1>
        <p className="mb-4 text-gray-700">
          Si vous avez des questions ou des préoccupations, n&#39;hésitez pas à nous contacter.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="nom"
            placeholder="Votre nom"
            required
            className="w-full px-4 py-2 bg-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Votre email"
            required
            className="w-full px-4 py-2 bg-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <ValidationError prefix="Email" field="email" errors={state.errors} />

          <textarea
            name="message"
            placeholder="Votre message"
            rows={4}
            required
            className="w-full px-4 py-2 bg-blue-100 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          ></textarea>
          <ValidationError prefix="Message" field="message" errors={state.errors} />

          <button
            type="submit"
            disabled={state.submitting}
            className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            {state.submitting ? "Envoi..." : "Envoyer"}
          </button>
        </form>
      </div>

      {/* Informations de contact */}
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Informations de contact</h2>
        <ul className="space-y-2 text-gray-800">
          <li>📞 <strong>Téléphone:</strong> +221 70 606 32 17</li>
          <li>📧 <strong>Email:</strong> shoptime@gmail.com</li>
          <li>📍 <strong>Adresse:</strong> Dakar, Sénégal</li>
          <li>🕒 <strong>Horaires:</strong> Lundi - Vendredi, 9h - 18h</li>
        </ul>
        <p className="mt-4 text-gray-700">
          Nous sommes là pour vous aider avec toutes vos questions ou préoccupations.
          N&#39;hésitez pas à nous contacter !
        </p>
      </div>
    </div>
  )
}

export default Page
