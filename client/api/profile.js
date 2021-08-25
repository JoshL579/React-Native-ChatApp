import { post } from "../utils/request"

export const upload = (payload) => {
    let formData = new FormData();
    Object.keys(payload).map((key) => {
        formData.append(key, payload[key])
    })
    const headers = {
        // 'Content-Type': 'multipart/form-data'
    }
    return post({
        url: '/profile/upload',
        payload: formData,
        headers: headers
    })
}