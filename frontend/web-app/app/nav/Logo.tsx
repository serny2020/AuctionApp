'use client'

import React from 'react'
import { IoCarSport } from 'react-icons/io5'
import { useParamsStore } from '../hooks/useParamsStore'
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';

export default function Logo() {

    const router = useRouter();
    const pathname = usePathname();
    
    // back to home page and reset the search params
    function doReset() {
        if (pathname !== '/') router.push('/');
        reset();
    }
    
    const reset = useParamsStore(state => state.reset);
    

    return (
        <div onClick={doReset} className='flex items-center gap-2 text-3xl font-semibold text-red-500 cursor-pointer'>
            <IoCarSport size={34} />
            <div>Car Auctions</div>
        </div>
    )
}
