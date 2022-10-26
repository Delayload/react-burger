export const API_URL = "https://norma.nomoreparties.space/api";

export const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x);