import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

function page() {
    return (
        <div>
            <InnerLayout heading={'Manage Blogs'}>
                <Link href={'/admin/blogs/form'}>
                    <Button>Add Blog</Button>
                </Link>
                <Link href={'/admin/blogs/categories'}>
                    <Button>Categories</Button>
                </Link>
            </InnerLayout>
        </div>
    )
}

export default page
