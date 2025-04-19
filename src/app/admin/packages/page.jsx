import React from 'react'
import { PackageList } from './components/PackageList'
import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

function page() {
    return (
        <InnerLayout heading={'Manage Packages'}>
            <div className='w-full flex flex-col gap-2'>
                <div className='w-full flex justify-between px-1'>
                    <p className='font-semibold text-primary'>Total Packages: {30}</p>
                    <Link href={'/admin/packages/new'}>
                        <Badge className="text-base font-bold cursor-pointer">
                            Add new Packages
                        </Badge>
                    </Link>
                </div>
                <div>
                    <PackageList />
                </div>
            </div>
        </InnerLayout>
    )
}

export default page
