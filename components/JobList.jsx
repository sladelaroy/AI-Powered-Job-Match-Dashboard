"use client";
import React, { useState } from "react";
import JobDetails from "./JobDetails"; // Import the JobDetails component
import { useJobContext } from "@/context/JobContext";

const JobList = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const { skills, jobs } = useJobContext();

  const jobData = jobs;

  const calculateMatchScore = (requiredSkills) => {
    const totalRequiredSkills = requiredSkills.length;
    const matchedSkills = requiredSkills.filter((skill) =>
      skills.includes(skill)
    ).length;
    return totalRequiredSkills > 0
      ? Math.round((matchedSkills / totalRequiredSkills) * 100)
      : 0;
  };

  const getMatchColor = (score) => {
    if (score >= 80) return "bg-green-500";
    if (score >= 50) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Job Recommendations</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {jobData.map((job) => {
          const matchScore = calculateMatchScore(job.requiredSkills); // Calculate match score dynamically

          return (
            <div
              key={job.id}
              className="bg-white p-4 rounded-lg shadow-md cursor-pointer"
              onClick={() => setSelectedJob({ ...job, matchScore })} // Pass the match score along with the job
            >
              <h2 className="text-lg font-bold">{job.title}</h2>
              <p>{job.company}</p>
              <p>{job.location}</p>
              <p>{job.salary}</p>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className={`h-4 rounded-full ${getMatchColor(matchScore)}`}
                    style={{ width: `${matchScore}%` }}
                  ></div>
                </div>
                <p className="mt-1">{`Match Score: ${matchScore}%`}</p>
              </div>
            </div>
          );
        })}
      </div>

      {selectedJob && (
        <JobDetails job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default JobList;
