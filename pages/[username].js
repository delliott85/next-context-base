import { useEffect, useState } from 'react';
import firebase from '../api';

export default function username() {
    const [user, setUser] = useState(null);
    const username = window.location.pathname;

    useEffect(() => {
        if (username) {
            const usernameRef = firebase.firestore().collection('profiles').doc(username);
            usernameRef.get().then((data) => {
                return setUser(data.data());
            }).catch((err) => {
                return console.log('There was an error getting the user profile', err);
            });
        }
    }, []);

    if (!user) {
        return <p>Loading...</p>
    }

    const { avatar, bio, location } = user; 

    return (
        <div>
            <h1>{username}</h1>
            <p>{bio}</p>
        </div>
    );
}
