import axios from 'axios'

export const getAuthToken = () => {
    return window.localStorage.getItem('auth_token');
};

export const setAuthHeader = (token: string | null) => {
    if (token !== null) {
      window.localStorage.setItem("auth_token", token);
    } else {
      window.localStorage.removeItem("auth_token");
    }
};

export const request = (method, url, data) => {

  let headers = {};
  if (getAuthToken() !== null && getAuthToken() !== "null") {
      headers = {'Authorization': `Bearer${getAuthToken()}`};
  }

  return axios({
      method: method,
      url: url,
      headers: headers,
      data: data});
};

axios.defaults.baseURL = 'http://localhost:9091/';
axios.defaults.headers.post['Content-Type'] = 'application/json';

