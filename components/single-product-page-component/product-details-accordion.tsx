import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { VendorRatingGauge } from "./vendor-rating-gauge";

interface ProductDetailsAccordionProps {
  details: any;
  productType?: string;
}

export function ProductDetailsAccordion({
  details,
  productType,
}: ProductDetailsAccordionProps) {
  if (productType === "frames" || productType === "sunglasses" || productType === "readingGlasses") {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="details">
          <AccordionTrigger className="text-sm font-semibold">
            DETAILS
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Material:</strong>{" "}
                {details?.material?.join(", ")}
              </p>
              <p>
                <strong className="text-foreground">Shape:</strong>{" "}
                {details?.shape?.join(", ")}
              </p>
              <p>
                <strong className="text-foreground">Style:</strong>{" "}
                {details?.style?.join(", ")}
              </p>
              <p>
                <strong className="text-foreground">Gender:</strong>{" "}
                {details?.gender?.join(", ")}
              </p>
              <p>
                <strong className="text-foreground">Available Sizes:</strong>{" "}
                {details?.sizes?.join(", ")}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="prescription">
          <AccordionTrigger className="text-sm font-semibold">
            SUITABLE FOR PRESCRIPTION
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground">
              {details?.isPower
                ? "Yes, this frame is suitable for prescription lenses. You can add your prescription details during checkout."
                : "This product is designed for non-prescription use only."}
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="vendor">
          <AccordionTrigger className="text-sm font-semibold">
            VENDOR RATING
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong className="text-foreground">Vendor Name:</strong>{" "}
                    {details?.vendorName}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong className="text-foreground">Vendor Rating:</strong>{" "}
                    {details?.vendorRating?.toFixed(1)} ({" "}
                    {details?.vendorRatingCount} Ratings )
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong className="text-foreground">Seller Since:</strong>{" "}
                    {details?.sellerSince}
                  </span>
                </li>
              </ul>

              <VendorRatingGauge rating={details?.vendorRating} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  }else if (productType === "contactLens") {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="details">
          <AccordionTrigger className="text-sm font-semibold">
            DETAILS
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Lens Type:</strong>{" "}
                {details?.lens_type || "N/A"}
              </p>
              <p>
                <strong className="text-foreground">Lens Width:</strong>{" "}
                {details?.lens_width || "N/A"}
              </p>
              <p>
                <strong className="text-foreground">Lens Height:</strong>{" "}
                {details?.lens_height || "N/A"}
              </p>
              <p>
                <strong className="text-foreground">Quantity:</strong>{" "}
                {details?.quantity}
              </p>
              <p>
                <strong className="text-foreground">Manufacture Date:</strong>{" "}
                {details?.mfg_date}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="prescription">
          <AccordionTrigger className="text-sm font-semibold">
            SUITABLE FOR PRESCRIPTION
          </AccordionTrigger>
          <AccordionContent>
            <p className="text-sm text-muted-foreground">
              Yes, this frame is suitable for prescription lenses. You can add your prescription details during checkout.
            </p>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="vendor">
          <AccordionTrigger className="text-sm font-semibold">
            VENDOR RATING
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong className="text-foreground">Vendor Name:</strong>{" "}
                    {details?.vendorName}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong className="text-foreground">Vendor Rating:</strong>{" "}
                    {details?.vendorRating?.toFixed(1)} ({" "}
                    {details?.vendorRatingCount} Ratings )
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong className="text-foreground">Seller Since:</strong>{" "}
                    {details?.sellerSince}
                  </span>
                </li>
              </ul>

              <VendorRatingGauge rating={details?.vendorRating} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }else if (productType === "contactLensSolution") {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="details">
          <AccordionTrigger className="text-sm font-semibold">
            DETAILS
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Lens Material:</strong>{" "}
                {details?.lens_material?.join(", ")|| "N/A"}
              </p>
              <p>
                <strong className="text-foreground">Origin Country:</strong>{" "}
                {details?.origin_contry || "N/A"}
              </p>
              <p>
                <strong className="text-foreground">Manufacturing Date:</strong>{" "}
                {details?.mfg_date || "N/A"}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="vendor">
          <AccordionTrigger className="text-sm font-semibold">
            VENDOR RATING
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong className="text-foreground">Vendor Name:</strong>{" "}
                    {details?.vendorName}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong className="text-foreground">Vendor Rating:</strong>{" "}
                    {details?.vendorRating?.toFixed(1)} ({" "}
                    {details?.vendorRatingCount} Ratings )
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong className="text-foreground">Seller Since:</strong>{" "}
                    {details?.sellerSince}
                  </span>
                </li>
              </ul>

              <VendorRatingGauge rating={details?.vendorRating} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }else if (productType === "accessories") {
    return (
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="details">
          <AccordionTrigger className="text-sm font-semibold">
            DETAILS
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <strong className="text-foreground">Materials:</strong>{" "}
                {details?.materials?.join(", ")|| "N/A"}
              </p>
              <p>
                <strong className="text-foreground">Origin Country:</strong>{" "}
                {details?.origin_country || "N/A"}
              </p>
              <p>
                <strong className="text-foreground">Size:</strong>{" "}
                {details?.size?.join(", ") || "N/A"}
              </p>
              <p>
                <strong className="text-foreground">Manufacturing Date:</strong>{" "}
                {details?.mfg_date || "N/A"}
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="vendor">
          <AccordionTrigger className="text-sm font-semibold">
            VENDOR RATING
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong className="text-foreground">Vendor Name:</strong>{" "}
                    {details?.vendorName}
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong className="text-foreground">Vendor Rating:</strong>{" "}
                    {details?.vendorRating?.toFixed(1)} ({" "}
                    {details?.vendorRatingCount} Ratings )
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>
                    <strong className="text-foreground">Seller Since:</strong>{" "}
                    {details?.sellerSince}
                  </span>
                </li>
              </ul>

              <VendorRatingGauge rating={details?.vendorRating} />
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    )
  }
}
