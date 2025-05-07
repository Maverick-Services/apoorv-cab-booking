'use client'
import { useState } from 'react'
import {
    CalendarDays,
    Clock,
    MapPin,
    Car,
    Wallet,
    User,
    BadgeInfo,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog'

const BookingHistory = ({ bookings }) => {
    const [selectedBooking, setSelectedBooking] = useState(null)

    const formatDate = (dateString) => {
        const options = { day: 'numeric', month: 'long', year: 'numeric' }
        return new Date(dateString).toLocaleDateString('en-IN', options)
    }

    const getBookingStatus = (pickupDate) => {
        const today = new Date()
        const bookingDate = new Date(pickupDate)
        today.setHours(0, 0, 0, 0)
        bookingDate.setHours(0, 0, 0, 0)

        if (bookingDate < today) return 'Completed'
        if (bookingDate > today) return 'Upcoming'
        return 'Current'
    }

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case 'current': return 'bg-blue-100 text-blue-800'
            case 'upcoming': return 'bg-yellow-100 text-yellow-800'
            case 'completed': return 'bg-green-100 text-green-800'
            default: return 'bg-gray-100 text-gray-800'
        }
    }

    return (
        <div className="w-full mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Bookings</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {bookings?.map((booking) => {
                    const status = getBookingStatus(booking.pickupDate)
                    return (
                        <div
                            key={booking.id}
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow border p-4 cursor-pointer"
                            onClick={() => setSelectedBooking(booking)}
                        >
                            <div className="space-y-3">
                                <div className="flex justify-between items-start">
                                    <Badge className={getStatusColor(status)}>
                                        {status}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                        #{booking.payment.paymentId.slice(-6)}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <Car className="h-5 w-5 text-primary" />
                                    <span className="font-medium">{booking.cab.name}</span>
                                </div>

                                <div className="flex items-center gap-2">
                                    <MapPin className="h-5 w-5 text-primary" />
                                    <span>{booking.pickupCity}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                    <CalendarDays className="h-5 w-5 text-primary" />
                                    {formatDate(booking.pickupDate)}
                                    <Clock className="h-5 w-5 ml-2 text-primary" />
                                    {booking.pickupTime}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
                {selectedBooking && (
                    <DialogContent className="sm:max-w-2xl">
                        <DialogHeader>
                            <DialogTitle className="text-xl">
                                Booking Details - {selectedBooking.cab.name}
                            </DialogTitle>
                        </DialogHeader>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Trip Details */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <BadgeInfo className="h-6 w-6 text-primary" />
                                    <h3 className="text-lg font-semibold">Trip Information</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <p><strong>Type:</strong> {selectedBooking.tripType}</p>
                                    <p><strong>Distance:</strong> {selectedBooking.totalDistance} km</p>
                                    <p><strong>Duration:</strong> {selectedBooking.totalHours} hours</p>
                                    <p><strong>Pickup:</strong> {formatDate(selectedBooking.pickupDate)} at {selectedBooking.pickupTime}</p>
                                </div>
                            </div>

                            {/* Payment Details */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <Wallet className="h-6 w-6 text-primary" />
                                    <h3 className="text-lg font-semibold">Payment Details</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <p><strong>Amount:</strong> ₹{selectedBooking.payment.amount}</p>
                                    <p><strong>Status:</strong>
                                        <Badge className={`ml-2 ${getStatusColor(selectedBooking.payment.status)}`}>
                                            {selectedBooking.payment.status}
                                        </Badge>
                                    </p>
                                    <p><strong>Payment ID:</strong> {selectedBooking.payment.paymentId}</p>
                                </div>
                            </div>

                            {/* User Details */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <User className="h-6 w-6 text-primary" />
                                    <h3 className="text-lg font-semibold">Passenger Details</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <p><strong>Name:</strong> {selectedBooking.userData.name}</p>
                                    <p><strong>Email:</strong> {selectedBooking.userData.email}</p>
                                    <p><strong>Phone:</strong> {selectedBooking.userData.phoneNo}</p>
                                </div>
                            </div>

                            {/* Status Overview */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2">
                                    <BadgeInfo className="h-6 w-6 text-primary" />
                                    <h3 className="text-lg font-semibold">Current Status</h3>
                                </div>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Driver Assignment:</span>
                                        <Badge variant="outline">
                                            {selectedBooking.status.driver}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Vendor Assignment:</span>
                                        <Badge variant="outline">
                                            {selectedBooking.status.vendor}
                                        </Badge>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Trip Status:</span>
                                        <Badge variant="outline">
                                            {selectedBooking.status.trip}
                                        </Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-6">
                            <Button
                                variant="outline"
                                onClick={() => setSelectedBooking(null)}
                            >
                                Close
                            </Button>
                            <Button>View Receipt</Button>
                        </div>
                    </DialogContent>
                )}
            </Dialog>
        </div>
    )
}

export default BookingHistory