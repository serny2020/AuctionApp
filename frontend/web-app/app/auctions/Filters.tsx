import React from 'react';
import { useParamsStore } from '../hooks/useParamsStore';
import { AiOutlineClockCircle, AiOutlineSortAscending } from 'react-icons/ai';
import { BsFillStopCircleFill } from 'react-icons/bs';


const pageSizeButtons = [4, 8, 12];

const orderButtons = [
  {
      label: 'Alphabetical',
      icon: AiOutlineSortAscending,
      value: 'make'
  },
  {
      label: 'Ending soon',
      icon: AiOutlineClockCircle,
      value: 'endingSoon'
  },
  {
      label: 'Recently added',
      icon: BsFillStopCircleFill,
      value: 'new'
  },
]

export default function Filters() {
  const pageSize = useParamsStore(state => state.pageSize);
  const setParams = useParamsStore(state => state.setParams);
  const orderBy = useParamsStore(state => state.orderBy);

  return (
    <div className="flex justify-between items-center mb-4">
      {/* Order By Section */}
      <div>
        <span className="uppercase text-sm text-gray-500 mr-2">Order by</span>
        <div className="inline-flex space-x-2 bg-gray-100 p-1 rounded-lg">
          {orderButtons.map(({ label, icon: Icon, value }) => (
            <button
              key={value}
              onClick={() => setParams({ orderBy: value })}
              className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-colors border ${
                orderBy === value
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
              }`}
            >
              <Icon className="mr-2 h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Page Size Section */}
      <div>
        <span className="uppercase text-sm text-gray-500 mr-2">Page size</span>
        <div className="inline-flex space-x-2 bg-gray-100 p-1 rounded-lg">
          {pageSizeButtons.map((value, i) => (
            <button
              key={i}
              onClick={() => setParams({ pageSize: value })}
              className={`px-4 py-2 text-sm font-medium rounded-md border transition-colors ${
                pageSize === value
                  ? "bg-red-500 text-white border-red-500"
                  : "bg-gray-200 text-gray-700 border-gray-300 hover:bg-gray-300"
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

