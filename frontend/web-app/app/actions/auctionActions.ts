'use server' // Ensure this always runs on the server side  
import { Auction, PagedResult } from "../types";

/**
 * Fetches data from the search API at 'http://localhost:6001/search'.
 *
 * This function makes a GET request to the given API endpoint and applies caching
 * for optimized performance. It uses `cache: 'force-cache'`, which enables caching
 * to reduce redundant network requests.
 *
 * Caching Policy:
 * - `Cache-Control: public, max-age=3600, stale-while-revalidate=59`
 *   - The response is cached for 1 hour (`max-age=3600`).
 *   - During revalidation, stale data can be used while fetching fresh data in the gateway service (`stale-while-revalidate=59`).
 *
 * If the request fails, an error is thrown.
 *
 * @returns {Promise<any>} A promise that resolves to the JSON response from the API.
 * @throws {Error} If the request fails (e.g., server error or network issue).
 */
export async function getData(pageNumber: number, pageSize: number): Promise<PagedResult<Auction>> {
    const res = await fetch(`http://localhost:6001/search?PageSize=${pageSize}&pageNumber=${pageNumber}`, {
        cache: 'force-cache', // cache the response for better performance
        headers: {
            // Allows caching for 1 hour while allowing revalidation.
            'Cache-Control': 'public, max-age=3600, stale-while-revalidate=59',
        },
    });

    if (!res.ok) throw new Error('Failed to fetch data');

    return res.json();
}