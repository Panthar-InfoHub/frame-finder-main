import { getSignedViewUrl } from "@/actions/cloud-storage";
import { globalSearchAction } from "@/actions/frontend";
import { EmptyComponent } from "@/components/empty-component";
import { Header } from "@/components/home-page/header";
import LoadingSkeleton from "@/components/loading-skeleton";
import { FilterSidebar } from "@/components/multiple-products-page-component/filter-sidebar";
import SearchReset from "@/components/search-form-reset";
import { SearchCard } from "@/components/searchCard";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { categories } from "@/lib/data";
import { getProductUrlType } from "@/lib/helper";
import { Search, SlidersHorizontal } from "lucide-react";
import Form from 'next/form';
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";


interface FramesProps {
    searchParams: Promise<{
        query?: string;
    }>;
}


export default async function Frames({ searchParams }: FramesProps) {
    const FilterContent = () => <FilterSidebar />;

    const { query } = await searchParams

    const response = await globalSearchAction(query || "")

    if (!response.success) {
        return <p>Error : failed to load the page</p>;
    }

    const newArrivals = await Promise.all(
        response.data.map(async (product: any) => {
            const rawUrl: string | undefined = product?.variants?.[0]?.images?.[0]?.url || product?.images?.[0]?.url
            const isHttp = rawUrl && /^https?:\/\//i.test(rawUrl)
            const signedUrl = rawUrl ? (isHttp ? rawUrl : await getSignedViewUrl(rawUrl)) : ""
            return { ...product, _image: signedUrl }
        })
    )


    const data = {
        pagination: {
            totalProducts: newArrivals.length
        },
        products: newArrivals
    };

    return (
        <main className="min-h-screen">
            <Header alwaysBlurred={true} />
            <section className="relative h-[350px] md:h-[500px] w-full overflow-hidden bg-neutral-800">
                <div className="absolute inset-0 bg-black/40 z-10" />
                <div className="absolute inset-0 z-0">
                    <Image src="/images/bg/frame_bg.png" alt="Hero Image" fill className="object-cover h-full w-full" />
                </div>
                <div className="relative z-20 flex items-center justify-center h-full">
                    <Form action="/search" scroll={false} className="search-form max-w-3xl w-full min-h-20 bg-white border-[5px] border-emerald-500 rounded-[80px] mt-8 px-5 flex flex-row items-center gap-5" >
                        <InputGroup className="flex-1 font-bold placeholder:font-semibold placeholder:text-black-100 w-full h-auto" >
                            <InputGroupInput name="query" defaultValue={query || ""} placeholder="Search..." className="flex-1 font-bold placeholder:font-semibold placeholder:text-black-100 w-full h-auto  text-[24px]!" />
                            <InputGroupAddon> <Search className="size-8 text-emerald-500 font-extrabold" /></InputGroupAddon>
                            <InputGroupAddon align="inline-end">{query && <SearchReset />}</InputGroupAddon>

                        </InputGroup>

                    </Form>
                </div>
            </section>
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Desktop Sidebar - Always visible and static */}
                    <aside className="hidden lg:block shrink-0 w-64">
                        <div className="sticky top-8">
                            <FilterContent />
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Header */}
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                            {/* Mobile Filter Button */}
                            <Sheet>
                                <SheetTrigger asChild>
                                    <Button
                                        variant="outline"
                                        className="lg:hidden bg-transparent"
                                    >
                                        <SlidersHorizontal className="w-4 h-4 mr-2" />
                                        FILTER
                                    </Button>
                                </SheetTrigger>
                                <SheetContent side="left" className="w-80 overflow-y-auto">
                                    <div className="py-6">
                                        <FilterContent />
                                    </div>
                                </SheetContent>
                            </Sheet>

                            <div className="flex items-center gap-4 flex-1 justify-center lg:justify-start">
                                <span className="font-semibold">
                                    {data.pagination.totalProducts} PRODUCTS
                                </span>
                            </div>

                            <Button variant="ghost" className="text-sm font-semibold">
                                RESET
                            </Button>
                        </div>

                        {/* Category Tabs - Static, no click handlers */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            <Button variant="default" className="rounded-full">
                                All
                            </Button>
                            {categories.map((category) => (
                                <Button
                                    key={category.value}
                                    variant="outline"
                                    className="rounded-full bg-transparent"
                                >
                                    {category.label}
                                </Button>
                            ))}
                        </div>

                        {/* Product Grid */}
                        <Suspense fallback={<LoadingSkeleton />}>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                                {data.products.length > 0 ? data.products.map((product) => (
                                    <Link href={`/${getProductUrlType(product.productType)}/${product._id}?variantId=${product?.variants?.[0]?._id}`} key={product._id}>
                                        <SearchCard key={product._id} product={product} />
                                    </Link>
                                )) : <div className="w-full" >
                                    <EmptyComponent name="No products found." />
                                </div>}
                            </div>
                        </Suspense>

                    </div>
                </div>
            </div>

        </main>
    );
}
