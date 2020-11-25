import firebase from './index';

export function signup(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function login(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password);
}
