import { post } from "../utils/request"

export const login = (payload) => {
    return post({
        url: '/login',
        payload: payload
    })
}