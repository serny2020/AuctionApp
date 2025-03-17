'use client'

import { signIn } from 'next-auth/react'
import React from 'react'

export default function LoginButton() {
  return (
    <button 
      onClick={() => signIn('id-server', { callbackUrl: '/' }, {prompt: 'login'})}  // login param forces redirect to login page even if session token is active
      className="px-4 py-2 border border-gray-500 text-gray-700 rounded-lg hover:bg-gray-100 transition"
    >
      Login
    </button>
  )
}
