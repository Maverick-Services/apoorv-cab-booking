'use client'
import React, { useEffect, useState } from 'react'

export const PackageList = () => {

    const [packages, setPackages] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchPackageData = () => {
        setLoading(true);


        setLoading(false);
    }

    useEffect(() => {
        fetchPackageData();
    }, []);

    return (
        <div>
            List
        </div>
    )
}
