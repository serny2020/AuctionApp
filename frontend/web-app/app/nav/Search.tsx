'use client'

import { usePathname, useRouter } from 'next/navigation';
import { useParamsStore } from '../hooks/useParamsStore'
import {FaSearch} from 'react-icons/fa'

export default function Search() {
    const router = useRouter();
    const pathname = usePathname();
    const setParams = useParamsStore(state => state.setParams);
    const setSearchValue = useParamsStore(state => state.setSearchValue);
    const searchValue = useParamsStore(state => state.searchValue);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onChange(event: any) {
        setSearchValue(event.target.value);
    }

    function search() {
        if (pathname !== '/') router.push('/'); // if not on home page after creating a 
        // new auction, go to home page
        setParams({searchTerm: searchValue});
    }

    return (
        <div className='flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm'>
            <input 
                onChange={onChange}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onKeyDown={(e: any) => {
                    if (e.key === 'Enter') search();
                }} // detect enter press
                type="text" 
                value={searchValue}
                placeholder='Search for cars by make, model or color'
                className='
                flex-grow
                pl-5
                bg-transparent
                focus:outline-none
                border-transparent
                focus:ring-0
                text-sm
                text-gray-600   
                '
            />
            <button>
                <FaSearch size={34}
                    onClick={search} 
                    className='bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2' 
                />
            </button>
        </div>
    )
}