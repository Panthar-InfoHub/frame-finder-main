"use client"

import type React from "react"

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { updateUser } from "@/actions/user"

interface Address {
    _id?: string
    address_line_1: string
    city: string
    state: string
    pincode: string
}

interface DeleteAddressDialogProps {
    children: React.ReactNode
    address: Address
    addresses: Address[]
}

export function DeleteAddressDialog({ children, address, addresses }: DeleteAddressDialogProps) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const handleDelete = () => {
        if (!address._id) {
            toast.error("Address ID is missing")
            return
        }

        startTransition(async () => {
            try {
                const result = await updateUser({ address: addresses.filter((a) => a._id !== address._id) })

                if (result.success) {
                    toast.success("Address deleted successfully")
                    router.refresh()
                } else {
                    toast.warning(result.error || "Failed to delete address")
                }
            } catch (error) {
                toast.error((error as Error).message || "An unexpected error occurred")
            }
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Delete Address</DialogTitle>
                    <DialogDescription>This action cannot be undone.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                        Are you sure you want to delete this address? This will permanently remove the address from your account.
                    </p>

                    <div className="rounded-lg bg-muted p-3 space-y-1">
                        <p className="text-sm font-medium">{address.address_line_1}</p>
                        <p className="text-sm text-muted-foreground">
                            {address.city}, {address.state}, {address.pincode}
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" disabled={isPending} className="flex-1 bg-transparent">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button variant="destructive" disabled={isPending} onClick={handleDelete} className="cursor-pointer flex-1">
                            {isPending ? (
                                <>
                                    <Loader2 className="animate-spin" /> Deleting...
                                </>
                            ) : (
                                "Delete"
                            )}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
