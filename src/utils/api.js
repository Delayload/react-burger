import {API_URL} from './constants';

function request(url, options) {
    return fetch(url, options).then(checkResponse)
}

function checkResponse(response) {
    if (response.ok)
    {
        return Promise.resolve(response.json());
    }

    return Promise.reject(`Error status: ${response.status}`)
}

export function getIngredientsRequest() {
    return request(`${API_URL}/ingredients`, {});
}

export function postOrder(ids) {
    return request(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ingredients: ids,
        }),
    });
}