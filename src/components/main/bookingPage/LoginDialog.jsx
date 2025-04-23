import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Save } from 'lucide-react'
import React from 'react'

function LoginDialog({ open, onOpenChange, onSave }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <div className="mx-auto w-full max-w-sm">
                    <DialogHeader>
                        <DialogTitle>Edit Variant Details</DialogTitle>
                        <DialogDescription>Make changes to your item variant here.</DialogDescription>
                    </DialogHeader>



                    <DialogFooter>
                        <Button onClick={onSave} className="text-white flex items-center gap-2">
                            <Save className="h-4 w-4" />
                            Save Changes
                        </Button>
                    </DialogFooter>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LoginDialog
