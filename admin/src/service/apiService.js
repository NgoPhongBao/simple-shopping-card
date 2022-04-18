import axios from "axios";
import storage from "./storageService";

const baseURL = process.env.REACT_APP_API_URL;

const api = {
  request: function (config) {
    return new Promise((resolve, reject) => {
      const headers = { Authorization: `Bearer ${storage.getAccessToken()}` };
      axios({ baseURL, headers, ...config, mode: "cors" })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          if (!err.response) reject(err);
          const { status } = err.response;
          if (status === 403 || status === 401) {
            reject(err.response.data);
            storage.deleteAuth();
            setTimeout(() => {
              if(window.location.origin.indexOf("localhost") >= 0){
                window.location.href = "/login";
              }
              else{
                window.location.href = "/admin/login";
              }
            }, 500)
            
          }
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
