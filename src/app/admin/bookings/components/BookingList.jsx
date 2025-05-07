import { Loader2, ReceiptIndianRupee } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BookingList({ bookings, loading }) {
    const router = useRouter();

    const parseFirestoreTimestamp = ({ seconds, nanoseconds }) => {
        return new Date(seconds * 1000 + nanoseconds / 1000000);
    };

    const formatFirestoreDate = (timestamp) => {
        if (!timestamp) return 'N/A';
        const date = parseFirestoreTimestamp(timestamp);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const StatusBadge = ({ label, value, colorClass }) => (
        <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-500">{label}:</span>
            <span className={`rounded-full px-3 py-1 text-sm font-medium ${colorClass}`}>
                {value}
            </span>
        </div>
    );

    if (loading)
        return (
            <div className='w-full min-h-[30vh] flex justify-center items-center'>
                <div className="w-fit flex flex-col justify-center items-center gap-2">
                    <Loader2 size={30} className="animate-spin text-primary" />
                    <p className="flex gap-2 items-center">
                        <ReceiptIndianRupee className="h-6 w-6 text-primary" />
                        Fetching bookings
                    </p>
                </div>
            </div>
        )

    if (bookings?.length <= 0)
        return (
            <div className='w-full min-h-[30vh] flex justify-center items-center'>
                <p className="text-muted-foreground">No bookings yet</p>
            </div>
        )

    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-7xl">
                <div className="space-y-3 w-full">
                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            onClick={() => router.push(`/admin/bookings/bookingDetails?id=${booking.id}`)}
                            className="w-full group cursor-pointer rounded-lg bg-white p-4 transition-all duration-200 hover:shadow-lg "
                        >
                            <div className="w-full grid grid-cols-1 items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                                {/* Customer Info */}
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        {booking.userData.name}
                                        <span className="inline-block rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">
                                            {booking.tripType}
                                        </span>
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {formatFirestoreDate(booking?.createdAt)}
                                    </p>

                                </div>

                                {/* Trip Details */}
                                <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-gray-500">From:</span>
                                        <span className="text-sm text-gray-900">{booking.pickupCity}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-gray-500">Vendor:</span>
                                        <span className={`text-sm ${booking?.status?.vendor ? 'text-green-600' : 'text-red-600'}`}>
                                            {booking?.status?.vendor ? "Assigned" : "Not Assigned"}
                                        </span>
                                    </div>
                                </div>

                                {/* Status Indicators */}
                                <div className="space-y-2">
                                    <StatusBadge
                                        label="Booking"
                                        value={booking?.status?.booking || 'Processing'}
                                        colorClass={
                                            booking?.status?.booking === 'Accepted' ? 'bg-green-100 text-green-800' :
                                                booking?.status?.booking === 'Rejected' ? 'bg-red-100 text-red-800' :
                                                    'bg-gray-100 text-gray-800'
                                        }
                                    />
                                    <StatusBadge
                                        label="Trip"
                                        value={booking?.status?.trip || 'Not Started'}
                                        colorClass={
                                            booking?.status?.trip === 'Completed' ? 'bg-purple-100 text-purple-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }
                                    />
                                </div>

                                {/* Payment Info */}
                                <div className="space-y-2">
                                    <StatusBadge
                                        label="Payment"
                                        value={booking?.status?.isFullPaymemt ? 'Paid' : 'Pending'}
                                        colorClass={booking?.status?.isFullPaymemt ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}
                                    />
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-gray-500">Total:</span>
                                        <span className="text-lg font-bold text-gray-900">
                                            ₹{booking.totalAmount}
                                        </span>
                                    </div>
                                </div>

                                {/* Mobile View Indicator */}
                                <div className="md:hidden">
                                    <span className="text-sm text-gray-500">Tap to view details →</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}