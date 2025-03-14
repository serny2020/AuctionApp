'use client'
import React from 'react'
import { IoCarSport } from 'react-icons/io5'
import { useParamsStore } from '../hooks/useParamsStore'

export default function Logo() {

    const reset = useParamsStore(state => state.reset);
    return (
        <div onClick={reset} className='flex items-center gap-2 text-3xl font-semibold text-red-500 cursor-pointer'>
        <IoCarSport size={34}/>
        <div>Car Auctions</div>
        </div>
    )
}
