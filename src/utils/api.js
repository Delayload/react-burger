import {API_URL} from './constants';
import {setCookie, getCookie} from './cookie';

function checkResponse(response) {
    if (response.ok)
    {
        return Promise.resolve(response.json());
    }

    return Promise.reject(`Error status: ${response.status}`);
};

async function request(url, options) {
    try {
        const result = await fetch(url, options);
        return await checkResponse(result);
    } catch (error) {
        if (error.message === "jwt expired") {
            const {accessToken, refreshToken } = await updateToken();
            setCookie('token', accessToken.split('Bearer ')[1]);
            localStorage.setItem('refreshToken', refreshToken);
            options.headers.authorization = accessToken;
            const res = await fetch(url, options);

            return await checkResponse(res);
        } else {
            return Promise.reject(error);
        }
    }
};

async function updateToken() {
    return await request(`${API_URL}/auth/token `, {
        method: "POSt",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    });
};

export async function getIngredientsRequest() {
    return await request(`${API_URL}/ingredients`, {});
}

export async function postOrder(ids) {
    return await request(`${API_URL}/orders`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            ingredients: ids,
        }),
    });
};

export async function register(email, password, name) {
    return await request(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            name,
        }),
    });
};

export async function login(email, password) {
    return await request(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });
};

export async function logout() {
    return await request(`${API_URL}/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            token: localStorage.getItem('refreshToken'),
        }),
    });
};

export async function resetPassword(password, token) {
    return await request(`${API_URL}/auth/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            password,
            token,
        }),
    });
};

export async function forgotPassword(email) {
    return await request(`${API_URL}/auth/password-reset`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
        }),
    });
};

export async function getUserData() {
    return await request(`${API_URL}/auth/user`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: 'Bearer ' + getCookie('token')
        },
    });
};

export async function setUserData(name, email, password) {
    return await request(`${API_URL}/auth/user`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            authorization: 'Bearer ' + getCookie('token'),
        },
        body: JSON.stringify({
            name,
            email,
            password,
        }),
    });
};