"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useJobContext } from "@/context/JobContext";

const JobDetails = ({ job, onClose }) => {
  const { skills } = useJobContext();
  const userSkills = skills;
  const router = useRouter();
  const [isModalVisible, setIsModalVisible] = useState(true);

  const handleApplyNow = () => {
    const missingSkills = job.requiredSkills.filter(
      (skill) => !userSkills.includes(skill)
    );

    if (missingSkills.length > 0) {
      toast(
        `You are missing the following skills: ${missingSkills.join(
          ", "
        )}. Consider upskilling!`,
        {
          icon: "⚠️",
          style: {
            backgroundColor: "#FFF3CD", // Warning background color
            color: "#856404" // Warning text color
          },
          duration: 4000 // optional: duration in milliseconds
        }
      );
    } else {
      setIsModalVisible(false); // Close modal when application is successful
      onClose(); // Call onClose to reset the selected job in JobList
      toast.success("Successfully applied for the job!");
      router.push("/"); // Redirect to home or applications
    }
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center p-4 sm:p-6 transition-opacity duration-500 ease-in-out ${
        isModalVisible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-lg transition-transform duration-500 ease-in-out">
        <button
          className="text-red-500 text-sm font-semibold float-right"
          onClick={onClose}
        >
          ✖ Close
        </button>
        <h2 className="text-xl sm:text-2xl font-bold mb-3">{job.title}</h2>
        <p className="text-sm sm:text-base mb-2">
          <strong>Company:</strong> {job.company}
        </p>
        <p className="text-sm sm:text-base mb-2">
          <strong>Location:</strong> {job.location}
        </p>
        <p className="text-sm sm:text-base mb-2">
          <strong>Salary:</strong> {job.salary}
        </p>
        <p className="text-sm sm:text-base mb-2">
          <strong>Match Score:</strong> {job.matchScore}%
        </p>
        <h3 className="text-lg sm:text-xl font-bold mt-4">Required Skills</h3>
        <ul className="list-disc pl-4 mb-4 text-sm sm:text-base">
          {job.requiredSkills.map((skill, index) => (
            <li key={index}>{skill}</li>
          ))}
        </ul>
        <button
          onClick={handleApplyNow}
          className="w-full bg-blue-500 text-white py-2 rounded-lg text-sm sm:text-base hover:bg-blue-600 transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
