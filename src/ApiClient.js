import Axios from "axios";
import Cookies from "js-cookie";

var axios = Axios.create({
  // baseURL: "https://quickdineapi.herokuapp.com",
  baseURL: 'http://localhost:8000',
  timeout: 100000
});

const token = Cookies.get("token");

const get = (url = "/", params = {}, headers = {}) => {
  headers["Authorization"] = `Bearer ${token}`;

  return new Promise((resolve, reject) => {
    url = processUrl(url);

    axios
      .get(url, {
        params: params,
        headers: headers
      })
      .then(res => resolve(res.data))
      .catch(reject);
  });
};

const post = (url = "/", body = {}, headers = {}) => {
  headers["Authorization"] = `Bearer ${token}`;

  return new Promise((resolve, reject) => {
    url = processUrl(url);

    axios
      .post(url, body, { headers })
      .then(res => resolve(res.data))
      .catch(reject);
  });
};

const put = (url = "/", body = {}, headers = {}) => {
  headers["Authorization"] = `Bearer ${token}`;

  return new Promise((resolve, reject) => {
    url = processUrl(url);

    axios
      .put(url, body, { headers })
      .then(res => resolve(res.data))
      .catch(reject);
  });
};

const del = (url = "/", params = {}, headers = {}) => {
  headers["Authorization"] = `Bearer ${token}`;

  return new Promise((resolve, reject) => {
    url = processUrl(url);

    axios
      .delete(url, {
        params: params,
        headers: headers
      })
      .then(res => resolve(res.data))
      .catch(reject);
  });
};

const processUrl = url => {
  if (url.includes("@store")) {
    var store_id = Cookies.get("store_id");

    if (store_id) {
      url = "/admin" + url.replace("@store", `/stores/${store_id}`);
    }
  }

  return url;
};

export default {
  get,
  post,
  put,
  del
};
