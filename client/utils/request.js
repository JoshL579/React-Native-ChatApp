const _request = (url, method, params=null, payload=null) => {
    const baseUrl = 'http://192.168.1.66:5000/api';
    // const baseUrl = 'http://127.0.0.1:5001/api';
    // const baseUrl = 'http://127.0.0.1:5000/api';

    return new Promise((resolve, reject) => {
        let status;
        fetch(baseUrl + url, {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
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

export const post = (data) => {
    return _request(data.url, 'POST', null, data.payload)
}

export const get = (data) => {
    return _request(data.url, 'GET', data.params, null)
}