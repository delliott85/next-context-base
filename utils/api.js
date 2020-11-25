import firebase from '../api';

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
