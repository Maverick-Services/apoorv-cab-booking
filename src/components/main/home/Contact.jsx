'use client';

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaPhoneAlt, FaFax, FaEnvelope } from "react-icons/fa";

export default function Contact() {
    return (
        <section className="flex flex-col lg:flex-row bg-white rounded-3xl shadow-xl overflow-hidden max-w-7xl mx-auto my-16">
            {/* Left Section: Form */}
            <div className="w-full lg:w-1/2 p-10">
                <h2 className="text-4xl font-bold mb-2">
                    Get in <span className="text-blue-600">Touch</span>
                </h2>
                <p className="text-gray-600 mb-8">
                    Enim tempor eget pharetra facilisis sed maecenas adipiscing. Eu leo molestie vel, ornare non id blandit netus.
                </p>

                <form className="space-y-4">
                    <Input placeholder="Name *" required />
                    <Input placeholder="Email" type="email" />
                    <Input placeholder="Phone number *" required />
                    <Textarea placeholder="Query *" rows={4} required />

                    <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                        SEND
                    </Button>
                </form>

                <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-700">
                    <div className="flex items-start gap-2">
                        <FaPhoneAlt className="mt-1 text-xl text-black" />
                        <div>
                            <div className="font-semibold uppercase text-xs">Phone</div>
                            <div className="text-red-500">03 5432 1234</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <FaFax className="mt-1 text-xl text-black" />
                        <div>
                            <div className="font-semibold uppercase text-xs">Fax</div>
                            <div className="text-red-500">03 5432 1234</div>
                        </div>
                    </div>
                    <div className="flex items-start gap-2">
                        <FaEnvelope className="mt-1 text-xl text-black" />
                        <div>
                            <div className="font-semibold uppercase text-xs">Email</div>
                            <div className="text-red-500">info@marcc.com.au</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Section: Map */}
            <div className="w-full lg:w-1/2 relative bg-[#123645] flex items-center justify-center">
                <div className="w-full h-[400px] md:h-full">
                    <iframe
                        title="Map"
                        className="w-full h-full"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                        src="https://maps.google.com/maps?q=Jakarta&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    />
                </div>
                {/* Curved effect - simulated corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-bl-[4rem] z-10"></div>
            </div>
        </section>
    );
}
