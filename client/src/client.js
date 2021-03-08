import axios from "axios";

function getBaseURL() {
  if (process.env.NODE_ENV === "production") {
    return process.env.REACT_APP_BASE_URL;
  }
  return "http://localhost:4000";
}
class ApiClient {
  constructor(token = "") {
    this.token = token;
    this.axios = axios.create({
      baseURL: getBaseURL(),
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
