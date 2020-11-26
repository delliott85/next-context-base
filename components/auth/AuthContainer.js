import { useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';

import firebase, { updateFirestore, addToFirestore } from '../../api';

import { useStateValue } from '../../state';
import { userLogin } from '../../reducer/currentUser';

import { setLocalStorage, genRandomString } from '../../utils';

import AuthForm from './AuthForm';

export default function AuthContainer({ type }) {
    const [{}, dispatch] = useStateValue();
    const router = useRouter();

    const [authError, setAuthError] = useState(null);

    //==============================
    // Helper Methods
    //==============================
    const addUserToDatabase = (uid, email, username) => {
        if (!uid) {
            return null;
        }

        const data = {
            user_id: uid,
            email: email,
            username: username,
            registered_date: Date.now(),
            last_login: Date.now(),
            email_verified: false
        }

        return (
            updateFirestore('users', uid, data).then(() => {
                const currentUser = {
                    ...data,
                    isLoggedIn: true
                };
                dispatch(userLogin(currentUser));
                setLocalStorage('currentUser', currentUser);
                return;
            }).catch((err) => {
                console.log('Error creating profile', err)
            })
        );
    }

    const addProfileToDatabase = (uid, username) => {
        if (!uid || !username) {
            return null;
        }
        
        const data = {
            user_id: uid,
            username: username,
            registered_date: Date.now(),
            last_login: Date.now()
        };

        addToFirestore('profiles', username, data);
    }

    const updateUser = (id) => {
        const userRef = firebase.firestore().collection('users').doc(id);
        userRef.get().then((userData) => {
            const currentUser = {
                ...userData.data(),
                last_login: Date.now()
            };

            const localUser = {
                ...currentUser,
                isLoggedIn: true
            }

            dispatch(userLogin(localUser));
            setLocalStorage('currentUser', localUser);
            updateFirestore('users', id, currentUser);
            updateFirestore('profiles', userData.data().username, { last_login: Date.now() });
        }).catch((err) => {
            console.log('There was an error fetching the user', err);
        });
    }

    //==============================
    // Event Handlers
    //==============================
    const handleUserSignup = (username, email, password) => {
        const usernameRef = firebase.firestore().collection('profiles').doc(username);

        usernameRef.get().then((usernameEntry) => {
            if (usernameEntry.exists) {
                console.warn('This username is taken');
                setAuthError({ message: 'Username already registered' });
                return;
            }

            return firebase.auth().createUserWithEmailAndPassword(email, password).then((data) => {
                const { uid } = data.user;
                addUserToDatabase(uid, email, username);
                addProfileToDatabase(uid, username);

                const actionSettings = {
                    url: `https://localhost:5000/?emailVerified=${genRandomString()}`
                }
                data.user.sendEmailVerification(actionSettings).then(() => {
                    console.log('Verification email sent');
                }).catch((err) => {
                    console.warn('There was an error sending the verification email', err);
                })
            }).then(() => {
                router.push('/');
            }).catch((err) => {
                setAuthError(err);
                console.log('There was an error creating a new user', err);
            });
        }).catch((err) => {
            console.warn('There was an error during signup', err);
            return;
        });
    }

    const handleUserLogin = (email, password) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then((data) => {
            updateUser(data.user.uid);
            return;
        }).then(() => {
            router.push('/');
        }).catch((err) => {
            console.log(err.code);
            setAuthError(err);
            return;
        })
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        setAuthError(null);

        const form = e.currentTarget;
        const email = form.email.value;
        const password = form.password.value;

        if (type === 'register') {
            const username = form.username.value;
            handleUserSignup(username, email, password);
            return;
        }
        else {
            handleUserLogin(email, password);
            return;
        }
    };

    return (
        <AuthForm
            type={type}
            onFormSubmit={handleFormSubmit}
            authError={authError}
        />
    );
}

AuthContainer.propTypes = {
    type: PropTypes.string
};
