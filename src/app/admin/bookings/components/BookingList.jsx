import isTimestampLike, { formatFirestoreDate } from "@/lib/firebase/services/formatDate";
import { Loader2, ReceiptIndianRupee, FileDown } from "lucide-react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { MAIN_WEBSITE } from "@/lib/assets/assets";
import { TRIP_TYPES } from "@/lib/constants/constants";
import { toWords } from "number-to-words";

export default function BookingList({ bookings, loading }) {
    const router = useRouter();

    const parseFirestoreTimestamp = ({ seconds, nanoseconds }) => {
        return new Date(seconds * 1000 + nanoseconds / 1000000);
    };

    const formatDate = (dateString) => {
        // console.log(dateString, dateString instanceof Timestamp)
        if (isTimestampLike(dateString)) {
            return formatFirestoreDate(dateString);
        }

        const options = { day: 'numeric', month: 'long', year: 'numeric' }
        return new Date(dateString).toLocaleDateString('en-IN', options)
    }

    const formatFirestoreCreatedDate = (timestamp) => {
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

    const generateInvoice = (selectedBooking) => {
        console.log(selectedBooking);
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.getWidth();
        let yPosition = 15;

        // Company Header
        doc.setFontSize(18);
        doc.setTextColor(40);
        doc.setFont('helvetica', 'bold');
        doc.text("BOOKING INVOICE", pageWidth / 2, yPosition, { align: 'center' });
        yPosition += 15;

        // Add logo image (parameters: imageData, x, y, width, height)
        doc.addImage(MAIN_WEBSITE.logo, 'PNG', 15, 15, 30, 15)
        yPosition = 30;

        // Company Details
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        doc.text("C 23 Malviya Nagar, Moradabad Uttar Pradesh 244001", 15, yPosition + 5);
        doc.text("24*7 7248772488 | INFO@TAPSCABS.COM | GSTIN 09BEWPG1107F12K", 15, yPosition + 10);
        yPosition += 20;

        // Invoice Details
        const invoiceDate = formatDate(selectedBooking?.createdAt) ? formatDate(selectedBooking?.createdAt)
            : formatFirestoreDate(selectedBooking?.createdAt);

        const createdAt = selectedBooking?.createdAt;
        const mobile = selectedBooking?.userData?.phoneNumber || selectedBooking?.userData?.phoneNo || "NA";

        let invoiceId = "INV-UNKNOWN";
        if (createdAt) {
            const date = new Date(createdAt.seconds * 1000 + createdAt.nanoseconds / 1e6);
            const pad = (n) => n.toString().padStart(2, "0");
            const hours = pad(date.getHours() % 12 || 12);
            const minutes = pad(date.getMinutes());
            const ampm = date.getHours() >= 12 ? "PM" : "AM";

            invoiceId = `INV-${mobile}-${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
        }


        doc.text(`Invoice No: TC/${invoiceId}`, 15, yPosition);
        doc.text(`Invoice Date: ${invoiceDate}`, pageWidth - 15, yPosition, { align: 'right' });
        yPosition += 10;

        // Customer Details
        doc.setFont('helvetica', 'bold');
        doc.text(`${selectedBooking?.userData?.name}`, 15, yPosition);
        doc.text(`${selectedBooking?.userData?.email}`, 15, yPosition + 5);
        doc.text(`${selectedBooking?.userData?.phoneNo}`, 15, yPosition + 10);
        doc.text(`Pickup City: ${selectedBooking?.pickupCity}`, pageWidth - 15, yPosition, { align: 'right' });
        yPosition += 20;

        if (selectedBooking?.tripType === TRIP_TYPES.oneWay) {
            doc.text(`Drop: ${selectedBooking?.dropCity}`, 15, yPosition);
            // yPosition += 5;
        } else if (selectedBooking?.tripType === TRIP_TYPES.roundTrip) {
            doc.text(`Drops:`, 15, yPosition);
            for (let i = 0; i < selectedBooking?.dropOffs?.length; i++) {
                doc.text(`\n\t${i + 1}. ${selectedBooking?.dropOffs[i]}`, 15, yPosition + 5 * i);
            }
            yPosition += 10;
        }

        // Calculate line items
        const items = [];
        const tripType = selectedBooking?.tripType?.toLowerCase();

        const basePrice = +selectedBooking?.priceWithAllowance

        // Main Service
        items.push([
            1,
            `${selectedBooking?.pickupCity} ${tripType} Service`,
            "1.00",
            basePrice?.toFixed(2),
            `${(basePrice * 0.05).toFixed(2)} 5%`,
            (+selectedBooking?.totalAmount)?.toFixed(2)
        ]);


        // Items Table
        autoTable(doc, {
            startY: yPosition + 10,
            head: [['#', 'Description', 'Qty', 'Rate', 'IGST', 'Amount']],
            body: items,
            theme: 'grid',
            styles: { fontSize: 10 },
            headStyles: {
                fillColor: [0, 0, 0],  // Black color
                textColor: [255, 255, 255]
            },
            columnStyles: {
                0: { cellWidth: 10 },
                1: { cellWidth: 80 },
                2: { cellWidth: 20 },
                3: { cellWidth: 25 },
                4: { cellWidth: 35 },
                5: { cellWidth: 25 }
            }
        });

        // Calculations
        // const subtotal = items.reduce((sum, item) => sum + parseFloat(item[5]), 0);
        const subtotal = basePrice;
        const gst = subtotal * 0.05;
        const total = subtotal + gst;

        // Summary Table
        autoTable(doc, {
            startY: doc.lastAutoTable.finalY + 10,
            body: [
                ["Sub Total", subtotal.toFixed(2)],
                ["IGST5 (5%)", gst.toFixed(2)],
                ["Total", total.toFixed(2)],
                ["Balance Paid", selectedBooking?.bookingAmount?.toFixed(2)],
                ["Balance Due", (total.toFixed(2) - selectedBooking?.bookingAmount?.toFixed(2)).toFixed(2)]
            ],
            theme: 'plain',
            styles: { fontSize: 12, fontStyle: 'bold' },
            columnStyles: {
                0: { halign: 'right', cellWidth: 100 },
                1: { cellWidth: 50, halign: 'right' }
            }
        });

        // Total in Words
        doc.setFont('helvetica', 'bold');
        doc.text(`Total in Words: Indian Rupee ${toWords(total.toFixed(2)).replace(/ point/g, ' and')} Only`, 15, doc.lastAutoTable.finalY + 15);

        // Footer
        const footerY = doc.internal.pageSize.getHeight() - 30;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(9);
        doc.text("This is an electronically generated invoice and does not require signature.", 15, footerY);
        doc.text("All disputes are subject to jurisdiction of courts in Moradabad.", 15, footerY + 5);
        doc.text("Please refer our website www.tapscabs.com for Terms and Conditions.", 15, footerY + 10);

        // Save PDF
        doc.save(`invoice-${invoiceId}.pdf`);
    };

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
        );

    if (bookings?.length <= 0)
        return (
            <div className='w-full min-h-[30vh] flex justify-center items-center'>
                <p className="text-muted-foreground">No bookings yet</p>
            </div>
        );

    return (
        <div className="min-h-screen">
            <div className="mx-auto max-w-7xl">
                <div className="space-y-3 w-full">
                    {bookings.map((booking) => (
                        <div
                            key={booking.id}
                            className="w-full group rounded-lg bg-white p-4 transition-all duration-200 hover:shadow-lg "
                        >
                            <div
                                onClick={() => router.push(`/admin/bookings/bookingDetails?id=${booking.id}`)}
                                className="cursor-pointer grid grid-cols-1 items-center gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                            >
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                                        {booking.userData.name}
                                        <span className="inline-block rounded-full bg-blue-100 px-2.5 py-1 text-xs font-medium text-blue-800">
                                            {booking.tripType}
                                        </span>
                                    </h3>
                                    <p className="text-sm text-blue-700 font-bold">
                                        Scheduled On {formatDate(booking?.pickupDate)}
                                    </p>
                                    <p className="text-sm text-gray-500">
                                        Booked on {formatFirestoreCreatedDate(booking?.createdAt)}
                                    </p>
                                </div>

                                <div className="space-y-1">
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-gray-500">From:</span>
                                        <span className="text-sm text-gray-900">{booking.pickupCity}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                        <span className="text-sm font-medium text-gray-500">Vendor:</span>
                                        <span className={`text-sm ${(booking?.status?.vendor && booking?.status?.vendor !== "not assigned") ? 'text-green-600' : 'text-red-600'}`}>
                                            {(booking?.status?.vendor && booking?.status?.vendor !== "not assigned") ? "Assigned" : "Not Assigned"}
                                        </span>
                                    </div>
                                </div>

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
                            </div>

                            {/* Invoice Button */}
                            <div className="mt-4 flex justify-end">
                                <button
                                    onClick={() => generateInvoice(booking)}
                                    className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:underline"
                                >
                                    <FileDown className="h-4 w-4" />
                                    Download Invoice
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
