import { getSignedViewUrl } from "@/actions/cloud-storage"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Order } from "@/lib/type"
import { formatDate, getOrderStatusConfig } from "@/lib/utils"
import { Truck } from "lucide-react"
import Image from "next/image"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"

interface MyOrdersTabProps {
    orders: Order[]
}

export async function MyOrdersTab({ orders }: MyOrdersTabProps) {

    const final_orders = await Promise.all(
        orders.map(async (order: any) => {
            const updatedItems = await Promise.all(
                order.items.map(async (item: any) => {
                    const rawUrl: string | undefined = item?.product_snapshot?.variant_details?.image_url

                    const isHttp = rawUrl && /^https?:\/\//i.test(rawUrl)

                    const signedUrl = rawUrl ? (isHttp ? rawUrl : await getSignedViewUrl(rawUrl)) : ""
                    return { ...item, _image: signedUrl }
                })
            )
            return { ...order, items: updatedItems }
        })
    )

    return (
        <ScrollArea className="h-screen w-full rounded-md border" >
            <div className="space-y-4">
                {final_orders.map((order) => {
                    const statusConfig = getOrderStatusConfig(order.order_status)
                    const StatusIcon = statusConfig.icon

                    return (
                        <Card key={order._id} className="overflow-hidden">
                            {/* Order Header */}
                            <div className="bg-muted/50 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                                <div className="flex flex-wrap items-center gap-6">
                                    <div>
                                        <p className="text-sm text-muted-foreground">Order ID</p>
                                        <p className="font-semibold text-foreground">{order.orderCode}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Order Date</p>
                                        <p className="font-semibold text-foreground">{formatDate(order.createdAt)}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-muted-foreground">Total Price</p>
                                        <p className="font-semibold text-foreground">₹ {order.total_amount.toFixed(2)}</p>
                                    </div>
                                </div>
                                <Badge className={statusConfig.className}>
                                    <StatusIcon className="w-3 h-3 mr-1" />
                                    {statusConfig.label}
                                </Badge>
                            </div>

                            <Separator />

                            {/* Order Items */}
                            <div className="p-6 space-y-4">
                                {order.items.map((item) => (
                                    <div key={item._id} className="flex gap-4">
                                        {/* Product Image */}
                                        <div className="flex-shrink-0">
                                            <div className="w-32 h-32 relative rounded-lg border overflow-hidden bg-muted">
                                                <Image
                                                    src={item._image || "/placeholder.svg"}
                                                    alt={item.productName}
                                                    fill
                                                    className="object-contain p-2"
                                                />
                                            </div>
                                        </div>

                                        {/* Product Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-lg text-foreground mb-1">
                                                        {item.product_snapshot.brand_name}
                                                    </h4>
                                                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                                                        {item.productName}
                                                        {item.product_snapshot.variant_details.frame_color && (
                                                            <> | Frame: {item.product_snapshot.variant_details.frame_color}</>
                                                        )}
                                                        {item.product_snapshot.variant_details.temple_color && (
                                                            <> | Temple: {item.product_snapshot.variant_details.temple_color}</>
                                                        )}
                                                    </p>

                                                    {/* Lens Package Details */}
                                                    {item.lens_package_detail?.package_type && (
                                                        <div className="mb-2">
                                                            <Badge variant="outline" className="text-[#00AA78] border-[#00AA78]">
                                                                {item.lens_package_detail.package_type}
                                                                {item.lens_package_detail.package_design &&
                                                                    ` / ${item.lens_package_detail.package_design}`}
                                                            </Badge>
                                                        </div>
                                                    )}

                                                    {/* Prescription */}
                                                    {item.prescription?.power && (
                                                        <p className="text-sm text-muted-foreground mb-2">Power: {item.prescription.power}</p>
                                                    )}

                                                    {/* Vendor Info */}
                                                    <p className="text-xs text-muted-foreground">Sold by: {item.vendor_snapshot.business_name}</p>

                                                    {/* Quantity */}
                                                    {item.quantity > 1 && (
                                                        <p className="text-sm text-muted-foreground mt-1">Quantity: {item.quantity}</p>
                                                    )}
                                                </div>

                                                {/* Price */}
                                                <div className="text-right flex-shrink-0">
                                                    <p className="text-xl font-bold text-foreground">
                                                        ₹ {item.product_snapshot.variant_details.total_price.toFixed(2)}
                                                    </p>
                                                    {item.lens_package_detail?.package_price && (
                                                        <p className="text-xs text-muted-foreground mt-1">
                                                            + ₹{item.lens_package_detail.package_price} (Lens)
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                {/* Order Summary */}
                                <Separator className="my-4" />

                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">Subtotal</span>
                                        <span className="text-foreground">
                                            ₹ {(order.total_amount - order.tax - order.shipping_cost + order.discount).toFixed(2)}
                                        </span>
                                    </div>
                                    {order.discount > 0 && (
                                        <div className="flex justify-between text-green-600">
                                            <span>Discount {order.coupon_code && `(${order.coupon_code})`}</span>
                                            <span>- ₹ {order.discount.toFixed(2)}</span>
                                        </div>
                                    )}
                                    {order.tax > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Tax</span>
                                            <span className="text-foreground">₹ {order.tax.toFixed(2)}</span>
                                        </div>
                                    )}
                                    {order.shipping_cost > 0 && (
                                        <div className="flex justify-between">
                                            <span className="text-muted-foreground">Shipping</span>
                                            <span className="text-foreground">₹ {order.shipping_cost.toFixed(2)}</span>
                                        </div>
                                    )}
                                    <Separator />
                                    <div className="flex justify-between font-semibold text-base">
                                        <span className="text-foreground">Total Amount</span>
                                        <span className="text-foreground">₹ {order.total_amount.toFixed(2)}</span>
                                    </div>
                                </div>

                                {/* Shipping Address */}
                                <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                                    <p className="text-sm font-semibold text-foreground mb-2">Shipping Address</p>
                                    <p className="text-sm text-muted-foreground">
                                        {order.shipping_address.address_line_1}
                                        <br />
                                        {order.shipping_address.city}, {order.shipping_address.state} - {order.shipping_address.pincode}
                                        <br />
                                        Phone: {order.shipping_address.phone}
                                    </p>
                                </div>

                                {/* Track Order Button */}
                                {order.tracking_id && order.order_status !== "delivered" && order.order_status !== "cancelled" && (
                                    <div className="flex justify-end mt-4">
                                        <Button
                                            variant="outline"
                                            className="border-[#00AA78] text-[#00AA78] hover:bg-[#00AA78] hover:text-white bg-transparent"
                                        >
                                            <Truck className="w-4 h-4 mr-2" />
                                            Track Order
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </Card>
                    )
                })}
            </div>
            <ScrollBar orientation="vertical" />
        </ScrollArea>
    )
}
