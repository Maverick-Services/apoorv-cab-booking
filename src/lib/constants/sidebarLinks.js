import {
    Home,
    ReceiptIndianRupee,
    User,
    Truck,
    Building,
    Package,
} from "lucide-react";

// Admin Sidebar
export const adminSidebarLinks = [
    {
        href: "/admin",
        label: "Dashboard",
        icon: <Home />,
    },
    {
        href: "/admin/bookings",
        label: "Bookings",
        icon: <ReceiptIndianRupee />,
    },
    {
        href: "/admin/drivers",
        label: "Drivers",
        icon: <Truck />,
    },
    {
        href: "/admin/vendors",
        label: "Vendors",
        icon: <Building />,
    },
    {
        href: "/admin/packages",
        label: "Packages",
        icon: <Package />,
    },
];

// User Sidebar
export const userSidebarLinks = [
    {
        href: "/user",
        label: "My Profile",
        icon: <User />,
    },
    {
        href: "/user/my-bookings",
        label: "My Bookings",
        icon: <ReceiptIndianRupee />,
    },
];

// Vendor Sidebar
export const vendorSidebarLinks = [
    {
        href: "/vendor",
        label: "Dashboard",
        icon: <Home />,
    },
    {
        href: "/vendor/profile",
        label: "My Profile",
        icon: <User />,
    },
    {
        href: "/vendor/my-bookings",
        label: "My Bookings",
        icon: <ReceiptIndianRupee />,
    },
    {
        href: "/vendor/drivers",
        label: "Drivers",
        icon: <Truck />,
    },
];
