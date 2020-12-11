import { Fragment, useEffect, useState } from 'react';
import firebase, { updateFirestore } from '../api';
import { useRouter } from 'next/router';

import { useStateValue } from '../state';
import { userLogin } from '../reducer/currentUser';
import { updateProfile } from '../reducer/profile';

import { setLocalStorage } from '../utils';

import EditProfileForm from '../components/profile/EditProfileForm';

export default function Profile() {
    const [pageRendered, setPageRender] = useState(false);
    const [{ currentUser, profile }, dispatch] = useStateValue();

    const router = useRouter();

    useEffect(() => {
        if (!currentUser.isLoggedIn) {
            router.push('/login');
            return;
        }

        if (Object.keys(profile).length === 0) {
            const profileRef = firebase.firestore().collection('profiles').doc(currentUser.username);
            profileRef.get().then((profileData) => {
                dispatch(updateProfile(profileData.data()));
                setPageRender(true);
            }).catch((err) => {
                console.log('There was an error fetching the profile', err);
            });
            return;
        }

        setPageRender(true);
        return;
    }, []);

    if (!pageRendered) {
        return <h1>Loading....</h1>
    };

    const submitActions = (newData) => {
        updateFirestore('profiles', currentUser.username, newData).then(() => {
            dispatch(updateProfile(newData));
        });
    }

    const fileUpload = (file) => {
        const newFileName = Date.now();
        const meta = { contentType: file.type };

        const storageRef = firebase.storage().ref();

        const childUrl = `${currentUser.user_id}/${newFileName.toString()}`;
        const uploadTask = storageRef.child(childUrl).put(file, meta);

        return uploadTask;
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();

        const form = e.currentTarget;
        const name = form.name.value;
        const location = form.location.value;
        const bio = form.bio.value;
        const avatar = form.avatar.files[0];
        const banner = form.banner.files[0];

        let newData = {
            location,
            bio,
            name
        }

        let avatarPromise;
        let bannerPromise;

        if (avatar) {
            avatarPromise = new Promise((resolve, reject) => {
                resolve(
                    fileUpload(avatar).then(snapshot => snapshot.ref.getDownloadURL()).catch((err) => {
                        console.warn('There was an error uploading the image', err);
                        return;
                    })
                    .then((url) => {
                        newData = {
                            ...newData,
                            avatar: url
                        }

                        const updateUser = new Promise((resolve) => {
                            resolve(updateFirestore('users', currentUser.id, { avatar: url }));
                        });

                        updateUser.then(() => {
                            dispatch(userLogin({ avatar: url }));
                            setLocalStorage('currentUser', { 
                                ...currentUser,
                                avatar: url
                            });
                        }).catch((err) => {
                            console.warn('There was an error updating the user', err);
                        })
                    })
                )
            });
        }

        if (banner) {
            bannerPromise = new Promise((resolve, reject) => {
                resolve(
                    fileUpload(banner).then(snapshot => snapshot.ref.getDownloadURL()).catch((err) => {
                        console.warn('There was an error uploading the image', err);
                        return;
                    })
                    .then((url) => {
                        newData = {
                            ...newData,
                            banner: url
                        }
                    })
                )
            });
        }

        const promises = Promise.all([avatarPromise, bannerPromise]);

        promises.then(() => {
            return submitActions(newData);
        }).then(() => {
            router.push('/');
        }).catch((err) => {
            console.warn('There was an error'. err);
        });
    }

    return (
        <Fragment>
            <h1>My Profile</h1>
            <EditProfileForm
                onFormSubmit={handleFormSubmit}
            />
        </Fragment>
    );
}
