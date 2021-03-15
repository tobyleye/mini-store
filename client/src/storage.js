class Storage {
  STORAGE_KEY = "session";
  async saveSession(data) {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
  }

  async retrieveSession() {
    if (this.STORAGE_KEY in localStorage) {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY));
    }
    return null;
  }
  async clearSession() {
    localStorage.clear();
  }
}

export default new Storage();
