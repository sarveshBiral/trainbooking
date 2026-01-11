"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login, register } from '../../lib/api';

export default function AuthPage() {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            if (isLogin) {
                const res = await login({ username, password });
                localStorage.setItem('token', res.data.token);
                router.push('/');
            } else {
                await register({ username, password });
                setIsLogin(true);
                alert('Registered! Please login.');
            }
        } catch (err) {
            alert('Error: ' + err);
        }
    };

    return (
        <div className="flex h-screen items-center justify-center bg-gray-100">
            <div className="p-8 bg-white rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        className="w-full border p-2 rounded text-black"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="w-full border p-2 rounded text-black"
                        placeholder="Password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className="w-full bg-blue-600 text-white p-2 rounded">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>
                <button
                    className="mt-4 text-sm text-blue-500 hover:underline text-black"
                    onClick={() => setIsLogin(!isLogin)}
                >
                    {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
                </button>
            </div>
        </div>
    );
}
