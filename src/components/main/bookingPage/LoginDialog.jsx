"use client"
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Save } from 'lucide-react'
import React, { useState } from 'react'
import Login from './Login'
import Signup from './Signup'

function LoginDialog({ open, onOpenChange, onSave }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [loading, setLoading] = useState(false)
    const handleSignup = async (e) => {
    }
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <div className="mx-auto w-full px-3 pb-3">
                    <DialogHeader>
                        {/* <DialogTitle>Join Us Now</DialogTitle> */}
                    </DialogHeader>

                    <Tabs defaultValue="inclusions" className="w-full mt-4">
                        <TabsList className="w-full grid grid-cols-2 bg-gray-100 rounded-lg p-1 mb-4">
                            <TabsTrigger value="login">Login</TabsTrigger>
                            <TabsTrigger value="signup">Signup</TabsTrigger>
                        </TabsList>

                        <TabsContent value="login">
                            <Login />
                        </TabsContent>

                        <TabsContent value="signup">
                            <Signup />
                        </TabsContent>
                    </Tabs>
                    {/* <DialogFooter>
                        <Button onClick={onSave} className="text-white flex items-center gap-2 mt-4">
                            <Save className="h-4 w-4" />
                            Save Changes
                        </Button>
                    </DialogFooter> */}
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default LoginDialog
