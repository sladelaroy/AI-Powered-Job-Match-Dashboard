import { useState } from 'react';
import axios from 'axios';

const techSkills = [
    'React.js', 'Figma', 'Node.js', 'Python', 'GraphQL', 
    'JavaScript', 'HTML', 'CSS', 'Vue.js', 'Angular', 
    'Django', 'Flask', 'Ruby on Rails', 'Swift', 'Kotlin'
];

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [mode, setMode] = useState('login'); // 'login' or 'register'

    const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isValidPassword = (password) => password.length >= 8;

    const isFormValid = mode === 'login' 
        ? isValidEmail(email) && isValidPassword(password)
        : name.trim() !== '' && isValidEmail(email) && isValidPassword(password) && selectedSkills.length > 0;

    const handleSubmit = async (event) => {
        event.preventDefault();
        const url = mode === 'login' ? 'https://example.com/api/login' : 'https://example.com/api/register';
        const payload = mode === 'login' 
            ? { email, password } 
            : { name, email, password, skills: selectedSkills };

        try {
            const response = await axios.post(url, payload);
            console.log(response.data.success ? `User ${mode}ed successfully.` : `Failed to ${mode}.`);
        } catch (error) {
            console.error(`An error occurred while ${mode}ing:`, error);
        }
    };

    const handleSkillSelect = (skill) => {
        if (!selectedSkills.includes(skill) && selectedSkills.length < 4) {
            setSelectedSkills([...selectedSkills, skill]);
        }
    };

    const handleSkillRemove = (skill) => {
        setSelectedSkills(selectedSkills.filter(s => s !== skill));
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50 px-6">
            <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md sm:w-3/4 md:w-1/2 lg:w-1/3">
                <h1 className="text-2xl font-semibold text-gray-800 mb-5 text-center">
                    {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
                </h1>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {mode === 'register' && (
                        <div>
                            <label className="block text-gray-700 font-medium">Name</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                required
                            />
                        </div>
                    )}

                    <div>
                        <label className="block text-gray-700 font-medium">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 ${
                                isValidEmail(email) ? 'focus:ring-blue-500' : 'focus:ring-red-500 border-red-400'
                            }`}
                            required
                        />
                        {!isValidEmail(email) && email.length > 0 && (
                            <p className="text-red-500 text-sm mt-1">Enter a valid email address.</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 ${
                                isValidPassword(password) ? 'focus:ring-blue-500' : 'focus:ring-red-500 border-red-400'
                            }`}
                            required
                        />
                        {!isValidPassword(password) && password.length > 0 && (
                            <p className="text-red-500 text-sm mt-1">Password must be at least 8 characters.</p>
                        )}
                    </div>

                    {mode === 'register' && (
                        <div>
                            <label className="block text-gray-700 font-medium">Tech Skills</label>
                            <select
                                onChange={(e) => handleSkillSelect(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                                defaultValue=""
                            >
                                <option value="" disabled>Select a skill</option>
                                {techSkills.map(skill => (
                                    <option key={skill} value={skill}>{skill}</option>
                                ))}
                            </select>
                            <div className="mt-3">
                                <p className={`text-sm ${selectedSkills.length < 4 ? 'text-gray-500' : 'text-red-600'}`}>
                                    {selectedSkills.length < 4 ? "You can select up to 4 skills" : "Maximum skills selected"}
                                </p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {selectedSkills.map(skill => (
                                        <div key={skill} className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-full shadow-sm">
                                            {skill}
                                            <button type="button" 
                                                onClick={() => handleSkillRemove(skill)} 
                                                className="ml-2 text-white hover:text-red-300 transition duration-200"
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={!isFormValid}
                        className={`w-full py-2 rounded-md font-semibold shadow-sm transition duration-300 ${
                            isFormValid 
                                ? "bg-blue-600 text-white hover:bg-blue-700"
                                : "bg-gray-400 text-gray-200 cursor-not-allowed"
                        }`}
                    >
                        {mode === 'login' ? 'Login' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-4 text-center">
                    <p>
                        {mode === 'login' ? "Don't have an account?" : "Already have an account?"} 
                        <button 
                            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                            className="text-blue-600 font-bold ml-1"
                        >
                            {mode === 'login' ? 'Sign Up' : 'Login'}
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
