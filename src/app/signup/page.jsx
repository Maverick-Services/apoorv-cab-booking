'use client'

import { Link } from 'lucide-react';
import { ReactLoading } from 'react-loading';
import React, { useState } from 'react';
import { signup } from '@/lib/firebase/services/auth';
import { useRouter } from 'next/navigation';

function page() {

    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("");
    // const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true)
        const response = await signup(name, email, 8700381153, password, "User");
        if (response) {
            router.push('/')
        }
        setLoading(false);
    };

    return (
        <div>
            <form onSubmit={handleSignup} className="space-y-4">
                <input
                    type="text"
                    placeholder="Enter Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#f9fafb] text-lg rounded-xl focus:outline-none"
                />
                <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#f9fafb] text-lg rounded-xl focus:outline-none"
                />
                <input
                    type="password"
                    placeholder="Set Password"
                    value={password}
                    minLength="8"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 bg-[#f9fafb] text-lg rounded-xl focus:outline-none"
                />
                <p className="text-base text-greyText">By continuing you agree to AI Mavs's <Link to={'/t&c'} className="text-purpleText underline">Terms & Conditions</Link>  and <Link to={'/privacyPolicy'} className="text-purpleText underline"> Privacy Policy</Link></p>

                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-mainPurple font-bold rounded-xl text-xl hover:bg-mainPurpleDark transition duration-300 dark:bg-dark-primary dark:hover:bg-dark-primary-light text-center flex items-center justify-center"
                >
                    Signup
                    {/* {loading ?
                        <ReactLoading type={"bars"} color={"white"} height={'30px'} width={'30px'} />
                        : 'Signup'
                    } */}
                </button>
            </form>
        </div>
    )
}

export default page