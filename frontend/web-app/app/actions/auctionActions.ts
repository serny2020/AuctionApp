'use server' // Ensure this always runs on the server side  
import { FieldValues } from "react-hook-form";
import { auth } from "../auth";
import { fetchWrapper } from "../lib/fetchWrapper";
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
export async function getData(query: string): Promise<PagedResult<Auction>> {
    // const res = await fetch(`http://localhost:6001/search${query}`, {
    //     // cache: 'force-cache', // cache the response for better performance
    //     // headers: {
    //     //     // Allows caching for 1 hour while allowing revalidation.
    //     //     'Cache-Control': 'public, max-age=3600, stale-while-revalidate=59',
    //     // },
    // });

    // if (!res.ok) throw new Error('Failed to fetch data');

    // return res.json();
    return await fetchWrapper.get(`search${query}`);
}

/**
 * Test function to see if we can access and store the access token.
 * We can then store the access token in the session to make authenticated requests
 * to API endpoint in the future.
 * @returns 
 */
export async function updateAuctionTest() {
    const data = {
        mileage: Math.floor(Math.random() * 10000) + 1
    }

    // const session = await auth();

    // // Make a PUT request to the API endpoint 
    // // with stored access token in the session
    // const res = await fetch('http://localhost:6001/auctions/bbab4d5a-8565-48b1-9450-5ac2a5c4a654', {
    //     method: 'PUT',
    //     headers: {
    //         'Content-type': 'application/json',
    //         'Authorization': 'Bearer ' + session?.accessToken
    //     },
    //     body: JSON.stringify(data)
    // });

    // if (!res.ok) return {status: res.status, message: res.statusText}

    // return res.statusText;
    // return res.json();

    return await fetchWrapper.put('auctions/bbab4d5a-8565-48b1-9450-5ac2a5c4a654', data);
}

export async function createAuction(data: FieldValues) {
    return await fetchWrapper.post('auctions', data);
}

export async function getDetailedViewData(id: string): Promise<Auction> {
    return await fetchWrapper.get(`auctions/${id}`)
}

export async function updateAuction(data: FieldValues, id: string) {
    const res = await fetchWrapper.put(`auctions/${id}`, data);
    return res;
}

export async function deleteAuction(id: string) {
    return await fetchWrapper.del(`auctions/${id}`);
}