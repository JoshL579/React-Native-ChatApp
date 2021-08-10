import { get } from "../utils/request"

export const getRooms = () => {
    return get({
        url: '/rooms',
        params: null
    })
}
