import axios from 'axios';

export function get (url, request) {
  return axios.get(url, request);
}

export function put (url, data, request) {
  return axios.put(url, data, request);
}

export function post (url, data, request) {
  return axios.post(url, data, request);
}

export function patch (url, data, request) {
  return axios.patch(url, data, request);
}

export function remove (url, request) {
  return axios.delete(url, request);
}
