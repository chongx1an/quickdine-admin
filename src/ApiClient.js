import Axios from 'axios';
import Cookie from 'js-cookie';

const token = Cookie.get('X-QuickDine-Access-Token');

const axios = Axios.create({
  baseURL: 'https://quickdineapi.herokuapp.com/api',
  timeout: 3000,
  headers: { 'X-QuickDine-Access-Token': token }
});

const apiGet = (path, params = null, headers = null) => {

  return new Promise((resolve, reject) => {

    path = checkStorePath(path);

    axios.get(path, {
        params: params,
        headers: headers,
    })
    .then(res => resolve(res.data))
    .catch(reject);
  })

}

const apiPost = (path, body = null, headers = null) => {

  path = checkStorePath(path);

  return new Promise((resolve, reject) => {
      axios.post(path, body, {
          headers: headers,
      })
      .then(res => resolve(res.data))
      .catch(reject);
  })

}

const apiPut = (path, body = null, headers = null) => {

  path = checkStorePath(path);

  return new Promise((resolve, reject) => {
      axios.put(path, body, {
          headers: headers,
      })
      .then(res => resolve(res.data))
      .catch(reject);
  })

}

const apiDelete = (path, headers = null) => {

  path = checkStorePath(path);

  return new Promise((resolve, reject) => {
      axios.get(path, {
          headers: headers,
      })
      .then(res => resolve(res.data))
      .catch(reject);
  })

}

const checkStorePath = path => {

  path = checkStorePath(path);

  if(path.includes('@store')) {

    const storeId = Cookie.get('storeId');

    path.replace('@store', `/stores/${storeId}`);

  }

  return path;
}

export default {
  apiGet,
  apiPost,
  apiPut,
  apiDelete,
}
