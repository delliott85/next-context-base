import { Fragment } from 'react';
import PropTypes from 'prop-types';

export default function AccountSettings({ onFormSubmit }) {
    return (
        <Fragment>
            <div>
                <h2>Change Email</h2>
                <form
                    data-type="email-change"
                    onSubmit={onFormSubmit}
                >
                    <div>
                        <label htmlFor="new-email">New Email</label>
                        <input type="email" name="new" />
                    </div>
                    <div>
                        <label htmlFor="confirm-email">Confirm Email</label>
                        <input type="email" name="confirm" />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <div>
                <h2>Change Password</h2>
                <form
                    data-type="password-change"
                    onSubmit={onFormSubmit}
                >
                    <div>
                        <label htmlFor="new-password">New Password</label>
                        <input type="password" name="new" />
                    </div>
                    <div>
                        <label htmlFor="confirm-password">Confirm Password</label>
                        <input type="password" name="confirm" />
                    </div>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
            <div>
                <h2>Delete Account</h2>
                <form
                    data-type="delete-account"
                    onSubmit={onFormSubmit}
                >
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </Fragment>
    );
}

AccountSettings.propTypes = {
    onFormSubmit: PropTypes.func
};
