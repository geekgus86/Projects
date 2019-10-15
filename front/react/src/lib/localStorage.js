class LocalStorage {
    getItem(name) {
        return localStorage.getItem(name);
    }
    setItem(name, value) {
        localStorage.setItem(name, value);
    }
    removeItem(name) {
        localStorage.removeItem(name);
    }
    clear() {
        localStorage.clear();
    }
}
let _localStorage = new LocalStorage();
export default _localStorage;