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

                {/* Cab from Delhi */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Cab from Delhi</h3>
                    <ul className="space-y-2 text-gray-300">
                        <li>Taxi from Delhi to Agra</li>
                        <li>Taxi from Delhi to Jaipur</li>
                        <li>Taxi from Delhi to Chandigarh</li>
                        <li>Taxi from Delhi to Amritsar</li>
                        <li>Taxi from Delhi to Manali</li>
                    </ul>
                </div>

                {/* Cab from Bangalore */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Cab from Bangalore</h3>
                    <ul className="space-y-2 text-gray-300">
                        <li>Taxi from Bangalore to Mysore</li>
                        <li>Taxi from Bangalore to Coorg</li>
                        <li>Taxi from Bangalore to Ooty</li>
                        <li>Taxi from Bangalore to Pondicherry</li>
                        <li>Taxi from Bangalore to Goa</li>
                    </ul>
                </div>

                {/* Cab from Mumbai */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Cab from Mumbai</h3>
                    <ul className="space-y-2 text-gray-300">
                        <li>Taxi from Mumbai to Shirdi</li>
                        <li>Taxi from Mumbai to Shani Shingnapur</li>
                        <li>Taxi from Mumbai to Mahabaleshwar</li>
                        <li>Taxi from Mumbai to Nashik</li>
                        <li>Taxi from Mumbai to Pune</li>
                    </ul>
                </div>

                {/* Cab from Chennai */}
                <div>
                    <h3 className="text-lg font-semibold mb-4">Cab from Chennai</h3>
                    <ul className="space-y-2 text-gray-300">
                        <li>Taxi from Chennai to Bangalore</li>
                        <li>Taxi from Chennai to Pondicherry</li>
                        <li>Taxi from Chennai to Tirupati</li>
                        <li>Taxi from Chennai to Mahabalipuram</li>
                        <li>Taxi from Chennai to Kanchipuram</li>
                    </ul>
                </div>
            </div>

            {/* Social and Copyright */}
            <div className="mt-10 border-t border-gray-700 pt-6 spaxe-y-2">
                {/* <div className="flex justify-center space-x-6 text-gray-300 mb-4">
                    <Facebook className="w-6 h-6" />
                    <Instagram className="w-6 h-6" />
                    <Youtube className="w-6 h-6" />
                </div> */}
                <p className="text-sm text-gray-400 text-center">
                    Copyright 2025 • <span className='font-bold'>Taps Cabs</span> , All Rights Reserved
                </p>
                <p className="text-sm text-gray-400 text-center">
                    Designed by <Link href="https://matchbestsoftware.com/" target="_blank" className='font-bold'>Matchest Software</Link>
                </p>
            </div>
        </footer>
    );
}
