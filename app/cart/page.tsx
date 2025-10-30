import { getWishlist } from "@/actions/cart";
import CartPageClient from "@/components/cart/cart-page";


export default async function CartPage() {
  const wishlist = await getWishlist();
  console.log(wishlist);
  return <CartPageClient wishlist={wishlist} />;
}
