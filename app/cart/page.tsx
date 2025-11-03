import { getWishlist } from "@/actions/cart";
import CartPageClient from "@/components/cart/cart-page";
import { getImageUrl } from "@/lib/helper";

export default async function CartPage() {
  const wishlist = await getWishlist();
  console.log(wishlist);

  // Extract items array and price breakdown from the response
  const items = wishlist?.items || [];
  const priceBreakdown = wishlist?.price_breakdown || null;

  // Process images for each item (handles both variant images and product images for accessories)
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

      // Process product images (for accessories without variants)
      if (item.product?.images?.[0]?.url) {
        const processedProductImageUrl = await getImageUrl(item.product.images[0].url);
        processedItem = {
          ...processedItem,
          product: {
            ...item.product,
            images: [
              {
                ...item.product.images[0],
                url: processedProductImageUrl,
              },
            ],
          },
        };
      }

      return processedItem;
    })
  );

  return <CartPageClient wishlist={itemsWithProcessedImages} priceBreakdown={priceBreakdown} />;
}
