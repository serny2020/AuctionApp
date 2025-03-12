import React from 'react'
import Image from 'next/image';
import CountdownTimer from './CountdownTimer';
import CarImage from './CarImage';

type Props = {
    auction: any
}

export default function AuctionCard({ auction }: Props) {
    return (
        // <div>{auction.make}</div>
        <a href="#" className='group'>
            <div className="relative w-full bg-gray-200 aspect-[16/10] rounded-lg overflow-hidden">
                {/* Car image component */}
                <CarImage imageUrl={auction.imageUrl} />
                {/* Count down timer component */}
                <div className='absolute bottom-2 left-2'>
                    <CountdownTimer auctionEnd={auction.auctionEnd} />
                </div>
            </div>
            <div className="flex justify-between items-center mt-4">
                <h3 className="text-gray-700">{auction.make} {auction.model}</h3>
                <p className="font-semibold text-sm">{auction.year}</p>
            </div>
        </a>
    );
}

