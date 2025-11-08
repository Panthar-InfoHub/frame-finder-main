import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { VendorRatingGauge } from "./vendor-rating-gauge";

interface ProductDetailsAccordionProps {
  material: string[];
  shape: string[];
  style: string[];
  gender: string[];
  sizes: string[];
  isPower: boolean;
  vendorName?: string;
  vendorRating?: number;
  vendorRatingCount?: number;
  sellerSince?: string;
}

export function ProductDetailsAccordion({
  material,
  shape,
  style,
  gender,
  sizes,
  isPower,
  vendorName,
  vendorRating,
  vendorRatingCount,
  sellerSince,
}: ProductDetailsAccordionProps) {
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
              {material?.join(", ")}
            </p>
            <p>
              <strong className="text-foreground">Shape:</strong>{" "}
              {shape?.join(", ")}
            </p>
            <p>
              <strong className="text-foreground">Style:</strong>{" "}
              {style?.join(", ")}
            </p>
            <p>
              <strong className="text-foreground">Gender:</strong>{" "}
              {gender?.join(", ")}
            </p>
            <p>
              <strong className="text-foreground">Available Sizes:</strong>{" "}
              {sizes?.join(", ")}
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
            {isPower
              ? "Yes, this frame is suitable for prescription lenses. You can add your prescription details during checkout."
              : "This product is designed for non-prescription use only."}
          </p>
        </AccordionContent>
      </AccordionItem>

      {/* <AccordionItem value="lenses">
        <AccordionTrigger className="text-sm font-semibold">
          ABOUT OUR LENSES
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              Our lenses are crafted with premium materials to ensure optimal
              clarity and protection.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>100% UV Protection</li>
              <li>Anti-glare coating</li>
              <li>Scratch-resistant</li>
              <li>Blue light filtering available</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem> */}

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
                  {vendorName}
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong className="text-foreground">Vendor Rating:</strong>{" "}
                  {vendorRating?.toFixed(1)} ( {vendorRatingCount} Ratings )
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  <strong className="text-foreground">Seller Since:</strong>{" "}
                  {sellerSince}
                </span>
              </li>
            </ul>

            <VendorRatingGauge rating={vendorRating} />
          </div>
        </AccordionContent>
      </AccordionItem>

      {/* <AccordionItem value="exchange">
        <AccordionTrigger className="text-sm font-semibold">
          EXCHANGE & RETURN
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              We offer a 14-day return and exchange policy for all our products.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Products must be in original condition</li>
              <li>Original packaging required</li>
              <li>Free return shipping on defective items</li>
              <li>Refund processed within 5-7 business days</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem> */}
    </Accordion>
  );
}
