export function setLocalStorage(value, data) {
    localStorage.setItem(value, JSON.stringify(data));
}

export function genRandomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export const validator = (value1, value2) => {
    if (!value1 || !value2) {
        return false;
    }

    if (value1 === value2) {
        return true;
    }

    return false;
}
