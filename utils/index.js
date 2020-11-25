export function setLocalStorage(value, data) {
    localStorage.setItem(value, JSON.stringify(data));
}

export function genRandomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}
