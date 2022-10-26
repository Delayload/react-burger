export const API_URL = "https://norma.nomoreparties.space/api";

function checkResponse(response) {
    if (response.ok)
    {
        return Promise.resolve(response.json());
    }

    return Promise.reject(`Error status: ${response.status}`)
}

export function getIngredientsRequest() {
    return fetch(`${API_URL}/ingredients`).then(checkResponse);
}

export function postOrder(ids) {
    return fetch(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ingredients: ids,
        }),
    }).then(checkResponse);
}