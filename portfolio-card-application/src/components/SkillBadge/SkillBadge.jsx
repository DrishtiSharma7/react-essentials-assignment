import "./SkillBadge.css";

function SkillBadge({ skill, dark }) {
    return (
        <span className={`skill-badge ${dark ? "dark" : "light"}`}>
            {skill}
        </span>
    );
}

export default SkillBadge;