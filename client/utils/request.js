import { baseUrl as baseUrlConfig } from './config';
import { getToken } from '../utils/store';

const _request = async (url, method, params = null, payload = null, headers = null) => {
    const baseUrl = baseUrlConfig + '/api';

    const requestHeaders = await _setHeader(headers)

    return new Promise((resolve, reject) => {
        let status;
        fetch(baseUrl + url, {
            method: method,
            headers: requestHeaders,
            params: params,
            body: payload ? JSON.stringify(payload) : null
        }).then((res) => {
            status = res.status;
            if (status < 500) return res.json()
            throw Error('Server Error')
        }).then((res) => {
            if (status === 200) return resolve(res)
            throw Error(res.msg)
        }).catch((err) => {
            return reject(err.message)
        })
    })
}

const _setHeader = () => {
    let baseHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
    return getToken().then((token) => {
        if (token) baseHeaders.Authorization = 'Bearer ' + token
        return baseHeaders
    })
}

export const post = (data) => {
    return _request(data.url, 'POST', null, data.payload)
}

export const get = (data) => {
    return _request(data.url, 'GET', data.params, null)
}