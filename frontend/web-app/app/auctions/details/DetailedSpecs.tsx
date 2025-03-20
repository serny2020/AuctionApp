'use client';

import {Auction} from '../../types'

type Props = {
    auction: Auction;
};

export default function DetailedSpecs({ auction }: Props) {
    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    <tr className="bg-white dark:bg-gray-800">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                            Seller
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                            {auction.seller}
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                            Make
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                            {auction.make}
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                            Model
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                            {auction.model}
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                            Year manufactured
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                            {auction.year}
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                            Mileage
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                            {auction.mileage}
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                            Has reserve price?
                        </td>
                        <td className="px-4 py-3 text-gray-700 dark:text-gray-300">
                            {auction.reservePrice > 0 ? 'Yes' : 'No'}
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}
