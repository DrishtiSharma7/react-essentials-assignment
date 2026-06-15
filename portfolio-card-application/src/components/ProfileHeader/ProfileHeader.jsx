import "./ProfileHeader.css";

const ProfileHeader = ({ profile, dark }) => {
    return (
        <div className={`profile-header ${dark ? "dark" : "light"}`}>
            <div className="profile-header-left">
                <img src={profile.image} 
                    alt={profile.name} 
                    className="profile-image" />
                <div className="profile-info">
                    <h1 className={`profile-name ${dark ? "dark" : "light"}`}>
                        {profile.name}
                    </h1>
                    <p className={`profile-title ${dark ? "dark" : "light"}`}>
                        {profile.title}
                    </p>
                </div>
            </div>
            <p className={`profile-bio ${dark ? "dark" : "light"}`}>
                {profile.bio}
            </p>
        </div>
    );
}

export default ProfileHeader;