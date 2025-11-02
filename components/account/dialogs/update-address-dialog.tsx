"use client"

import type React from "react"

import { updateUser } from "@/actions/user"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldError, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useForm } from "@tanstack/react-form"
import { Loader2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTransition } from "react"
import { toast } from "sonner"
import { Address } from "@/lib/type"

interface UpdateAddressDialogProps {
    children: React.ReactNode
    address: Address
    addresses: Address[]
}



export function UpdateAddressDialog({ children, address, addresses }: UpdateAddressDialogProps) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const form = useForm({
        defaultValues: {
            address_line_1: address.address_line_1,
            city: address.city,
            state: address.state,
            pincode: address.pincode,
        },
        defaultState: { canSubmit: true },
        canSubmitWhenInvalid: true,
        onSubmit: async ({ value }) => {
            startTransition(async () => {
                try {
                    const updatedAddresses = addresses.map((a) =>
                        a._id === address._id
                            ? {
                                ...a,
                                address_line_1: value.address_line_1,
                                city: value.city,
                                state: value.state,
                                pincode: value.pincode,
                            }
                            : a
                    )

                    const result = await updateUser({ address: updatedAddresses })

                    if (result.success) {
                        toast.success("Address updated successfully")
                        router.refresh()
                    } else {
                        toast.warning(result.error || "Failed to update address")
                    }
                } catch (error) {
                    toast.error((error as Error).message || "An unexpected error occurred")
                }
            })
        },
    })

    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Update Address</DialogTitle>
                    <DialogDescription>Edit your address details</DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={(e) => {
                        e.preventDefault()
                        e.stopPropagation()
                        form.handleSubmit()
                    }}
                    className="space-y-4"
                >
                    <form.Field
                        name="address_line_1"
                        children={(field) => (
                            <Field>
                                <FieldLabel htmlFor="address_line_1" className="text-sm font-medium">
                                    Address Line 1 *
                                </FieldLabel>
                                <Input
                                    id="address_line_1"
                                    placeholder="Enter address"
                                    disabled={isPending}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                />
                                {field.state.meta.errors.length > 0 && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        )}
                    />

                    <form.Field
                        name="city"
                        children={(field) => (
                            <Field>
                                <FieldLabel htmlFor="city" className="text-sm font-medium">
                                    City *
                                </FieldLabel>
                                <Input
                                    id="city"
                                    placeholder="Enter city"
                                    disabled={isPending}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                />
                                {field.state.meta.errors.length > 0 && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        )}
                    />

                    <form.Field
                        name="state"
                        children={(field) => (
                            <Field>
                                <FieldLabel htmlFor="state" className="text-sm font-medium">
                                    State *
                                </FieldLabel>
                                <Input
                                    id="state"
                                    placeholder="Enter state"
                                    disabled={isPending}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                />
                                {field.state.meta.errors.length > 0 && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        )}
                    />

                    <form.Field
                        name="pincode"
                        children={(field) => (
                            <Field>
                                <FieldLabel htmlFor="pincode" className="text-sm font-medium">
                                    Pincode *
                                </FieldLabel>
                                <Input
                                    id="pincode"
                                    placeholder="Enter pincode"
                                    disabled={isPending}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                />
                                {field.state.meta.errors.length > 0 && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        )}
                    />

                    <div className="flex gap-2 pt-4">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" disabled={isPending} className="flex-1 bg-transparent">
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button type="submit" disabled={isPending} className="flex-1">
                            {isPending ? (
                                <>
                                    <Loader2 className="animate-spin mr-2" /> Updating...
                                </>
                            ) : (
                                "Update Address"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
