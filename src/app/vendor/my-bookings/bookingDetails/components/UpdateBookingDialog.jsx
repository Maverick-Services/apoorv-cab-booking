import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
    Select,
    SelectTrigger,
    SelectContent,
    SelectItem,
    SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { updateBooking } from '@/lib/firebase/admin/booking';
import { getVendorAllDrivers } from '@/lib/firebase/vendor/driver';
import { TRIP_STATUS } from '@/lib/constants/constants';

function UpdateBookingDialog({ open, onOpenChange, booking, fetchOneBookingDetails }) {

    const [isLoading, setIsLoading] = useState(false);
    const [assigning, setAssigning] = useState(false);

    const [drivers, setDrivers] = useState()
    const [selectedDriverId, setSelectedDriverId] = useState('')
    const [tripStatus, setTripStatus] = useState('Not Started')

    useEffect(() => {
        if (!open) return;
        setIsLoading(true);
        getVendorAllDrivers().then(setDrivers).finally(() => setIsLoading(false))
    }, [open]);

    const handleUpdateBooking = async () => {
        if (!selectedDriverId) return;

        setAssigning(true);
        try {
            const updatedData = {
                ...booking,
                status: {
                    ...booking.status,
                    driver: selectedDriverId,
                    trip: tripStatus
                },
            };
            await updateBooking(updatedData);
            onOpenChange(false);
        } catch (err) {
            console.error(err);
        } finally {
            setAssigning(false);
            fetchOneBookingDetails(booking?.id)
        }
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-gray-200 space-y-4">
                <DialogTitle>Update Booking</DialogTitle>

                {/* Driver Select with Label */}
                <div className="w-full space-y-1">
                    <label className="block text-sm font-medium">Select Driver</label>
                    <Select
                        value={selectedDriverId}
                        onValueChange={setSelectedDriverId}
                        disabled={isLoading || assigning}
                    >
                        <SelectTrigger className="bg-white w-full">
                            <SelectValue
                                placeholder={
                                    isLoading ? 'Loading drivers...' : 'Choose a driver'
                                }
                            />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            {isLoading ? (
                                <div className="p-2">Loading…</div>
                            ) : drivers?.length > 0 ? (
                                drivers?.map((d) => (
                                    <SelectItem key={d?.id} value={d?.id} className="w-full">
                                        {d?.name}
                                    </SelectItem>
                                ))
                            ) : (
                                <SelectItem value="NA" disabled>
                                    No drivers found
                                </SelectItem>
                            )}
                        </SelectContent>
                    </Select>
                </div>

                {/* Trip Status Select with Label */}
                <div className="w-full space-y-1">
                    <label className="block text-sm font-medium">Trip Status</label>
                    <Select
                        value={tripStatus}
                        onValueChange={setTripStatus}
                        disabled={assigning}
                    >
                        <SelectTrigger className="bg-white w-full">
                            <SelectValue placeholder="Choose status" />
                        </SelectTrigger>
                        <SelectContent className="w-full">
                            <SelectItem value={TRIP_STATUS.notStarted}>Not Started</SelectItem>
                            <SelectItem value={TRIP_STATUS.started}>Started</SelectItem>
                            <SelectItem value={TRIP_STATUS.completed}>Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Assign Button */}
                <div className="flex justify-end">
                    <Button
                        onClick={handleUpdateBooking}
                        disabled={assigning}
                    >
                        {assigning ? (
                            <>
                                <Loader2 className="animate-spin inline-block mr-2" />
                                Updating…
                            </>
                        ) : (
                            'Update Booking'
                        )}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default UpdateBookingDialog;
