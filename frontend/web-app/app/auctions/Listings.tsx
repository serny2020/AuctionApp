'use client';

import React, { useEffect, useState } from 'react';
import AuctionCard from './AuctionCard';
import { Auction, PagedResult } from '../types';
import AppPagination from '../components/AppPagination';
import { getData } from '../actions/auctionActions';
import Filters from './Filters';
import { useShallow } from 'zustand/react/shallow';
import { useParamsStore } from '../hooks/useParamsStore';
import qs from 'query-string';
import EmptyFilter from '../components/EmptyFilter';
import { useAuctionStore } from '../hooks/useAuctionStore';


export default function Listings() {
    // const [data, setData] = useState<PagedResult<Auction>>();
    const [loading, setLoading] = useState(true);
    const params = useParamsStore(useShallow(state => ({
        pageNumber: state.pageNumber,
        pageSize: state.pageSize,
        searchTerm: state.searchTerm,
        orderBy: state.orderBy,
        filterBy: state.filterBy,
        seller: state.seller,
        winner: state.winner,
    })));

    // useShawllow performs a shallow comparison to avoid 
    // unnecessary re-renders if the selected state object hasn't changed.
    const data = useAuctionStore(useShallow(state => ({
        auctions: state.auctions,
        totalCount: state.totalCount,
        pageCount: state.pageCount
    })));
    const setData = useAuctionStore(state => state.setData);

    const setParams = useParamsStore(state => state.setParams);
    const url = qs.stringifyUrl({ url: '', query: params });

    function setPageNumber(pageNumber: number) {
        setParams({ pageNumber })
    }

    useEffect(() => {
        getData(url).then(data => {
            setData(data);
            setLoading(false);
        })
    }, [url])


    // If 'data' is not yet loaded.
    if (loading) return <h3>Loading...</h3>;
    // If 'data' is loaded but contains no items,
    // display the EmptyFilter component with the reset option enabled.

    return (
        <>
            {/* Render the Filters component at the top */}
            <Filters />

            {/* Check if there are no auction results */}
            {data.totalCount === 0 ? (
                // If no auctions are available, show the EmptyFilter component with the reset option enabled
                <EmptyFilter showReset />
            ) : (
                <>
                    {/* Display a grid of auction cards */}
                    <div className="grid grid-cols-4 gap-6">
                        {/* Map through the list of auction results and render an AuctionCard for each */}
                        {data.auctions.map((auction) => (
                            <AuctionCard auction={auction} key={auction.id} />
                        ))}
                    </div>

                    {/* Pagination Component */}
                    <div className="flex justify-center mt-4">
                        <AppPagination
                            // The current page number from the query parameters
                            currentPage={params.pageNumber}
                            // Total number of pages available
                            pageCount={data.pageCount}
                            // Function to update the page number when a new page is selected
                            onPageChange={setPageNumber}
                        />
                    </div>
                </>
            )}
        </>

    );
}
