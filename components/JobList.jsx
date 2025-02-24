import JobCard from "./JobCard";
import { useEffect, useState } from "react";

const JobList = () => {
    const [jobs, setJobs] = useState([]);

    useEffect(() => {
        fetch("/data/jobs.json") // Fetch from local mock data
            .then(res => res.json())
            .then(data => setJobs(data));
    }, []);

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {jobs.map(job => (
                <JobCard key={job.id} job={job} />
            ))}
        </div>
    );
};

export default JobList;
