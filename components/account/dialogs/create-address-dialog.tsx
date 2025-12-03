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

interface CreateAddressDialogProps {
    children: React.ReactNode
    addresses?: Address[]
}


export function CreateAddressDialog({ children, addresses }: CreateAddressDialogProps) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()

    const form = useForm({
        defaultValues: {
            address_line_1: "",
            city: "",
            state: "",
            pincode: "",
        },
        defaultState: {
            canSubmit: true
        },
        canSubmitWhenInvalid: true,
        onSubmit: async ({ value }) => {
            const address = { ...value, }
            startTransition(async () => {
                try {
                    const result = await updateUser({ address: [...addresses, address] })

                    if (result.success) {
                        toast.success("Address created successfully")
                        form.reset()
                        router.refresh()
                    } else {
                        toast.warning(result.error || "Failed to create address")
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
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add New Address</DialogTitle>
                    <DialogDescription>Add a new address to your address book</DialogDescription>
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
                                    placeholder="Enter street address"
                                    disabled={isPending}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                />
                                {field.state.meta.errors.length > 0 && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-4">
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
                    </div>

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
                                    inputMode="numeric"         
                                    maxLength={6}
                                    disabled={isPending}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                />
                                {field.state.meta.errors.length > 0 && <FieldError errors={field.state.meta.errors} />}
                            </Field>
                        )}
                    />

                    <div className="flex gap-2">
                        <DialogClose asChild>
                            <Button type="button" variant="outline" disabled={isPending}>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button type="submit" disabled={isPending} className="cursor-pointer bg-[#00AA78] hover:bg-[#00AA78]/90">
                            {isPending ? (
                                <>
                                    <Loader2 className="animate-spin" /> Saving...
                                </>
                            ) : (
                                "Save Address"
                            )}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    )
}
