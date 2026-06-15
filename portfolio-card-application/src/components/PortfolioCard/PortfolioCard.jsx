import { useState } from 'react';
import ProfileHeader from '../ProfileHeader/ProfileHeader.jsx';
import SkillList from '../SkillBadge/SkillList';
import CardFooter from '../CardFooter/CardFooter';     
import profiles from '../../data/profiles';
import "./PortfolioCard.css";

function PortfolioCard({ dark }) {
    const [profileIndex, setProfileIndex] = useState(0);
    const [likes, setLikes] = useState(11);
    const [liked, setLiked] = useState(false);

    const profile = profiles[profileIndex];

    const handlePrev = () => {
        setProfileIndex((prevIndex) => (prevIndex === 0 ? profiles.length - 1 : prevIndex - 1));
        setLiked(false);
        setLikes(11);
    };

    const handleNext = () => {
        setProfileIndex((prevIndex) => (prevIndex === profiles.length - 1 ? 0 : prevIndex + 1));
        setLiked(false);
        setLikes(11);
    };

    const handleLike = () => {
        if (!liked) {
            setLikes((prevLikes) => prevLikes + 1);
            setLiked(true);
        }
    };

    const handleContact = () => {
        alert(`Contacting ${profile.name}...`);
    };

    return (
        <div className={`portfolio-card ${dark ? "dark" : "light"}`}>
            <ProfileHeader profile={profile} dark={dark} />
            <SkillList skills={profile.skills} dark={dark} />
            <div className={`card-divider ${dark ? "dark" : "light"}`}/>
            <CardFooter
                dark={dark}
                likes={likes}
                liked={liked}
                profileIndex={profileIndex}
                totalProfiles={profiles.length}
                onLike={handleLike}
                onContact={handleContact}
                onPrevious={handlePrev}
                onNext={handleNext}
            />
        </div>
    );
}

export default PortfolioCard;