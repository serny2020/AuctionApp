import { auth } from "../auth";

const baseUrl = process.env.API_URL;

async function get(url: string) {
    const requestOptions = {
        method: 'GET',
        headers: await getHeaders(),
    }

    const response = await fetch(baseUrl + url, requestOptions);

    return handleResponse(response);
}


async function post(url: string, body: Record<string, unknown>) {
    const requestOptions = {
        method: 'POST',
        headers: await getHeaders(),
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
}


async function put(url: string, body: Record<string, unknown>) {
    const requestOptions = {
        method: 'PUT',
        headers: await getHeaders(),
        body: JSON.stringify(body)
    }
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
}

async function del(url: string) {
    const requestOptions = {
        method: 'DELETE',
        headers: await getHeaders()
    }
    const response = await fetch(baseUrl + url, requestOptions);
    return await handleResponse(response);
}

async function getHeaders() {
    const session = await auth();
    const headers: Record<string, string> = { 'Content-type': 'application/json' };
    if (session?.accessToken) {
        headers.Authorization = 'Bearer ' + session.accessToken
    }
    return headers;
}

async function handleResponse(response: Response) {
    const text = await response.text();
    console.log({text});
    // const data = text && JSON.parse(text);

    let data;
     try {
         data = JSON.parse(text);
     // eslint-disable-next-line @typescript-eslint/no-unused-vars
     } catch (error) {
         data = text;
     }

     if (response.ok) {
        return data || response.statusText
        return data || response.statusText;
    } else {
        return {
            error: {
              status: response.status,
              message: typeof data === 'string' ? data : response.statusText,
            }
          };
    }
}

export const fetchWrapper = {
    get,
    post,
    put,
    del
}
