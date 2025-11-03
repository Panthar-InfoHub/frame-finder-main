import { ChevronLeft } from "lucide-react"
import { getUser } from "@/actions/user"
import { AccountInformationTab } from "@/components/account/account-tab"
import { AddressBookTab } from "@/components/account/address-book-tab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IUser } from "@/lib/type"
import { Header } from "@/components/home-page/header"
import Link from "next/link"
import { Suspense } from "react"
import LoadingSkeleton from "@/components/loading-skeleton"
import { getOrderByUser } from "@/actions/order"
import { MyOrdersTab } from "@/components/account/my-orders-tab"

const PROFILE_TABS = [
    { value: "account", label: "Account Information" },
    { value: "orders", label: "My Orders" },
    { value: "address", label: "Address Book" },
    { value: "prescriptions", label: "Prescriptions" },
    // { value: "wishlist", label: "Wishlist" },
    // { value: "updates", label: "App Update Available" },
    { value: "permissions", label: "App Permissions" },
    { value: "rating", label: "Your Rating" },
    // { value: "logout", label: "Logout" },
]

export default async function ProfilePage() {
    const [userResult, orderResult] = await Promise.all([getUser(), getOrderByUser()])

    if (!userResult.success || !userResult.data) {
        return (
            <main className="min-h-screen bg-white p-4 sm:p-6 lg:p-8">
                <div className="text-center py-12">
                    <p className="text-gray-600">Failed to load user data</p>
                </div>
            </main>
        )
    }

    const user_data: IUser = userResult.data
    const order_data = orderResult.data

    // console.log("Order Data ==> ", order_data)

    return (
        <main className="min-h-screen">
            <Header alwaysBlurred={true} />
            <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8">
                <Link href="/" className="flex items-center gap-2 text-gray-700 mb-2 hover:opacity-70 transition-opacity pb-8">
                    <ChevronLeft className="w-5 h-5" />
                    <span className="text-sm">Back</span>
                </Link>
                <Tabs defaultValue="account" orientation="vertical" className="flex flex-col sm:flex-row gap-6 lg:gap-8">
                    {/* Vertical TabsList */}
                    <TabsList className="w-full sm:w-80 bg-[#C8F0E1] rounded-3xl p-6 flex flex-col gap-3 shrink-0 h-fit">

                        {PROFILE_TABS.map((tab) => (
                            <TabsTrigger
                                key={tab.value}
                                value={tab.value}
                                className="w-full px-4 py-3 rounded-2xl text-left font-medium transition-all text-gray-800 hover:opacity-80 data-[state=inactive]:hover:bg-[rgba(0,170,119,0.4)] data-[state=active]:bg-[#00AA78] data-[state=active]:text-white data-[state=active]:shadow-sm justify-start cursor-pointer"
                            >
                                {tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>

                    {/* Main Content Area */}
                    <Suspense fallback={<LoadingSkeleton />} >
                        <div className="flex-1">
                            <div className="mb-8">

                                {/* Tab Contents */}
                                <TabsContent value="account" className="mt-0">
                                    <h1 className="text-3xl sm:text-4xl font-bold text-black mb-6">Edit Account Information</h1>
                                    <AccountInformationTab userData={user_data} />
                                </TabsContent>

                                <TabsContent value="orders" className="mt-0">
                                    <h1 className="text-3xl sm:text-4xl font-bold text-black mb-6">View Orders</h1>
                                    <MyOrdersTab orders={order_data.orders} />
                                </TabsContent>

                                <TabsContent value="address" className="mt-0">
                                    <h1 className="text-3xl sm:text-4xl font-bold text-black mb-6">Address Book</h1>
                                    <AddressBookTab addresses={user_data.address} userName={user_data.first_name + " " + user_data.last_name} />
                                </TabsContent>

                                <TabsContent value="prescriptions" className="mt-0">
                                    {/* <PrescriptionsTab prescription={userData.prescription} /> */}
                                </TabsContent>

                                <TabsContent value="wishlist" className="mt-0">
                                    {/* <WishlistTab /> */}
                                </TabsContent>

                                <TabsContent value="updates" className="mt-0">
                                    {/* <AppUpdateTab /> */}
                                </TabsContent>

                                <TabsContent value="permissions" className="mt-0">
                                    {/* <AppPermissionsTab /> */}
                                </TabsContent>

                                <TabsContent value="rating" className="mt-0">
                                    {/* <RatingTab walletPoints={userData.wallet_point} /> */}
                                </TabsContent>

                                <TabsContent value="logout" className="mt-0">
                                    {/* <LogoutTab /> */}
                                </TabsContent>
                            </div>
                        </div>
                    </Suspense>
                </Tabs>
            </div>
        </main>
    )
}
