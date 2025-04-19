'use client';

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaPhoneAlt, FaFax, FaEnvelope } from "react-icons/fa";

export default function Contact() {
    return (
        <section id="contact" className="flex flex-col lg:flex-row rounded-3xl shadow-xl overflow-hidden max-w-7xl mx-auto my-16">
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
                            <div className="text-red-500">+917248772488</div>
                        </div>
                    </div>
                    {/* <div className="flex items-start gap-2">
                        <FaFax className="mt-1 text-xl text-black" />
                        <div>
                            <div className="font-semibold uppercase text-xs">Fax</div>
                            <div className="text-red-500">03 5432 1234</div>
                        </div>
                    </div> */}
                    <div className="flex items-start gap-2">
                        <FaEnvelope className="mt-1 text-xl text-black" />
                        <div>
                            <div className="font-semibold uppercase text-xs">Email</div>
                            <div className="text-red-500">help@tapscabs.com</div>
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
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.520284890859!2d106.81842391538516!3d-6.199785895516195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e8b3cbf3b9%3A0x1a25f8c59e03a6c0!2sHotel%20Ascott%20Jakarta!5e0!3m2!1sen!2sid!4v1713459800000!5m2!1sen!2sid"
                    />
                </div>
                {/* Curved effect - simulated corner */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-bl-[4rem] z-10"></div>
            </div>
        </section>
    );
}
