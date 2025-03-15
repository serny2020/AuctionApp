'use client'

import { useParamsStore } from '../hooks/useParamsStore'
import React from 'react'
import Heading from './Heading'

type Props = {
    title?: string
    subtitle?: string
    showReset?: boolean
}

export default function EmptyFilter({
    title = 'No matches for this filter',
    subtitle = 'Try changing or resetting the filter',
    showReset
}: Props) {
    const reset = useParamsStore(state => state.reset);

    return (
        <div className='
            h-[40vh] flex flex-col gap-2 justify-center items-center shadow-lg
        '>
            <Heading title={title} subtitle={subtitle} center />
            <div className="mt-4">
                {showReset && (
                    <button
                        onClick={reset}
                        className="px-4 py-2 border border-gray-300
                         text-gray-700 rounded hover:bg-gray-100 focus:outline-none"
                    >
                        Remove filters
                    </button>
                )}
            </div>
        </div>
    )
}