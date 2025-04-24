
import { Suspense } from 'react'
import LoginDialog from './LoginDialog';

export default function LoginDialogOuter({ open, onOpenChange }) {
    return (
        <Suspense fallback={<div>Loading login dialog...</div>}>
            <LoginDialog open={open} onOpenChange={onOpenChange} />
        </Suspense>
    )
}
