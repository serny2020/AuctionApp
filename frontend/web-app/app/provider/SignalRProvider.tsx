'use client'

import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr'
import { useParams } from 'next/navigation'
import React, { ReactNode, useCallback, useEffect, useRef } from 'react'

import { useAuctionStore } from '../hooks/useAuctionStore'
import { useBidStore } from '../hooks/useBidStore'
import { Bid } from '../types'

type Props = {
    children: ReactNode
}

export default function SignalRProvider({ children }: Props) {
    const connection = useRef<HubConnection | null>(null);
    const setCurrentPrice = useAuctionStore(state => state.setCurrentPrice);
    const addBid = useBidStore(state => state.addBid);
    const params = useParams<{ id: string }>();

    // update current price when bid is accepted
    const handleBidPlaced = useCallback((bid: Bid) => {
        if (bid.bidStatus.includes('Accepted')) {
            setCurrentPrice(bid.auctionId, bid.amount);
        }

        if (params.id === bid.auctionId) {
            addBid(bid);
        }
    }, [setCurrentPrice, addBid, params.id])

    useEffect(() => {
        if (!connection.current) {
            connection.current = new HubConnectionBuilder()
                .withUrl('http://localhost:6001/notifications')
                .withAutomaticReconnect()
                .build();

            connection.current.start()
                .then(() => 'Connected to notification hub')
                .catch(err => console.log(err));
        }

        // listen to bid placed event
        connection.current.on('BidPlaced', handleBidPlaced);

        return () => {
            // turn off the event listener when not current auction
            connection.current?.off('BidPlaced', handleBidPlaced);
        }

    }, [setCurrentPrice, handleBidPlaced])

    return (
        children
    )
}