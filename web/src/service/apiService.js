import axios from "axios";

const baseURL = process.browser
  ? process.env.NEXT_PUBLIC_API
  : process.env.NEXT_SERVER_API;

const api = {
  request: function (config) {
    return new Promise((resolve, reject) => {
      axios({ baseURL, withCredentials: true , ...config })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          if (!err.response) reject(err);
          reject(err.response.data);
        });
    });
  },
  get: function (url, params) {
    return this.request({
      url,
      method: "get",
      params,
    });
  },
  post: function (url, data) {
    return this.request({
      url,
      method: "post",
      data,
    });
  },
  put: function (url, data) {
    let config = {
      url,
      method: "put",
      data,
    };
    return this.request(config);
  },
  delete: function (url, params) {
    return this.request({
      url,
      method: "delete",
      params,
    });
  },
};

export default api;
