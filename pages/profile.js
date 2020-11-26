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

    const submitActions = (newData) => {
        updateFirestore('profiles', currentUser.username, newData).then(() => {
            setLocalStorage('profile', newData);
            dispatch(updateProfile(newData));
        });
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const location = form.location.value;
        const bio = form.bio.value;
        const file = form.avatar.files[0];

        let newData = {
            location,
            bio
        }

        if (file) {
            const newFileName = Date.now();
            const meta = { contentType: file.type };

            const storageRef = firebase.storage().ref();

            const childUrl = `${currentUser.user_id}/${newFileName.toString()}`;
            const uploadTask = storageRef.child(childUrl).put(file, meta);

            uploadTask.then(snapshot => snapshot.ref.getDownloadURL()).catch((err) => {
                console.warn('There was an error uploading the image', err);
                submitActions(data);
                return;
            })
            .then((url) => {
                newData = {
                    ...newData,
                    avatar: url
                }
                return submitActions(newData);
            });
        }

        return submitActions(newData);
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
