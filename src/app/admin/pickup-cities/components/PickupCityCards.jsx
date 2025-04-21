import { Briefcase, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function PickupCityCards() {
    const pickupCities = [
        {
            id: 'city-1',
            name: 'Delhi',
            terms: 'Pickup available from 6 AM to 11 PM. ID proof required.',
            cabTypes: [
                {
                    typeName: 'Sedan',
                    minKilometers: 100,
                    pricePerKm: 12,
                    discountedPricePerKm: 10,
                    driverAllowancePerDay: 300,
                },
                {
                    typeName: 'SUV',
                    minKilometers: 150,
                    pricePerKm: 15,
                    discountedPricePerKm: 13,
                    driverAllowancePerDay: 400,
                },
            ],
        },
        {
            id: 'city-2',
            name: 'Mumbai',
            terms: 'Available 24/7. Minimum 2-hour prior booking required.',
            cabTypes: [
                {
                    typeName: 'Hatchback',
                    minKilometers: 80,
                    pricePerKm: 10,
                    discountedPricePerKm: 9,
                    driverAllowancePerDay: 250,
                },
            ],
        },
    ];
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pickupCities.map((city) => (
                <div
                    key={city.id}
                    className="bg-white shadow-sm border rounded-xl p-4 flex flex-col gap-4"
                >
                    {/* City Name */}
                    <div className="flex items-center gap-2">
                        <MapPin className="text-primary" size={20} />
                        <h2 className="text-xl font-semibold text-primary">{city.name}</h2>
                    </div>

                    {/* Terms & Conditions */}
                    <div>
                        <h3 className="text-sm text-gray-700 mb-1 font-semibold">
                            Terms and Conditions
                        </h3>
                        <p className="text-sm text-muted-foreground">{city.terms}</p>
                    </div>

                    {/* Cab Type Variants */}
                    <div className="grid gap-3">
                        {city.cabTypes.map((cab, index) => (
                            <div
                                key={index}
                                className="border rounded-lg p-3 bg-gray-50 flex flex-col gap-2"
                            >
                                {/* Badge */}
                                <Badge className="w-fit text-sm">{cab.typeName}</Badge>

                                <div className="text-sm text-muted-foreground">
                                    <p>
                                        <strong>Min. Kilometers:</strong> {cab.minKilometers}
                                    </p>
                                    <p>
                                        <strong>Price/Km:</strong> ₹{cab.pricePerKm}
                                    </p>
                                    <p>
                                        <strong>Discounted Price/Km:</strong> ₹{cab.discountedPricePerKm}
                                    </p>
                                    <p>
                                        <strong>Driver Allowance/Day:</strong> ₹{cab.driverAllowancePerDay}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default PickupCityCards;
