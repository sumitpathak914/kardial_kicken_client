import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CryptoJS from 'crypto-js';
import { BaseUrl } from './Url';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const SECRET_KEY = 'your-secret-key';

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const dummyToken = 'dummyToken12345';
            const dummyUserData = { name: 'Test User', email: 'abc@gmail.com' };

            const encryptedToken = CryptoJS.AES.encrypt(dummyToken, SECRET_KEY).toString();
            const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(dummyUserData), SECRET_KEY).toString();

            sessionStorage.setItem('authToken', encryptedToken);
            sessionStorage.setItem('userData', encryptedData);

            navigate('/dashboard');
        } catch (error) {
            setError('An error occurred while logging in');
            console.error(error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen text-gray-800 bg-gradient-to-br from-purple-300 to-purple-300">
            {/* Decorative Side Section */}
            <div className="relative hidden w-1/2 h-full bg-purple-100 lg:block bg-opacity-40">
                <div className="absolute top-16 left-20">
                    <h1 className="text-4xl font-extrabold leading-tight text-purple-600">
                        Welcome <br /> Back!
                    </h1>
                    <p className="mt-4 text-lg text-gray-700">
                        We're glad to have you back. <br /> Log in to continue exploring.
                    </p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-64 bg-purple-500 rounded-tl-full opacity-50"></div>
            </div>

            {/* Login Form Section */}
            <div className="w-full max-w-lg p-8 text-gray-900 bg-white shadow-lg rounded-xl">
                <h2 className="mb-6 text-3xl font-bold text-center text-purple-500">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full p-3 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    {error && <p className="mb-4 text-sm text-center text-red-500">{error}</p>}
                    <button
                        type="submit"
                        className="w-full px-4 py-3 text-white transition bg-purple-400 rounded-lg hover:bg-purple-500"
                    >
                        Log In
                    </button>
                </form>
                <p className="mt-6 text-sm text-center text-gray-500">
                    Don't have an account?{' '}
                    <a href="#" className="text-purple-600 hover:underline">
                        Sign Up
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Login;
