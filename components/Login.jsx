import { useState } from "react";

const Login = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        skills: "",
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate input fields
        if (!user.name || !user.email || !user.password || !user.skills) {
            alert("Please fill out all fields.");
            return;
        }

        // Convert skills to an array (comma-separated input)
        const formattedUser = {
            ...user,
            skills: user.skills.split(",").map((skill) => skill.trim()),
        };

        console.log("User Data:", formattedUser); // Send this data to API or local storage
        setSubmitted(true);
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-bold mb-4">Create Your Profile</h2>
            
            {submitted ? (
                <p className="text-green-600">Profile Created Successfully!</p>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={user.name}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={user.email}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    <input
                        type="text"
                        name="skills"
                        placeholder="Skills (comma separated)"
                        value={user.skills}
                        onChange={handleChange}
                        className="w-full p-2 border rounded"
                    />
                    
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                        Submit
                    </button>
                </form>
            )}
        </div>
    );
};

export default Login;
