'use client'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const CustomPieChart = () => {

    const BOOKINGS_LIST = [
        {
            tripType: 'Round Trip',
            vehicleType: 'Sedan',
            pickUpLocation: "Delhi",
            dropLocation: 'Meerut',
            pickUpDate: '20 Apr 2025',
            pickUpTime: '12:30 AM',
            returnDate: "22 Apr 2025",
            confirmationStatus: "Pending",
            tripStatus: 'Pending',
            customer: {
                name: "Raghav",
                mobileNo: 9844587856,
                email: 'raghav@gmail.com'
            },
            assignedVendor: null
        },
        {
            tripType: 'One Way',
            vehicleType: 'Sedan',
            pickUpLocation: "Delhi",
            dropLocation: 'Meerut',
            pickUpDate: '20 Apr 2025',
            pickUpTime: '12:30 AM',
            confirmationStatus: "Pending",
            tripStatus: 'Pending',
            customer: {
                name: "Anju",
                mobileNo: 9856987856,
                email: 'anju@gmail.com'
            },
            assignedVendor: "PtkcL4WAoSWLFUxAN8sHwGAkNY73"
        },
        {
            tripType: 'One Way',
            vehicleType: 'SUV',
            pickUpLocation: "Noida",
            dropLocation: 'Agra',
            pickUpDate: '21 Apr 2025',
            pickUpTime: '9:00 AM',
            confirmationStatus: "Confirmed",
            tripStatus: 'Scheduled',
            customer: {
                name: "Sohail",
                mobileNo: 9876543210,
                email: 'sohail@gmail.com'
            },
            assignedVendor: "AbcdEfGh123456"
        },
        {
            tripType: 'Round Trip',
            vehicleType: 'Hatchback',
            pickUpLocation: "Gurgaon",
            dropLocation: 'Jaipur',
            pickUpDate: '22 Apr 2025',
            pickUpTime: '7:30 AM',
            returnDate: "24 Apr 2025",
            confirmationStatus: "Rejected",
            tripStatus: 'Cancelled',
            customer: {
                name: "Pooja",
                mobileNo: 9123456789,
                email: 'pooja@yahoo.com'
            },
            assignedVendor: null
        },
        {
            tripType: 'One Way',
            vehicleType: 'Sedan',
            pickUpLocation: "Chandigarh",
            dropLocation: 'Delhi',
            pickUpDate: '23 Apr 2025',
            pickUpTime: '4:00 PM',
            confirmationStatus: "Confirmed",
            tripStatus: 'Completed',
            customer: {
                name: "Vikram",
                mobileNo: 9988776655,
                email: 'vikram@outlook.com'
            },
            assignedVendor: "VendorUID09876"
        },
        {
            tripType: 'Round Trip',
            vehicleType: 'SUV',
            pickUpLocation: "Lucknow",
            dropLocation: 'Varanasi',
            pickUpDate: '25 Apr 2025',
            pickUpTime: '10:00 AM',
            returnDate: "28 Apr 2025",
            confirmationStatus: "Pending",
            tripStatus: 'Pending',
            customer: {
                name: "Neha",
                mobileNo: 9001122334,
                email: 'neha@rediffmail.com'
            },
            assignedVendor: null
        },
        {
            tripType: 'One Way',
            vehicleType: 'Hatchback',
            pickUpLocation: "Pune",
            dropLocation: 'Mumbai',
            pickUpDate: '26 Apr 2025',
            pickUpTime: '6:45 AM',
            confirmationStatus: "Confirmed",
            tripStatus: 'Ongoing',
            customer: {
                name: "Arjun",
                mobileNo: 8899776655,
                email: 'arjun@gmail.com'
            },
            assignedVendor: "VendorXyz789"
        },
        {
            tripType: 'Round Trip',
            vehicleType: 'Sedan',
            pickUpLocation: "Hyderabad",
            dropLocation: 'Vizag',
            pickUpDate: '27 Apr 2025',
            pickUpTime: '3:15 PM',
            returnDate: "29 Apr 2025",
            confirmationStatus: "Confirmed",
            tripStatus: 'Scheduled',
            customer: {
                name: "Sneha",
                mobileNo: 9876547890,
                email: 'sneha@gmail.com'
            },
            assignedVendor: "VendorUID12345"
        }
    ];

    const roundTripCount = BOOKINGS_LIST.filter(item => item.tripType === 'Round Trip').length;
    const oneWayCount = BOOKINGS_LIST.filter(item => item.tripType === 'One Way').length;

    const data = [
        { name: 'Round Trip', value: roundTripCount },
        { name: 'One Way', value: oneWayCount },
    ];

    const COLORS = [
        "oklch(0.627 0.194 149.214)",
        "oklch(0.45 0.085 224.283)",
        "#d61828",
    ];
    const RADIAN = Math.PI / 180;
    const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, index }) => {
        const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
        const x = cx + radius * Math.cos(-midAngle * RADIAN);
        const y = cy + radius * Math.sin(-midAngle * RADIAN);

        return (
            <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
                {`${data[index].value}`}
            </text>
        );
    }

    return (
        <div className="md:max-w-4xl mx-auto w-full h-[400px] bg-white rounded-xl p-4 px-0 pb-8">
            <p className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                Bookings based on their Types
            </p>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Legend verticalAlign="bottom" height={36} />
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        outerRadius={110}
                        labelLine={false}
                        label={renderCustomizedLabel}
                        fill="#8884d"
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default CustomPieChart;
