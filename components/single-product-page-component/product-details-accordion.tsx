import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface ProductDetailsAccordionProps {
  material: string[]
  shape: string[]
  style: string[]
  gender: string[]
  sizes: string[]
  isPower: boolean
}

export function ProductDetailsAccordion({
  material,
  shape,
  style,
  gender,
  sizes,
  isPower,
}: ProductDetailsAccordionProps) {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="details">
        <AccordionTrigger className="text-sm font-semibold">DETAILS</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong className="text-foreground">Material:</strong> {material?.join(", ")}
            </p>
            <p>
              <strong className="text-foreground">Shape:</strong> {shape?.join(", ")}
            </p>
            <p>
              <strong className="text-foreground">Style:</strong> {style?.join(", ")}
            </p>
            <p>
              <strong className="text-foreground">Gender:</strong> {gender?.join(", ")}
            </p>
            <p>
              <strong className="text-foreground">Available Sizes:</strong> {sizes?.join(", ")}
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="prescription">
        <AccordionTrigger className="text-sm font-semibold">SUITABLE FOR PRESCRIPTION</AccordionTrigger>
        <AccordionContent>
          <p className="text-sm text-muted-foreground">
            {isPower
              ? "Yes, this frame is suitable for prescription lenses. You can add your prescription details during checkout."
              : "This frame is designed for non-prescription use only."}
          </p>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="lenses">
        <AccordionTrigger className="text-sm font-semibold">ABOUT OUR LENSES</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>Our lenses are crafted with premium materials to ensure optimal clarity and protection.</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>100% UV Protection</li>
              <li>Anti-glare coating</li>
              <li>Scratch-resistant</li>
              <li>Blue light filtering available</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="exchange">
        <AccordionTrigger className="text-sm font-semibold">EXCHANGE & RETURN</AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>We offer a 14-day return and exchange policy for all our products.</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Products must be in original condition</li>
              <li>Original packaging required</li>
              <li>Free return shipping on defective items</li>
              <li>Refund processed within 5-7 business days</li>
            </ul>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
