'use client';

import { useState } from "react";

type Props = {
    currentPage: number;
    pageCount: number;
    onPageChange: (page: number) => void;
};

export default function AppPagination({ currentPage, pageCount, onPageChange }: Props) {
    const [pageNumber, setPageNumber] = useState(currentPage);

    const goToPage = (page: number) => {
        if (page > 0 && page <= pageCount) {
            setPageNumber(page);
            onPageChange(page); // Notify parent component
        }
    };

    return (
        <div className="flex items-center justify-center space-x-2 mt-5">
            {/* Previous Button */}
            <button
                className={`px-3 py-1 rounded ${pageNumber === 1 ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                disabled={pageNumber === 1}
                onClick={() => goToPage(pageNumber - 1)}
            >
                Prev
            </button>

            {/* Page Numbers */}
            {[...Array(pageCount)].map((_, index) => (
                <button
                    key={index}
                    className={`px-3 py-1 rounded ${pageNumber === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
                    onClick={() => goToPage(index + 1)}
                >
                    {index + 1}
                </button>
            ))}

            {/* Next Button */}
            <button
                className={`px-3 py-1 rounded ${pageNumber === pageCount ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 text-white hover:bg-blue-600"}`}
                disabled={pageNumber === pageCount}
                onClick={() => goToPage(pageNumber + 1)}
            >
                Next
            </button>
        </div>
    );
}
