import { Fragment, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { useRouter } from 'next/router';
import firebase from '../api';

import { useStateValue } from '../state';
import { userLogin, userLogout } from '../reducer/currentUser';
import { clearProfile } from '../reducer/profile';

import { setLocalStorage } from '../utils';

export default function Layout({ children, appRendered }) {
    if (!appRendered) {
        return null;
    }

    const [{ currentUser, profile }, dispatch] = useStateValue();
    const router = useRouter();

    // If we've been redirected via email verification
    // Check firebase user and set value accordingly
    firebase.auth().onAuthStateChanged((user) => {
        const searchParams = new URLSearchParams(window.location.search);

        if (searchParams.has('emailVerified')) {
            dispatch(userLogin({
                ...currentUser,
                email_verified: user.emailVerified
            }))
            setLocalStorage(
                'currentUser',
                {
                    ...currentUser,
                    email_verified: user.emailVerified
                }
            );
        }
    });

    const handleUserLogout = () => {
        const promise = new Promise((resolve, reject) => {
            resolve(dispatch(userLogout()));
        });

        promise.then(() => {
            router.push('/');
            setLocalStorage('currentUser', { isLoggedIn: false });
            dispatch(clearProfile());
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <Fragment>
            <p>{JSON.stringify(currentUser)}</p>
            <p>{JSON.stringify(profile)}</p>
            <ul>
                <li>
                    <Link href="/login"><a>Login</a></Link>
                </li>
                <li>
                    <Link href="/register"><a>Register</a></Link>
                </li>
                <li>
                    <button
                        onClick={handleUserLogout}
                    >
                        Logout
                    </button>
                </li>
                <li>
                    <Link href="/account"><a>My Account</a></Link>
                </li>
                <li>
                    <Link href="/profile"><a>Profile</a></Link>
                </li>
            </ul>
            {children}
        </Fragment>
    );
}

Layout.propTypes = {
    children: PropTypes.object,
    appRendered: PropTypes.bool
};
