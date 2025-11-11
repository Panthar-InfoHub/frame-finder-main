import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="container mx-auto px-4 py-8">
            {/* Breadcrumb */}
            <div className="mb-6 flex items-center gap-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-20" />
                <Skeleton className="h-4 w-4" />
                <Skeleton className="h-4 w-16" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Product Image */}
                <div className="space-y-4">
                    {/* Main Image */}
                    <Skeleton className="w-full aspect-square rounded-lg" />

                    {/* Thumbnail */}
                    <div className="flex gap-2">
                        <Skeleton className="w-20 h-20 rounded-md" />
                    </div>
                </div>

                {/* Right Column - Product Details */}
                <div className="space-y-6">
                    {/* Product Title and ID */}
                    <div className="space-y-2">
                        <Skeleton className="h-10 w-48" />
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-5 w-24" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>
                    </div>

                    {/* Vendor Info */}
                    <div className="space-y-2 border-t pt-4">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-40" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-32" />
                        </div>
                    </div>

                    {/* Reviews */}
                    <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                            <Skeleton className="h-5 w-5" />
                            <Skeleton className="h-5 w-5" />
                            <Skeleton className="h-5 w-5" />
                        </div>
                        <Skeleton className="h-4 w-24" />
                    </div>

                    {/* Price */}
                    <div className="space-y-2">
                        <Skeleton className="h-12 w-40" />
                        <Skeleton className="h-4 w-48" />
                    </div>

                    {/* Color Options */}
                    <div className="space-y-4">
                        <Skeleton className="h-6 w-32" />

                        {/* Color Option Cards */}
                        <div className="grid grid-cols-2 gap-4">
                            {/* Option 1 */}
                            <div className="border rounded-lg p-4 space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-5 w-16" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-5 w-16" />
                                <Skeleton className="h-6 w-20 mt-2" />
                            </div>

                            {/* Option 2 */}
                            <div className="border rounded-lg p-4 space-y-2">
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-5 w-16" />
                                <Skeleton className="h-4 w-24" />
                                <Skeleton className="h-5 w-16" />
                                <Skeleton className="h-6 w-20 mt-2" />
                            </div>
                        </div>
                    </div>

                    {/* Selected Frame and Temple Color */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                        <div className="flex items-center gap-2">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-4 w-16" />
                        </div>
                    </div>

                    {/* Stock Status */}
                    <Skeleton className="h-6 w-40" />

                    {/* Action Buttons (if any) */}
                    <div className="flex gap-4 pt-4">
                        <Skeleton className="h-12 flex-1 rounded-md" />
                        <Skeleton className="h-12 w-12 rounded-md" />
                    </div>
                </div>
            </div>
        </div>
    );
}
