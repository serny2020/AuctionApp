'use client';

import React, { useEffect, useState } from 'react';
import AuctionCard from './AuctionCard';
import { Auction, PagedResult } from '../types';
import AppPagination from '../components/AppPagination';
import { getData } from '../actions/auctionActions';



export default function Listings() {
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [pageCount, setPageCount] = useState(0);
    const [pageNumber, setPageNumber] = useState(1);

    // Fetch data when the component mounts or pageNumber changes
    useEffect(() => {
        async function fetchAuctions() {
            try {
                const data = await getData(pageNumber);
                setAuctions(data.results);
                setPageCount(data.pageCount);
            } catch (error) {
                console.error("Error fetching auctions:", error);
            }
        }
        fetchAuctions();
    }, [pageNumber]);

    if (auctions.length === 0) return <h3>Loading...</h3>;

    return (
        <>
            <div className='grid grid-cols-4 gap-6'>
                {auctions.map((auction) => (
                    <AuctionCard auction={auction} key={auction.id} />
                ))}
            </div>

            {/* Pagination Component */}
            <div className='flex justify-center mt-4'>
                <AppPagination 
                    currentPage={pageNumber} 
                    pageCount={pageCount} 
                    onPageChange={setPageNumber} // Updates page number on click
                />
            </div>
        </>
    );
}
