"use client";
import { useEffect, useState } from 'react';
import { getHistory } from '../../lib/api';

export default function BookingsPage() {
    const [bookings, setBookings] = useState<any[]>([]);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            getHistory(token).then(res => setBookings(res.data)).catch(console.error);
        }
    }, []);

    return (
        <div className="p-8 bg-gray-50 min-h-screen text-black">
            <h1 className="text-3xl font-bold mb-6">My Bookings</h1>
            <div className="space-y-4">
                {bookings.map((b: any) => (
                    <div key={b.id} className="bg-white p-4 rounded shadow flex justify-between items-center">
                        <div>
                            <h3 className="font-bold text-lg">{b.train}</h3>
                            <p className="text-gray-600">Date: {b.date}</p>
                        </div>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Confirmed</span>
                    </div>
                ))}
                {bookings.length === 0 && <p>No bookings found.</p>}
            </div>
        </div>
    );
}
