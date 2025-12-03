"use client"

import { updateUser } from "@/actions/user"
import { Button } from "@/components/ui/button"
import { Field, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { IUser } from "@/lib/type"
import { useForm } from "@tanstack/react-form"
import { Camera, Loader2, Save } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState, useTransition } from "react"
import { toast } from "sonner"
import { ImageUploader } from "./profile-img-dialog"
import { getSignedUploadUrl } from "@/actions/cloud-storage"

interface AccountInformationTabProps {
    userData: IUser
}

export function AccountInformationTab({ userData }: AccountInformationTabProps) {
    const [isPending, startTransition] = useTransition()
    const router = useRouter()
    const [profileImage, setProfileImage] = useState<string>(userData._image || "")
    const [pendingImageFile, setPendingImageFile] = useState<File | null>(null)
    const [previewUrl, setPreviewUrl] = useState<string>("")

    const form = useForm({
        defaultValues: {
            first_name: userData.first_name || "",
            last_name: userData.last_name || "",
            email: userData.email || "",
            phone: userData.phone || "",
            gender: userData.gender || "male",
            img: {
                url: userData.img?.url || ""
            }
        },
        defaultState: {
            canSubmit: true
        },
        canSubmitWhenInvalid: true,
        onSubmit: async ({ value }) => {
            startTransition(async () => {
                try {
                    let imageUrl = profileImage;


                    if (pendingImageFile) {

                        const { url, path } = await getSignedUploadUrl({
                            filename: pendingImageFile.name,
                            contentType: pendingImageFile.type,
                            rootFolder: "user",
                            folderName: "profile",
                        })


                        const response = await fetch(url, {
                            method: "PUT",
                            headers: {
                                "Content-Type": pendingImageFile.type,
                            },
                            body: pendingImageFile,
                        })

                        if (!response.ok) {
                            throw new Error("Image upload failed")
                        }

                        imageUrl = path

                        if (previewUrl) {
                            URL.revokeObjectURL(previewUrl)
                        }
                    }

                    value.img.url = imageUrl

                    const result = await updateUser(value)
                    if (result.success) {
                        toast.success("Profile updated successfully")
                        router.refresh()
                    } else {
                        toast.warning(result.error || "Failed to update profile")
                    }
                } catch (error: any) {
                    toast.error(error?.message || "Failed to update profile")
                }
            })
        },
    })

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                form.handleSubmit()
            }}
            className="w-full space-y-6"
        >
            <div className="flex justify-center mb-8">
                <div className="relative">
                    <img
                        src={previewUrl || profileImage}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-[#00AA78]"
                    />
                    <ImageUploader
                        images={profileImage}
                        onChange={(file: File) => {
                            setPendingImageFile(file)
                            const preview = URL.createObjectURL(file)
                            setPreviewUrl(preview)
                            toast.success("Image selected. Click 'Save & Continue' to upload.")
                        }}
                        maxImages={1}
                        buttonLabel=""
                        maxFileSize={5}
                    >
                        <Button type="button" className="absolute bottom-2 right-2 bg-[#00AA78] text-white p-2 rounded-full hover:opacity-90 transition-opacity">
                            <Camera className="w-4 h-4" />
                        </Button>
                    </ImageUploader>
                </div>
            </div>

            <div className="border-2 border-[#00AA78] rounded-2xl p-8 space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <form.Field
                        name="first_name"
                        children={(field) => (
                            <Field>
                                <FieldLabel htmlFor="first_name" className="text-[#00AA78] font-medium">
                                    First Name
                                </FieldLabel>
                                <Input
                                    id="first_name"
                                    placeholder="Enter first name"
                                    disabled={isPending}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    className="bg-gray-100 border-0"
                                />
                            </Field>
                        )}
                    />

                    <form.Field
                        name="last_name"
                        children={(field) => (
                            <Field>
                                <FieldLabel htmlFor="last_name" className="text-[#00AA78] font-medium">
                                    Last Name
                                </FieldLabel>
                                <Input
                                    id="last_name"
                                    placeholder="Enter last name"
                                    disabled={isPending}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    className="bg-gray-100 border-0"
                                />
                            </Field>
                        )}
                    />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <form.Field
                        name="phone"
                        children={(field) => (
                            <Field>
                                <FieldLabel htmlFor="phone" className="text-[#00AA78] font-medium">
                                    Mobile no.
                                </FieldLabel>
                                <Input
                                    id="phone"
                                    type="tel"
                                    placeholder="Enter phone number"
                                    disabled={isPending}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    className="bg-gray-100 border-0"
                                />
                            </Field>
                        )}
                    />

                    <form.Field
                        name="email"
                        children={(field) => (
                            <Field>
                                <FieldLabel htmlFor="email" className="text-[#00AA78] font-medium">
                                    Email
                                </FieldLabel>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter email address"
                                    disabled={isPending}
                                    value={field.state.value}
                                    onChange={(e) => field.handleChange(e.target.value)}
                                    onBlur={field.handleBlur}
                                    className="bg-gray-100 border-0"
                                />
                            </Field>
                        )}
                    />
                </div>

                <form.Field
                    name="gender"
                    children={(field) => (
                        <Field>
                            <FieldLabel htmlFor="gender" className="text-[#00AA78] font-medium">
                                Gender
                            </FieldLabel>
                            <Select
                                disabled={isPending}
                                value={field.state.value}
                                onValueChange={(value: any) => field.handleChange(value)}
                            >
                                <SelectTrigger id="gender" className="w-full bg-gray-100 border-0">
                                    <SelectValue placeholder="Select gender" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">Male</SelectItem>
                                    <SelectItem value="female">Female</SelectItem>
                                    <SelectItem value="others">Others</SelectItem>
                                </SelectContent>
                            </Select>
                        </Field>
                    )}
                />
            </div>

            <Button type="submit" disabled={isPending} className="w-full sm:w-auto px-8 py-3 bg-[#00AA78] text-white font-normal cursor-pointer hover:bg-[#00AA78]/90">
                {isPending ? <> <Loader2 className="animate-spin" /> Saving... </> : <> <Save /> Save & Continue </>}
            </Button>
        </form >
    )
}
