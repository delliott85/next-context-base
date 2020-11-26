import PropTypes from 'prop-types';

import { useStateValue } from '../../state';

export default function EditProfileForm({ onFormSubmit, onRemoveLinkClick }) {
    const [{ profile }] = useStateValue();

    let profileLinks
    if (profile.links.length) {
        profileLinks = profile.links.map((link, i) => {
            return (
                <li key={`link-${i}`}>
                    <button onClick={onRemoveLinkClick}>{link}</button>
                </li>
            );
        });
    }

    return (
        <form
            onSubmit={onFormSubmit}
        >
            <div>
                {profile.avatar &&
                    <div>
                        <img src={profile.avatar} alt="" />
                    </div>
                }
                <label htmlFor="avatar">Profile Picture</label>
                <input
                    type="file"
                    name="avatar"
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
                <label>Links</label>
                {profileLinks &&
                    <ul>
                        {profileLinks}
                    </ul>
                }
                <input type="url" name="link" />
            </div>
            <div>
                <button type="submit">Save</button>
            </div>
        </form>
    );
}

EditProfileForm.propTypes = {
    onFormSubmit: PropTypes.func,
    onRemoveLinkClick: PropTypes.func
};
