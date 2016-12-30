import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL || '/api/'

export function getResource (resource) {
  return axios.get(serverUrl + resource).then((response) => {
    if (response.data.cod && response.data.message) {
      throw new Error(response.data.message);
    }
    return response.data;
  }).catch((error) => {
    return error;
  });
}
