const _request = (url, method, params=null, payload=null) => {
    return new Promise((resolve, reject) => {
        let status;
        fetch('http://localhost:5000/api' + url, {
            method: method,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            params: params,
            body: JSON.stringify(payload)
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
    return _request(data.url, 'POST', data.params, null)
}