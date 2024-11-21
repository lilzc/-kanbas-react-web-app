import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as client from './client';
import { setCurrentUser } from './reducer';
import { User } from './types';

export default function Profile() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const [profile, setProfile] = useState<User>(currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const updateProfile = async () => {
        try {
            if (!profile._id) return;
            const updatedUser = await client.updateUser(profile._id, profile);
            dispatch(setCurrentUser(updatedUser));
            navigate('/Kanbas/Dashboard');
        } catch (err) {
            console.error(err);
        }
    };

  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kanbas/Account/Signin");
};

    return (
        <div id="wd-profile-screen">
            <h3>Profile</h3>
            {profile && (
                <div>
                    <input
                        value={profile.username}
                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                        className="form-control mb-2"
                    />
                    <input
                        value={profile.firstName}
                        onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                        className="form-control mb-2"
                    />
                    <input
                        value={profile.lastName}
                        onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                        className="form-control mb-2"
                    />
                    <input
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="form-control mb-2"
                        type="email"
                    />
                    <button onClick={updateProfile} className="btn btn-primary w-100 mb-2">
                        Update
                    </button>
                     <button onClick={signout} className="btn btn-danger w-100">
                        Sign out
                    </button>
                </div>
            )}
        </div>
    );
}