// components/Footer.js
import { MAIN_WEBSITE } from '@/lib/assets/assets';
import { Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#2f1889] text-white py-12 px-6 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* Company Info */}
                <div className="space-y-6">
                    <Image src={MAIN_WEBSITE.logo} height={80} width={180} alt="logo" />
                    <div className="flex items-start space-x-3">
                        <MapPin className="mt-1" />
                        <div>
                            <p>10, Shiva Compound,</p>
                            <p>Delhi-UP border, Ghaziabad</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Phone />
                        <p>+91 72487 72488</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Mail />
                        <p>book@tapscabs.com</p>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-3 text-gray-300">
                        <li>
                            <Link href="/" className="hover:text-white transition">
                                Home
                            </Link>
                        </li>
                        <li>
                            <Link href="/#why-us" className="hover:text-white transition">
                                Why Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/#testimonials" className="hover:text-white transition">
                                Testimonials
                            </Link>
                        </li>
                        <li>
                            <Link href="/blogs" className="hover:text-white transition">
                                Blogs
                            </Link>
                        </li>
                        <li>
                            <Link href="/#contact" className="hover:text-white transition">
                                Contact
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* Newsletter or Social */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Stay Connected</h3>
                    <p className="text-gray-300 mb-4">
                        Subscribe to our newsletter for exclusive offers and updates.
                    </p>
                    {/* <form className="flex">
                        <input
                            type="email"
                            placeholder="Your email"
                            className="flex-1 px-4 py-2 rounded-l-lg focus:outline-none"
                        />
                        <button
                            type="submit"
                            className="bg-blue-600 px-4 py-2 rounded-r-lg hover:bg-blue-700 transition"
                        >
                            Subscribe
                        </button>
                    </form> */}
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="mt-10 border-t border-gray-700 pt-6 text-center space-y-2">
                <p className="text-sm text-gray-400">
                    © 2025 <span className="font-bold">Taps Cabs</span>. All rights reserved.
                </p>
                <p className="text-sm text-gray-400">
                    Designed by{' '}
                    <Link
                        href="https://matchbestsoftware.com/"
                        target="_blank"
                        className="font-bold text-white hover:text-gray-300 transition"
                    >
                        Matchbest Software
                    </Link>
                </p>
            </div>
        </footer>
    );
}
