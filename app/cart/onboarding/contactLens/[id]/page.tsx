import { getSignedViewUrl } from "@/actions/cloud-storage";
import AddToCartFormLens from "@/components/cart/cart-form-lens";
import { Suspense } from "react";
import { getContactLensById } from "@/actions/products";

export default async function AddToCartPage({
  params,
}: {
  params: Promise<{ id?: string }>;
}) {
  const { id } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CartPage id={id} />
    </Suspense>
  );
}

const CartPage = async ({ id }: { id: string }) => {
  const resp = await getContactLensById(id);
  if (!resp?.success || !resp.data) {
    return <p className="text-red-500 font-semibold text-lg">Oops! No Details Found</p>;
  }
  const product: any = resp.data;
  const rawProductImg: string | undefined = 
    product?.variants?.[0]?.images?.[0]?.url || 
    product?.variant?.images?.[0]?.url ||
    product?.images?.[0]?.url;
  const productImg = rawProductImg && /^https?:\/\//i.test(rawProductImg)
    ? rawProductImg
    : rawProductImg
    ? await getSignedViewUrl(rawProductImg)
    : "https://placehold.co/400x300";

  return (
    <div className="h-full w-full p-6">
      <AddToCartFormLens 
        product={{ ...product, _signedImage: productImg }} 
        productType="ContactLens" 
      />
    </div>
  );
};

