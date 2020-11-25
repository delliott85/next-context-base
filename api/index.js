import firebase from 'firebase';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
import 'firebase/analytics';

const firebaseConfig = {
    apiKey: "AIzaSyDggluT-swMZVlu-YDU0VhsFxOHNts9Bsk",
    authDomain: "riskysignal-732b4.firebaseapp.com",
    databaseURL: "https://riskysignal-732b4.firebaseio.com",
    projectId: "riskysignal-732b4",
    storageBucket: "riskysignal-732b4.appspot.com",
    messagingSenderId: "323055057743",
    appId: "1:323055057743:web:bbf62807e67b51652e633a",
    measurementId: "G-2LY04LDY64"
};

if (typeof window !== 'undefined' && !firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
    if ('measurementId' in firebaseConfig) firebase.analytics()
}

export default firebase;

export function addToFirestore(collection, doc, data, merge = false) {
    if (!collection || !doc) {
        return null;
    }

    return firebase.firestore().collection(collection).doc(doc).set(data, {merge: merge});
}

export function updateFirestore(collection, doc, data) {
    if (!collection || !doc || !data) {
        return null;
    }

    return addToFirestore(collection, doc, data, true);
}

export function removeFromFirestore(collection, doc) {
    if (!collection || !doc) {
        return null;
    }

    return firebase.firestore().collection(collection).doc(doc).delete();
}
