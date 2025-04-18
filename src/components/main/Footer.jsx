import { MAIN_WEBSITE } from '@/lib/assets/assets';
import { Mail, MapPin, Phone, Facebook, Instagram, Youtube } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-[#0F253B] text-white py-12 px-6 md:px-16">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
                {/* Company Info */}
                <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                        <Image
                            src={MAIN_WEBSITE.logo}
                            height={80}
                            width={180}
                            alt='logo'
                        />
                    </div>
                    <div className="flex items-start space-x-3">
                        <MapPin className="mt-1" />
                        <div>
                            <p>10, Shiva Compound ,</p>
                            <p>Delhi-UP border , Ghaziabad</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Phone />
                        <p>+917248772488</p>
                    </div>
                    <div className="flex items-center space-x-3">
                        <Mail />
                        <p>book@tapscabs.com</p>
                    </div>
                </div>

                {/* Our Product */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Our Product</h3>
                    <ul className="space-y-2 text-gray-300">
                        <li>Career</li>
                        <li>Car</li>
                        <li>Packages</li>
                        <li>Features</li>
                        <li>Priceline</li>
                    </ul>
                </div>

                {/* Resources */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Resources</h3>
                    <ul className="space-y-2 text-gray-300">
                        <li>Download</li>
                        <li>Help Centre</li>
                        <li>Guides</li>
                        <li>Partner Network</li>
                        <li>Cruises</li>
                        <li>Developer</li>
                    </ul>
                </div>

                {/* About Rentcars */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">About Tapcabs</h3>
                    <ul className="space-y-2 text-gray-300">
                        <li>Why choose us</li>
                        <li>Our Story</li>
                        <li>Investor Relations</li>
                        <li>Press Center</li>
                        <li>Advertise</li>
                    </ul>
                </div>

                {/* Follow Us */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
                    <div className="flex space-x-4 text-gray-300">
                        <Facebook className="w-6 h-6" />
                        <Instagram className="w-6 h-6" />
                        <Youtube className="w-6 h-6" />
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-700 mt-10 pt-6 text-sm text-gray-400 text-center">
                <p>Copyright 2025 • <Link href={'https://maverickservices.in/'} target='_blank'>Maverick</Link>, All Rights Reserved</p>
            </div>
        </footer>
    );
}
