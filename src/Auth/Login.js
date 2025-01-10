import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios to make the API request
import CryptoJS from 'crypto-js'; // Import CryptoJS for encryption
import { BaseUrl } from './Url';

const Login = () => {
    const navigate = useNavigate(); // Hook to navigate programmatically
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const SECRET_KEY = 'your-secret-key'; // Replace with your own secret key

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            // For testing, set a dummy token and user data
            const dummyToken = 'dummyToken12345';
            const dummyUserData = { name: 'Test User', email: 'test@example.com' };

            // Encrypt the dummy token and user data
            const encryptedToken = CryptoJS.AES.encrypt(dummyToken, SECRET_KEY).toString();
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(dummyUserData), SECRET_KEY).toString();

            // Store encrypted token and user data in sessionStorage
            sessionStorage.setItem('authToken', encryptedToken);
            sessionStorage.setItem('userData', encryptedData);

            // Navigate to the dashboard
            navigate('/dashboard');
        } catch (error) {
            setError('An error occurred while logging in');
            console.error(error);
        }
    };


    return (
        <div className="flex min-h-screen bg-gray-100 ">
            {/* Left Side - Image */}
           

            {/* Right Side - Login Form */}
            <div className="flex items-center justify-center w-full font-serif md:w-1/2">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg animate-fadeIn">
                    <h2 className="mb-6 font-serif text-3xl font-semibold text-center text-gray-800">Login</h2>
                    <form onSubmit={handleLogin}>
                        {/* Email Input */}
                        <div className="mb-4">
                            <label className="block mb-1 text-gray-600">Email</label>
                            <input
                                type="email"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // Handle email input change
                            />
                        </div>

                        {/* Password Input */}
                        <div className="mb-6">
                            <label className="block mb-1 text-gray-600">Password</label>
                            <input
                                type="password"
                                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="Enter your password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} // Handle password input change
                            />
                        </div>

                        {/* Error Message */}
                        {error && <p className="mb-4 text-sm text-center text-red-500">{error}</p>}

                        {/* Login Button */}
                        <button
                            type="submit"
                            className="w-full px-4 py-2 text-white transition-colors duration-300 bg-blue-600 rounded-md hover:bg-blue-700"
                        >
                            Login
                        </button>
                    </form>

                    {/* Footer */}
                    <p className="mt-4 text-sm text-center text-gray-500">
                        Don't have an account?{' '}
                        <a href="#" className="text-blue-600 hover:underline">
                            Sign Up
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
