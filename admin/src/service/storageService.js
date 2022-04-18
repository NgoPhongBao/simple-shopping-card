const USER_AUTH_KEY = "auth";

const storage = {
  setAuth(data) {
    let authData = this.getAuth();
    authData = Object.assign(authData || {}, data);
    localStorage.setItem(USER_AUTH_KEY, JSON.stringify(authData));
  },

  getAuth() {
    let authData = localStorage.getItem(USER_AUTH_KEY);
    if (authData) return JSON.parse(authData);
    return null;
  },

  deleteAuth() {
    localStorage.removeItem(USER_AUTH_KEY);
  },

  getAccessToken() {
    let authData = this.getAuth();
    if (!authData) return "";
    return authData.accessToken;
  },
};

export default storage;
