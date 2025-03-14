import React from 'react';
import { useParamsStore } from '../hooks/useParamsStore';


const pageSizeButtons = [4, 8, 12];

export default function Filters() {

  const pageSize = useParamsStore(state => state.pageSize);
  const setParams = useParamsStore(state => state.setParams);
  
  return (
    <div className="flex justify-between items-center mb-4">
      <div>
        <span className="uppercase text-sm text-gray-500 mr-2">Page size</span>
        <div className="inline-flex space-x-2">
          {pageSizeButtons.map((value, i) => (
            <button
              key={i}
              onClick={() => setParams({pageSize: value})}
              className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${
                pageSize === value
                  ? 'bg-red-500 text-white border-red-500'
                  : 'bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300'
              }`}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
