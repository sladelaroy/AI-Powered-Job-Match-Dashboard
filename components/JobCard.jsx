import MatchScore from "./MatchScore";
import Link from "next/link";

const JobCard = ({ job }) => {
    return (
        <div className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-bold">{job.title}</h3>
            <p className="text-gray-600">{job.company} - {job.location}</p>
            <p className="text-gray-700">{job.salary}</p>
            <MatchScore score={job.matchScore} />
            <Link href={`/job/${job.id}`} className="text-blue-500 mt-2 inline-block">View Details</Link>
        </div>
    );
};

export default JobCard;
