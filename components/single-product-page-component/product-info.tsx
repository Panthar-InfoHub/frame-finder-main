import { Badge } from "@/components/ui/badge"
import { ShareButton } from "../share-component"

interface Vendor {
  _id: string
  business_name: string
  email: string
  phone: string
}

interface ProductInfoProps {
  brandName: string
  productCode: string
  status: string
  vendor: Vendor
  createdAt: string
}

export function ProductInfo({ brandName, productCode, status, vendor, createdAt }: ProductInfoProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-balance">{brandName}</h1>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm text-muted-foreground">{productCode}</p>
            <Badge variant={status === "active" ? "default" : "secondary"}>{status}</Badge>
          </div>
        </div>

        <div className="flex gap-3">
          <ShareButton />
        </div>
      </div>

      <div className="text-xs text-muted-foreground space-y-1 pt-4 border-t border-border">
        <p>
          <strong className="text-foreground">Vendor:</strong> {vendor.business_name}
        </p>
        <p>
          <strong className="text-foreground">Contact:</strong> {vendor.email}
        </p>
        <p>
          <strong className="text-foreground">Listed:</strong>{" "}
          {new Date(createdAt).toLocaleDateString("en-IN", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>
    </div>
  )
}
