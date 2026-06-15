import SkillBadge from "./SkillBadge";
import "./SkillList.css";

function SkillList({ skills, dark }) {
    return (
        <div className="skill-list">
            <p className={`skill-list-title ${dark ? "dark" : ""}`}>Skills</p>  
            <div className="skill-list-container">
                {skills.map((skill, index) => (
                    <SkillBadge key={index} skill={skill} dark={dark} />
                ))}
            </div>
        </div>
    );
}

export default SkillList;