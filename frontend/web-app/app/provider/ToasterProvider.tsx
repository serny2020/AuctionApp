// Error display is a client-side toast notification.
'use client'
 
 import React from 'react'
 import { Toaster } from 'react-hot-toast'
 
 export default function ToasterProvider() {
   return (
     <Toaster position='bottom-right' />
   )
 }