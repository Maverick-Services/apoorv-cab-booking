import React from 'react'
import { PackageList } from './components/PackageList'
import InnerLayout from '@/components/dashboard/layout/InnerLayout'

function page() {
    return (
        <InnerLayout heading={'Manage Packages'}>
            <div>
                <PackageList />
            </div>
        </InnerLayout>
    )
}

export default page
