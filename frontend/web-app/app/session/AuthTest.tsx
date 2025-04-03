'use client'

import React, { useState } from 'react'
import { updateAuctionTest } from '../actions/auctionActions'

export default function AuthTest() {
  const [loading, setLoading] = useState(false)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [result, setResult] = useState<any>()

  function doUpdate() {
    setResult(undefined)
    setLoading(true)
    updateAuctionTest()
      .then(res => setResult(res))
      .finally(() => setLoading(false))
  }

  return (
    <div className='flex items-center gap-4'>
      <button
        onClick={doUpdate}
        disabled={loading}
        className={`px-4 py-2 border border-gray-300 rounded-md ${
          loading
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'hover:bg-gray-100 text-gray-700'
        }`}
      >
        {loading ? 'Processing...' : 'Test auth'}
      </button>

      <div className='text-sm text-gray-600'>
        {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
      </div>
    </div>
  )
}
