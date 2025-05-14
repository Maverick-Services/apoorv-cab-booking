import InnerLayout from '@/components/dashboard/layout/InnerLayout'
import { Input } from '@/components/ui/input'
import React from 'react'

function page() {
    return (
        <div>
            <InnerLayout heading={'Create Blog'}>
                <form>
                    <Input />
                </form>
            </InnerLayout>
        </div>
    )
}

export default page
