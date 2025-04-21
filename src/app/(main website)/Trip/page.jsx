
import React, { Suspense } from 'react';
// import L from 'leaflet';
import { distance, point } from '@turf/turf';
import { BookingForm } from '@/components/main/home/BookingForm';

export const dynamic = "force-dynamic";

function page() {

    // const [coordinates, setCoordinates] = useState({
    //     pickUp: {},
    //     dropOff: {}
    // });

    // const getCoordinates = async (address) => {
    //     const encodedAddress = encodeURIComponent(address);
    //     const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodedAddress}`;

    //     const response = await fetch(url, {
    //         headers: {
    //             'User-Agent': 'YourAppName/1.0 (your@email.com)', // Optional but good practice
    //         },
    //     });

    //     const data = await response.json();

    //     if (data.length > 0) {
    //         const { lat, lon, display_name } = data[0];
    //         console.log(`Address: ${display_name}`);
    //         console.log(`Latitude: ${lat}, Longitude: ${lon}`);
    //         return { lat: parseFloat(lat), lng: parseFloat(lon) };
    //     } else {
    //         throw new Error('Location not found');
    //     }
    // };

    // const handleLoactionInput = (e) => {
    //     getCoordinates(e.target.value)
    //         .then(coords => {
    //             setCoordinates(prev => (
    //                 { ...prev, [e.target.name]: coords }
    //             ))
    //         })
    //         .catch(err => {
    //             console.error('Error:', err);
    //         })
    // }

    // const handleDistanceCalculation = (e) => {
    //     e.preventDefault();
    //     // const pickupCoords = L.latLng(coordinates.pickUp.lat, coordinates.pickUp.lng);
    //     // const dropoffCoords = L.latLng(coordinates.dropOff.lat, coordinates.dropOff.lng);
    //     // console.log((pickupCoords.distanceTo(dropoffCoords) / 1000).toFixed(3) + ' kms');

    //     const pickupCoords = point([coordinates.pickUp.lng, coordinates.pickUp.lat]); // Delhi
    //     const dropoffCoords = point([coordinates.dropOff.lng, coordinates.dropOff.lat]);   // Noida

    //     // console.log(pickupCoords);
    //     const dist = distance(pickupCoords, dropoffCoords, { units: 'kilometers' }); // or 'miles'
    //     // console.log(dist);
    // }

    return (
        <div className='text-black flex flex-col items-center justify-center py-10'>
            <Suspense fallback={<div>Loading form...</div>}>
                <BookingForm />
            </Suspense>
            {/* <form onSubmit={handleDistanceCalculation}>
                <input type="text"
                    placeholder='Pick Up Location'
                    name='pickUp'
                    onChange={handleLoactionInput}
                />
                <input type="text"
                    placeholder='Drop Off Location'
                    name='dropOff'
                    onChange={handleLoactionInput}
                />
                <button type='submit'>Search</button>
            </form> */}
        </div>
    )
}

export default page
