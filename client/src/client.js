import axios from "axios";

class ApiClient {
  constructor(token = "", baseURL = "http://localhost:4000") {
    this.token = token;
    this.axios = axios.create({
      baseURL: baseURL,
    });
  }
  get(...args) {
    return this.axios.get(...args);
  }

  post(...args) {
    return this.axios.post(...args);
  }

  setToken(token) {
    this.axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }
}

export default new ApiClient();
