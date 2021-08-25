import { post } from "../utils/request"

export const upload = (payload) => {
    let formData = new FormData();
    Object.keys(payload).map((key) => {
        formData.append(key, payload[key])
    })
    return post({
        url: '/profile/upload',
        payload: formData
    })
}