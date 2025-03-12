'use client' // client side component

import Countdown, { zeroPad } from "react-countdown";

// typescript type definition for the CountdownTimer component props
type Props = {
    auctionEnd: string;
};

const renderer = ({
    days,
    hours,
    minutes,
    seconds,
    completed
}: {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    completed: boolean;
}) => {
    return (
        <div className={`
            border-2 border-white text-white py-1 px-2 rounded-lg 
            flex justify-center 
            ${completed 
                ? 'bg-red-600'  // Red background when auction is over
                : (days === 0 && hours < 10) 
                ? 'bg-amber-600' // Amber background when less than 10 hours remain on the last day
                : 'bg-green-600' // Green background otherwise
            }`}>
            {completed ? (
                <span>Auction finished</span> // Display message when auction is over
            ) : (
                <span suppressHydrationWarning={true}>
                    {days}:{zeroPad(hours)}:{zeroPad(minutes)}:{zeroPad(seconds)}
                </span> // Display countdown timer in DD:HH:MM:SS format with zero-padded values
            )}
        </div>
    );
};

/**
 * CountdownTimer Component
 * 
 * This component renders a countdown timer until the `auctionEnd` time.
 * 
 * @param {Props} props - The component props.
 * @param {string} props.auctionEnd - The end date/time of the auction in string format.
 * @returns JSX Element displaying the countdown.
 */
export default function CountdownTimer({ auctionEnd }: Props) {
    return (
        <div>
            <Countdown date={auctionEnd} renderer={renderer} />
        </div>
    );
}
