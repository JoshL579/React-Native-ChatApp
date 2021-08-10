import { post } from "../utils/request"

export const login = (payload) => {
    return post({
        url: '/login',
        payload: payload
    })
}

export const checkToken = (payload) => {
    return post({
        url: '/auth',
        payload: payload
    })
}