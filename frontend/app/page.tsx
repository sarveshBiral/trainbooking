"use client";
import { useState } from 'react';
import { searchTrains, bookSeat } from '../lib/api';
import Link from 'next/link';

export default function Home() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [trains, setTrains] = useState<any[]>([]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await searchTrains(from, to);
      setTrains(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBook = async (trainId: string) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login first');
      return;
    }
    try {
      await bookSeat({ userId: 'user-id-from-token', trainId, seats: 1 });
      alert('Booking Successful!');
    } catch (err) {
      alert('Booking Failed');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-black">
      <nav className="bg-blue-600 p-4 text-white flex justify-between">
        <h1 className="text-xl font-bold">TrainBooking</h1>
        <div className="space-x-4">
          <Link href="/auth">Login</Link>
          <Link href="/bookings">My Bookings</Link>
          <Link href="/admin">Admin</Link>
        </div>
      </nav>

      <main className="p-8 max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded shadow mb-8">
          <h2 className="text-2xl font-bold mb-4">Find your Train</h2>
          <form onSubmit={handleSearch} className="flex gap-4">
            <input
              className="flex-1 border p-2 rounded"
              placeholder="From (e.g., New York)"
              value={from} onChange={(e) => setFrom(e.target.value)}
            />
            <input
              className="flex-1 border p-2 rounded"
              placeholder="To (e.g., Boston)"
              value={to} onChange={(e) => setTo(e.target.value)}
            />
            <button className="bg-blue-600 text-white px-6 py-2 rounded font-bold">Search</button>
          </form>
        </div>

        <div className="space-y-4">
          {trains.map((t: any) => (
            <div key={t.id} className="bg-white p-6 rounded shadow flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold">{t.name}</h3>
                <p className="text-gray-600">{t.source} ➔ {t.destination}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">${t.price}</p>
                <button
                  onClick={() => handleBook(t.id)}
                  className="bg-green-500 text-white px-4 py-2 rounded mt-2"
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
