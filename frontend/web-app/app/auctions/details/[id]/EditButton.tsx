'use client';

import Link from 'next/link';
import React from 'react';

type Props = {
    id: string;
};

export default function EditButton({ id }: Props) {
    return (
        <Link href={`/auctions/update/${id}`}>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 bg-white rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2">
                Update auction
            </button>
        </Link>
    );
}
