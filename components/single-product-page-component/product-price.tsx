interface ProductPriceProps {
  totalPrice: number
  mrp: number
  basePrice?: number
}

export function ProductPrice({ totalPrice, mrp, basePrice }: ProductPriceProps) {
  const discount = Math.round(((mrp - totalPrice) / mrp) * 100)

  return (
    <div className="space-y-1">
      <div className="flex items-baseline gap-3">
        <p className="text-3xl font-bold text-foreground">₹{totalPrice.toLocaleString("en-IN")}/-</p>
        {discount > 0 && (
          <span className="text-sm font-medium text-green-600 bg-green-50 px-2 py-1 rounded">{discount}% OFF</span>
        )}
      </div>
      <p className="text-sm text-muted-foreground">
        MRP: <span className="line-through">₹{mrp.toLocaleString("en-IN")}</span> (Incl. of all taxes)
      </p>
    </div>
  )
}
