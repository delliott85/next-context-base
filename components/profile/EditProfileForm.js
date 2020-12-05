import PropTypes from 'prop-types';

import { useStateValue } from '../../state';

export default function EditProfileForm({ onFormSubmit }) {
    const [{ profile }] = useStateValue();

    return (
        <form
            onSubmit={onFormSubmit}
        >
            <div>
                <label htmlFor="avatar">Profile Picture</label>
                <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                />
            </div>
            <div>
                <label htmlFor="banner">Banner</label>
                <input
                    type="file"
                    name="banner"
                    accept="image/*"
                />
            </div>
            <div>
                <label htmlFor="name">Display Name</label>
                <input type="text" name="name" defaultValue={profile.name} />
            </div>
            <div>
                <label htmlFor="location">Location</label>
                <input type="text" name="location" defaultValue={profile.location} />
            </div>
            <div>
                <label htmlFor="bio">Bio</label>
                <textarea name="bio" defaultValue={profile.bio} />
            </div>
            <div>
                <button type="submit">Save</button>
            </div>
        </form>
    );
}

EditProfileForm.propTypes = {
    onFormSubmit: PropTypes.func
};
