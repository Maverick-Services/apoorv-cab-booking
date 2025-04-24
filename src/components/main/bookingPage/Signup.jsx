"use client"
import React, { useState } from 'react'

function Signup() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const handleSignup = async (e) => {
    }
    return (
        <div className=" w-full mx-auto">
            <h2 className="text-3xl font-bold text-[#007BFF] mb-1">Join Us Now</h2>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Create an Account</h1>

            <form onSubmit={handleSignup} className="space-y-5">
                <input
                    type="text"
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="8"
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                    type="submit"
                    className="w-full bg-[#007BFF] hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition"
                >
                    {loading ? "Loading..." : "GET STARTED"}
                </button>
            </form>

        </div>
    )
}

export default Signup
