"use client"

import type React from "react"
import { useState, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { Upload, X, ImageIcon, AlertCircle, Camera } from "lucide-react"

interface ImageUploaderProps {
    images?: string | string[]
    onChange?: (file: File | File[]) => void
    maxImages?: number
    buttonLabel?: string
    maxFileSize?: number
    children?: React.ReactNode
    acceptedTypes?: string[]
    inReview?: boolean
}

interface UploadError {
    message: string
    type: "validation" | "upload" | "network"
}

export function ImageUploader({
    images = "",
    onChange,
    maxImages = 1,
    buttonLabel = "Add Images",
    maxFileSize = 5,
    children,
    inReview = false,
    acceptedTypes = ["image/jpeg", "image/png", "image/webp"],
}: ImageUploaderProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [pendingFiles, setPendingFiles] = useState<File[]>([])
    const [previewUrls, setPreviewUrls] = useState<string[]>([])
    const [error, setError] = useState<UploadError | null>(null)
    const [isDragOver, setIsDragOver] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)

    const existingImages = Array.isArray(images) ? images : images ? [images] : []

    const validateFile = useCallback(
        (file: File): string | null => {
            if (!acceptedTypes.includes(file.type)) {
                return `File type ${file.type} is not supported. Please use ${acceptedTypes.join(", ")}.`
            }
            if (file.size > maxFileSize * 1024 * 1024) {
                return `File size must be less than ${maxFileSize}MB.`
            }
            return null
        },
        [acceptedTypes, maxFileSize],
    )

    const handleFiles = useCallback(
        (files: FileList | File[]) => {
            const fileArray = Array.from(files)
            const validFiles: File[] = []
            let errorMessage = ""

            if (existingImages.length + pendingFiles.length + fileArray.length > maxImages) {
                setError({
                    message: `Maximum ${maxImages} images allowed. You can add ${maxImages - existingImages.length - pendingFiles.length
                        } more.`,
                    type: "validation",
                })
                return
            }

            for (const file of fileArray) {
                const validationError = validateFile(file)
                if (validationError) {
                    errorMessage = validationError
                    break
                }

                const isDuplicate = pendingFiles.some((existing) => existing.name === file.name && existing.size === file.size)
                if (!isDuplicate) validFiles.push(file)
            }

            if (errorMessage) {
                setError({ message: errorMessage, type: "validation" })
                return
            }
            if (validFiles.length === 0) {
                setError({ message: "No new files to add.", type: "validation" })
                return
            }

            setError(null)
            setPendingFiles((prev) => [...prev, ...validFiles])
            const newPreviewUrls = validFiles.map((file) => URL.createObjectURL(file))
            setPreviewUrls((prev) => [...prev, ...newPreviewUrls])

            if (validFiles.length > 0) {
                inReview ? onChange?.(validFiles) : onChange?.(validFiles[0])
                // Clean up and close after a short delay to show preview
                setTimeout(() => {
                    previewUrls.forEach((url) => URL.revokeObjectURL(url))
                    setPendingFiles([])
                    setPreviewUrls([])
                    setIsOpen(false)
                }, 500)
            }
        },
        [existingImages.length, pendingFiles, maxImages, validateFile, onChange, previewUrls],
    )

    const handleDrop = useCallback(
        (e: React.DragEvent) => {
            e.preventDefault()
            setIsDragOver(false)
            handleFiles(e.dataTransfer.files)
        },
        [handleFiles],
    )

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(true)
    }, [])

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault()
        setIsDragOver(false)
    }, [])

    const handleFileInput = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (e.target.files) handleFiles(e.target.files)
        },
        [handleFiles],
    )

    const removePendingFile = useCallback(
        (index: number) => {
            const newFiles = pendingFiles.filter((_, i) => i !== index)
            const newPreviewUrls = previewUrls.filter((_, i) => i !== index)
            URL.revokeObjectURL(previewUrls[index])
            setPendingFiles(newFiles)
            setPreviewUrls(newPreviewUrls)
            setError(null)
        },
        [pendingFiles, previewUrls],
    )

    const handleCancel = useCallback(() => {
        previewUrls.forEach((url) => URL.revokeObjectURL(url))
        setPendingFiles([])
        setPreviewUrls([])
        setError(null)
        setIsOpen(false)
    }, [previewUrls])

    const canAddMore = existingImages.length < maxImages

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Upload Profile Picture</DialogTitle>
                </DialogHeader>

                <div className="space-y-4">
                    <div
                        onDrop={handleDrop}
                        onDragOver={handleDragOver}
                        onDragLeave={handleDragLeave}
                        onClick={() => fileInputRef.current?.click()}
                        className={cn(
                            "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
                            isDragOver ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50",
                        )}
                        role="button"
                        tabIndex={0}
                        aria-label="Upload images"
                        onKeyDown={(e) => {
                            if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault()
                                fileInputRef.current?.click()
                            }
                        }}
                    >
                        <ImageIcon className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                        <p className="text-lg font-medium mb-2">Drag & drop image here, or click to select</p>
                        <p className="text-sm text-muted-foreground">
                            Supports {acceptedTypes.map((type) => type.split("/")[1]).join(", ")} up to {maxFileSize}MB
                        </p>
                        <Badge variant="secondary" className="mt-2">
                            {maxImages - existingImages.length - pendingFiles.length} remaining
                        </Badge>
                    </div>

                    <input
                        ref={fileInputRef}
                        type="file"
                        accept={acceptedTypes.join(",")}
                        onChange={handleFileInput}
                        className="hidden"
                        aria-hidden="true"
                    />

                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-destructive/10 text-destructive rounded-lg">
                            <AlertCircle className="h-4 w-4" />
                            <p className="text-sm">{error.message}</p>
                        </div>
                    )}

                    {pendingFiles.length > 0 && (
                        <div className="space-y-3">
                            <h4 className="font-medium">Preview</h4>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {pendingFiles.map((file, index) => (
                                    <div key={`${file.name}-${index}`} className="relative group">
                                        <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                                            <img
                                                src={previewUrls[index] || "/placeholder.svg"}
                                                alt={`Preview ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => removePendingFile(index)}
                                            aria-label={`Remove ${file.name}`}
                                        >
                                            <X className="h-3 w-3" />
                                        </Button>
                                        <p className="text-xs text-muted-foreground mt-1 truncate">{file.name}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
