import { useStateValue } from '../state';

export function setLocalStorage(value, data) {
    localStorage.setItem(value, JSON.stringify(data));
}
