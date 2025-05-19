'use client';

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { FaPhoneAlt, FaFax, FaEnvelope } from "react-icons/fa";
import { useForm } from 'react-hook-form';
import { useState } from "react";
import toast from "react-hot-toast";

export default function Contact() {
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm()
    const [isSubmitting, setIsSubmitting] = useState(false)

    const onSubmit = async (data) => {
        setIsSubmitting(true)
        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            })

            if (response.ok) {
                toast.success(
                    <div className="flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span>Message sent successfully!</span>
                    </div>
                )
                reset()
            } else {
                toast.error('Failed to send message. Please try again.')
            }
        } catch (error) {
            toast.error('An error occurred. Please try again later.')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <section id="contact" className="flex px-10 flex-col lg:flex-row gap-7 rounded-3xl overflow-hidden max-w-7xl mx-auto my-16">
            {/* Left Section: Form */}
            <div className="w-full lg:w-1/2">
                <h2 className="text-4xl font-bold mb-6">
                    Get in <span className="text-blue-600">Touch</span>
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <Input placeholder="Name *" required
                            {...register('name', { required: 'Name is required' })}
                        />
                        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                    </div>

                    <div>
                        <Input placeholder="Email" type="email" required
                            {...register('email', {
                                required: 'Email is required',
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: 'Invalid email address'
                                }
                            })}
                        />
                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                    </div>

                    <div>
                        <Input placeholder="Phone number *" required
                            {...register('phoneNo', {
                                required: 'Contact Number is required',
                                pattern: {
                                    value: /^\+?[1-9]\d{1,14}$/,
                                    message: 'Invalid phone number format'
                                }
                            })}
                        />
                        {errors.phoneNo && <p className="text-red-400 text-sm mt-1">{errors.phoneNo.message}</p>}
                    </div>

                    <div>
                        <Textarea placeholder="Query *" rows={4} required
                            {...register('message', { required: 'Message is required' })}
                        />
                        {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message.message}</p>}
                    </div>

                    <Button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700"
                    >
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
            <div className="w-full lg:w-1/2 relative flex items-center justify-center">
                <div className="w-full h-[400px] md:h-full rounded-2xl">
                    <iframe
                        title="Map"
                        className="w-full h-full  rounded-4xl bg-transparent z-0"
                        frameBorder="0"
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.520284890859!2d106.81842391538516!3d-6.199785895516195!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e8b3cbf3b9%3A0x1a25f8c59e03a6c0!2sHotel%20Ascott%20Jakarta!5e0!3m2!1sen!2sid!4v1713459800000!5m2!1sen!2sid"
                    />
                </div>
                {/* Curved effect - simulated corner */}
                {/* <div className="absolute top-0 right-0 w-24 h-24 bg-white rounded-bl-[4rem] z-10"></div> */}
            </div>
        </section>
    );
}
