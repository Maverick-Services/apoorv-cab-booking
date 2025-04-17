import { IoAnalytics, IoFastFoodOutline } from "react-icons/io5";
import { BsBasket3 } from "react-icons/bs";
import { ChartBarStacked, Home, ReceiptIndianRupee, Salad, SettingsIcon } from "lucide-react";

export const sidebarLinks = [
    {
        href: "/",
        label: "Home",
        icon: <Home />,
    },
    // {
    //     href: "/orders",
    //     label: "Orders",
    //     icon: <BsBasket3 />
    // },
    {
        href: "/user/my-bookings",
        label: "My Booking",
        icon: <ReceiptIndianRupee />
    },
    // {
    //     href: "/products",
    //     label: "Products",
    //     icon: <IoFastFoodOutline />
    // },
    // {
    //     href: "/categories",
    //     label: "Categories",
    //     icon: <ChartBarStacked />
    // },
    // {
    //     href: "/addons",
    //     label: "Add-ons",
    //     icon: <Salad />
    // },
    // {
    //     href: "/analytics",
    //     label: "Analytics",
    //     icon: <IoAnalytics />
    // },
    // {
    //     href: "/settings",
    //     label: "Settings",
    //     icon: <SettingsIcon />
    // },
];

export const ORDER_TYPE = {
    PACK_ORDER: "Pack Order",
    DINE_IN: "Dine-In",
    DELIVERY: "Home Delivery"
}

export const PAYMENT_STATUS = {
    PENDING: "pending",
    COMPLETED: "complete"
}

export const SERVING_STATUS = {
    PENDING: "pending",
    COMPLETED: "complete"
}

export const AMOUNT = {
    "<= 100": "100",
    "<= 500": "500",
    "<= 1000": "1000",
    "<= 2000": "2000",
}

export const DATE = {
    "Today": "0",
    "last 7 Days": "7",
    "last 15 Days": "15",
    "last 30 Days": "30",
    "last 60 Days": "60"
}