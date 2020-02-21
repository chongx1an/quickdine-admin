import Axios from 'axios';
import Cookies from 'js-cookie';

var axios = Axios.create({
  baseURL: 'http://localhost:8000/admin',
  timeout: 100000,
});

const get = (url = '/', params = {}, headers = {}) => {

  return new Promise((resolve, reject) => {

    url = processUrl(url);

    axios.get(url, {
      params: params,
      headers: headers
    })
    .then(res => resolve(res.data))
    .catch(reject);

  });

}

const post = (url = '/', body = {}, headers = {}) => {

  return new Promise((resolve, reject) => {

    url = processUrl(url);

    axios.post(url, body, { headers })
    .then(res => resolve(res.data))
    .catch(reject);

  });

}

const put = (url = '/', body = {}, headers = {}) => {

  return new Promise((resolve, reject) => {

    url = processUrl(url);

    axios.put(url, body, { headers })
    .then(res => resolve(res.data))
    .catch(reject);

  });

}

const del = (url = '/', params = {}, headers = {}) => {

  return new Promise((resolve, reject) => {

    url = processUrl(url);

    axios.delete(url, {
      params: params,
      headers: headers
    })
    .then(res => resolve(res.data))
    .catch(reject);

  });

}

const processUrl = url => {

  if(url.includes('@store')) {

    var store_id = Cookies.get('store_id');

    if(store_id) {

      url = url.replace('@store', `/stores/${store_id}`);

    }

  }

  return url;

}

export default {
  get,
  post,
  put,
  del
}
