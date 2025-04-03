'use client';

import { deleteAuction } from '@/app/actions/auctionActions';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';

type Props = {
    id: string;
};

export default function DeleteButton({ id }: Props) {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    function doDelete() {
        setLoading(true);
        deleteAuction(id)
            .then(res => {
                if (res.error) throw res.error;
                router.push('/');
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            }).catch((error: any) => {
                toast.error(error.status + ' ' + error.message)
            }).finally(() => setLoading(false));
    }

    return (
        <button
            onClick={doDelete}
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white
                 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2
                  focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50`}
        >
            {loading ? 'Deleting...' : 'Delete Auction'}
        </button>
    );
}
