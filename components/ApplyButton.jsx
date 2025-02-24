const ApplyButton = ({ job }) => {
  const userSkills = ["React", "JavaScript", "Next.js"]; // Mock user skills

  const handleApply = () => {
      const missingSkills = job.requiredSkills.filter(skill => !userSkills.includes(skill));
      if (missingSkills.length > 0) {
          alert(`You are missing: ${missingSkills.join(", ")}. Consider upskilling!`);
      } else {
          alert("Application submitted successfully!");
      }
  };

  return (
      <button onClick={handleApply} className="mt-4 bg-blue-500 text-white p-2 rounded-lg">
          Apply Now
      </button>
  );
};

export default ApplyButton;
