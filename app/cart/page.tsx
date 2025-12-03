import { getCart } from "@/actions/cart";
import CartPageClient from "@/components/cart/cart-page";
import { getImageUrl } from "@/lib/helper";

export default async function CartPage() {
  const cart = await getCart();

  // Extract items array and price breakdown from the response
  const items = cart?.items || [];
  const priceBreakdown = cart?.price_breakdown || null;

  // Process images for each item (handles variant images, product images, and item-level images)
  const itemsWithProcessedImages = await Promise.all(
    items.map(async (item: any) => {
      let processedItem = { ...item };

      // Process variant images (for products with variants like frames, sunglasses, etc.)
      if (item.variant?.images?.[0]?.url) {
        const processedImageUrl = await getImageUrl(item.variant.images[0].url);
        processedItem = {
          ...processedItem,
          variant: {
            ...item.variant,
            images: [
              {
                ...item.variant.images[0],
                url: processedImageUrl,
              },
            ],
          },
        };
      }

      // Process item-level images (for accessories - NEW API structure)
      if (item.images?.[0]?.url) {
        const processedItemImageUrl = await getImageUrl(item.images[0].url);
        processedItem = {
          ...processedItem,
          images: [
            {
              ...item.images[0],
              url: processedItemImageUrl,
            },
          ],
        };
      }

      return processedItem;
    })
  );

  return <CartPageClient cartItems={itemsWithProcessedImages} priceBreakdown={priceBreakdown} />;
}
