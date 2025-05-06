"use client"
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import { addLocalUser } from '@/lib/firebase/auth/userLogin'
import useAuthStore from '@/store/useAuthStore'

function UserLogin({ open, onOpenChange }) {
    const [loading, setLoading] = useState(false)
    const { setUserData } = useAuthStore()

    const {
        register,
        formState: { errors },
        handleSubmit,
    } = useForm()

    async function userLoginFunction(data) {
        setLoading(true);
        try {
            const res = await addLocalUser(data);

            if (res.success && res.userDetails) {
                setUserData(res.userDetails);
                onOpenChange(false);
            } else {
                alert("Failed to log in or create user");
            }
        } catch (error) {
            console.error(error);
            alert("An error occurred. Please try again.");
        }
        setLoading(false);
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle>Login</DialogTitle>
                <form onSubmit={handleSubmit(userLoginFunction)} className="space-y-4">
                    <div>
                        <input
                            {...register('phone', {
                                required: 'Phone number is required',
                                pattern: {
                                    value: /^[0-9]{10}$/,
                                    message: 'Enter a valid 10-digit phone number',
                                },
                            })}
                            type="tel"
                            className='w-full border border-gray-300 rounded p-2'
                            placeholder='Enter your Phone Number'
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                        )}
                    </div>

                    <Button type="submit" disabled={loading}>
                        {loading ? 'Logging in...' : 'Login'}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UserLogin
