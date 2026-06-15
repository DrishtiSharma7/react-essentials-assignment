import "./CardFooter.css";

function CardFooter({ dark, likes, liked, profileIndex, totalProfiles, onLike, onContact, onNext, onPrevious }) {
    return (
        <div className={`card-footer ${dark ? "dark" : "light"}`}>
            <span className="theme-indicator">
                {dark ? "🌖 Dark Mode " : "☀️ Light Mode "}
            </span>
            <div className="footer-navigation">
                <button className="nav-button" onClick={onPrevious} disabled={profileIndex === 0}>
                    ⬅️
                </button>
                <span className="profile-counter">
                    {profileIndex + 1} / {totalProfiles}
                </span>
                <button className="nav-button" onClick={onNext} disabled={profileIndex === totalProfiles - 1}>
                    ➡️
                </button>
            </div>
            <div className="footer-actions">
                <button className={`like-button ${liked ? "liked" : dark ? "dark" : "light"}`} onClick={onLike}>
                    <span className="like-icon">{liked ? "❤️" : "🤍"}</span>
                    <span className="like-count">{likes}</span>
                </button>
                <button className="contact-button" onClick={onContact}>
                    Contact
                </button>
            </div>
        </div>
    );
}

export default CardFooter;