import { baseUrl } from "./config";

import { baseUrl as baseUrlConfig } from './config';

const _request = (url, method, params = null, payload = null, headers = null) => {
    const baseUrl = baseUrlConfig + '/api';

    const requestHeaders = _setHeader(headers)

    return new Promise((resolve, reject) => {
        let status;
        fetch(baseUrl + url, {
            method: method,
            headers: requestHeaders,
            params: params,
            body: payload ? (payload instanceof FormData ? payload : JSON.stringify(payload)) : null
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

const _setHeader = (headers) => {
    let baseHeaders = {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    };
    if (headers) {
        // Object.keys(headers).map((key) => {
        //     baseHeaders[key] = headers[key]
        // })
        baseHeaders = headers
    }
    return baseHeaders
}

export const post = (data) => {
    return _request(data.url, 'POST', null, data.payload, data.headers ? data.headers : null)
}

export const get = (data) => {
    return _request(data.url, 'GET', data.params, null)
}