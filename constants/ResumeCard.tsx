import React from "react";
import {Link} from "react-router";
import ScoreCircle from "./ScoreCircle";

const FALLBACK_IMAGE = "/images/resume-scan.gif";

const ResumeCard = ({ resume:{id,companyName,jobTitle,feedback, imagePath }}:{resume: Resume }) => {
    const [imgSrc, setImgSrc] = React.useState(imagePath || FALLBACK_IMAGE);

    return (
        <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
            <div className="resume-card-header">
            <div className="flex flex-col gap-2">
                <h2 className="!text-black font-bold break-words"> {companyName}</h2>
                <h3 className="!text-black font-bold break-words"> {jobTitle}</h3>
            </div>
            <div className="flex-shrink-0">
                <ScoreCircle score={feedback.overallScore} />
            </div>
            </div>
            <div className="gradient-border animate-in fade-in duration-1000">
                <div className="w-full h-full">
                    <img
                        src={imgSrc}
                        alt={`${companyName} - ${jobTitle} resume preview`}
                        loading="lazy"
                        onError={() => setImgSrc(FALLBACK_IMAGE)}
                        className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
                        />
                </div>
            </div>
        </Link>
    )
}
export default ResumeCard;