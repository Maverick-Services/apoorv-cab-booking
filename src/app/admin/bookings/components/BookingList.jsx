import { useState } from "react";
import { BookingDialog } from "./BookingDialog";
import { useRouter } from "next/navigation";

export default function BookingList({ bookings }) {
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const router = useRouter()
    function abc(id) {
        router.push(`/admin/bookings/bookingDetails?id=${id}`)
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">All Bookings</h1>

            <div className="space-y-4">
                {bookings.map((booking) => (
                    <div
                        key={booking.id}
                        onClick={() => {
                            // setSelectedBooking(booking);
                            // setIsDialogOpen(true);
                            abc(booking?.id)
                        }}
                        className="p-4 border rounded-lg cursor-pointer hover:bg-gray-50"
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">{booking.userData.name}</h3>
                                <p className="text-sm text-gray-600">{booking.pickupCity} to {booking.dropCity}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-medium">₹{booking.totalAmount}</p>
                                <p className="text-sm text-gray-600">{booking.tripType}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* <BookingDialog
                booking={selectedBooking}
                open={isDialogOpen}
                onOpenChange={setIsDialogOpen}
            /> */}
        </div>
    );
}