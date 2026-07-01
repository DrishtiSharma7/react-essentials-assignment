import "./CardFooter.css";
import {Sun, Moon, ArrowLeft, ArrowRight, Heart} from "lucide-react";

function CardFooter({ dark, likes, liked, profileIndex, totalProfiles, onLike, onContact, onNext, onPrevious }) {
    return (
        <div className={`card-footer ${dark ? "dark" : "light"}`}>
            <span className="theme-indicator">
                {dark ? <Moon size={16} /> : <Sun size={16} />}
                <span>{dark ? " Dark Mode" : " Light Mode"}</span>
            </span>
            <div className="footer-navigation">
                <button className={`nav-button ${dark ? "dark" : "light"}`} onClick={onPrevious} disabled={profileIndex === 0}>
                    <ArrowLeft size={16} />
                </button>
                <span className="profile-counter">
                    {profileIndex + 1} / {totalProfiles}
                </span>
                <button className={`nav-button ${dark ? "dark" : "light"}`} onClick={onNext} disabled={profileIndex === totalProfiles - 1}>
                    <ArrowRight size={16} />
                </button>
            </div>
            <div className="footer-actions">
                <button className={`like-button ${liked ? "liked" : dark ? "dark" : "light"}`} onClick={onLike}>
                    <Heart size={16} fill={liked ? "#e74c3c" : "none"} color={liked ? "#e74c3c" : "#c7c7c7"} />
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