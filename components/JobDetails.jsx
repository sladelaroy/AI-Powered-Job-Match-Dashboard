import { useRouter } from "next/router";
import jobData from "../../data/jobs.json";
import ApplyButton from "../../components/ApplyButton";

const JobDetails = () => {
    const router = useRouter();
    const { id } = router.query;
    const job = jobData.find(job => job.id === parseInt(id));

    if (!job) return <p>Loading...</p>;

    return (
        <div className="p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-xl font-bold">{job.title}</h2>
            <p>{job.company} - {job.location}</p>
            <p>{job.salary}</p>
            <p><strong>Required Skills:</strong> {job.requiredSkills.join(", ")}</p>
            <ApplyButton job={job} />
        </div>
    );
};

export default JobDetails;
