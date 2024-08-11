import { EventEmitter } from "events";
class SessionStorageService extends EventEmitter {
  constructor() {
    super();
    this.initStorageListener();
  }

  initStorageListener() {
    // if (!window) return
    // window.addEventListener("storage", (event) => {
    //   if (event.storageArea === sessionStorage) {
    //     this.emit("storageChange", {
    //       key: event.key,
    //       newValue: event.newValue,
    //       oldValue: event.oldValue,
    //     });
    //   }
    // });
  }

  setItem(key: string, value: string) {
    sessionStorage.setItem(key, value);
    this.emit("storageChange", { key, newValue: value, oldValue: null });
  }

  getItem(key: string) {
    return sessionStorage.getItem(key);
  }

  removeItem(key: string) {
    const oldValue = sessionStorage.getItem(key);
    sessionStorage.removeItem(key);
    this.emit("storageChange", { key, newValue: null, oldValue });
  }

  clear() {
    sessionStorage.clear();
    this.emit("storageChange", { key: null, newValue: null, oldValue: null });
  }
}

const sessionStorageService = new SessionStorageService();
export default sessionStorageService;
