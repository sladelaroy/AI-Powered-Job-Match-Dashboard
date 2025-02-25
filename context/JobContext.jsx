"use client";
import { createContext, useState, useContext, useEffect } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";


const JobContext = createContext();


export const JobProvider = ({ children }) => {
  const { data: session } = useSession(); 
  const [skills, setSkills] = useState([]);
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (session?.user?.skills) {
      setSkills(session.user.skills); 
    }
  }, [session]);

  const addSkills = (newSkills) => {
    setSkills(newSkills);
  };

  console.log(skills);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('https://67bd2d24321b883e790b749b.mockapi.io/api/jobs/get/jobs');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };
  
  useEffect(() => {
    fetchJobs();
  }, [session]);

  const value = { 
    skills, 
    addSkills,
    jobs
  };

  

  return (
    <JobContext.Provider value={value}>
      {children}
    </JobContext.Provider>
  );
};


export const useJobContext = () => {
  return useContext(JobContext);
};
