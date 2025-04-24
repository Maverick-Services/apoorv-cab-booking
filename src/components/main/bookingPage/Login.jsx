"use client"
import React, { useState } from 'react'

function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true)

        // your login logic here

        setLoading(false)
    }

    return (
        <div className=" w-full mx-auto">
            <h2 className="text-3xl font-bold text-[#007BFF] mb-1">Welcome Back</h2>
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Log In to Your Account</h1>

            <form onSubmit={handleLogin} className="space-y-5">
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
                    {loading ? "Logging in..." : "LOG IN"}
                </button>
            </form>
        </div>
    )
}

export default Login
