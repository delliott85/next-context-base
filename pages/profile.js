import { Fragment, useEffect, useState } from 'react';
import firebase, { updateFirestore } from '../api';

import { useStateValue } from '../state';
import { updateProfile } from '../reducer/profile';

import { setLocalStorage } from '../utils';

import EditProfileForm from '../components/profile/EditProfileForm';

export default function Profile() {
    const [pageRendered, setPageRender] = useState(false);
    const [{ currentUser }, dispatch] = useStateValue();

    useEffect(() => {
        const profileRef = firebase.firestore().collection('profiles').doc(currentUser.username);
        profileRef.get().then((profileData) => {
            console.log(profileData.data());
            setLocalStorage('profile', profileData.data());
            dispatch(updateProfile(profileData.data()));
            setPageRender(true);
        }).catch((err) => {
            console.log('There was an error fetching the profile', err);
        });
    }, []);

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const location = form.location.value;
        const bio = form.bio.value;

        const newData = {
            location,
            bio
        }

        updateFirestore('profiles', currentUser.username, newData).then(() => {
            setLocalStorage('profile', newData);
            dispatch(updateProfile(newData));
        });
    }

    if (!pageRendered) {
        return <h1>Loading....</h1>
    };

    return (
        <Fragment>
            <h1>My Profile</h1>
            <EditProfileForm
                onFormSubmit={handleFormSubmit}
            />
        </Fragment>
    );
}
