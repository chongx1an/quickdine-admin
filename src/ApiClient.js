import Axios from 'axios';
import Cookie from 'js-cookie';

const token = Cookie.get('X-QuickDine-Access-Token');

const axios = Axios.create({
  baseURL: 'https://quickdineapi.herokuapp.com',
  timeout: 3000,
  headers: { 'X-QuickDine-Access-Token': token }
});

exports.apiGet = (path, params, headers = null) => {

    return new Promise((resolve, reject) => {
        axios.get(path, {
            params: params,
            headers: headers,
        })
        .then(res => resolve(res.data))
        .catch(reject);
    })

}

exports.apiPost = (path, body, headers = null) => {

    return new Promise((resolve, reject) => {
        axios.post(path, body, {
            headers: headers,
        })
        .then(res => resolve(res.data))
        .catch(reject);
    })

}

exports.apiPut = (path, body, headers = null) => {

    return new Promise((resolve, reject) => {
        axios.put(path, body, {
            headers: headers,
        })
        .then(res => resolve(res.data))
        .catch(reject);
    })
    
}

exports.apiDelete = (path, headers = null) => {

    return new Promise((resolve, reject) => {
        axios.get(path, {
            headers: headers,
        })
        .then(res => resolve(res.data))
        .catch(reject);
    })
    
}