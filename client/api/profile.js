import { post } from "../utils/request"

export const upload = (payload) => {
    return post({
        url: '/profile/upload',
        payload: payload
    })
}

export const updateUsername = (payload) => {
    return post({
        url: '/profile/update/username',
        payload: payload
    })
}