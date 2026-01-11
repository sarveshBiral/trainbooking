"use client";
import { useEffect, useState } from 'react';
import { getAdminStats } from '../../lib/api';

export default function AdminPage() {
    const [stats, setStats] = useState<any>(null);

    useEffect(() => {
        getAdminStats().then(res => setStats(res.data)).catch(console.error);
    }, []);

    if (!stats) return <div className="p-8 text-black">Loading Admin Dashboard...</div>;

    return (
        <div className="p-8 bg-gray-50 min-h-screen text-black">
            <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded shadow border-l-4 border-blue-500">
                    <h3 className="text-gray-500">Total Users</h3>
                    <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
                <div className="bg-white p-6 rounded shadow border-l-4 border-green-500">
                    <h3 className="text-gray-500">Active Bookings</h3>
                    <p className="text-2xl font-bold">{stats.activeBookings}</p>
                </div>
                <div className="bg-white p-6 rounded shadow border-l-4 border-yellow-500">
                    <h3 className="text-gray-500">Revenue</h3>
                    <p className="text-2xl font-bold">${stats.revenue}</p>
                </div>
                <div className="bg-white p-6 rounded shadow border-l-4 border-purple-500">
                    <h3 className="text-gray-500">System Health</h3>
                    <p className="text-2xl font-bold">{stats.systemHealth}</p>
                </div>
            </div>
        </div>
    );
}
