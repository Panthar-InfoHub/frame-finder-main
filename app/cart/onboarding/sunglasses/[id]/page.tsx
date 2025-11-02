import { getSignedViewUrl } from "@/actions/cloud-storage";
import { Suspense } from "react";
import { getSunglassesById } from "@/actions/products";
import AddToCartForm from "@/components/cart/cart-form";

export default async function AddToCartPage({ params }: { params: Promise<{ id?: string }> }) {
  const { id } = await params;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CartPage id={id} />
    </Suspense>
  );
}

const CartPage = async ({ id }: { id: string }) => {
  const resp = await getSunglassesById(id);
  if (!resp?.success || !resp.data) {
    return <p className="text-red-500 font-semibold text-lg">Oops! No Details Found</p>;
  }
  const product: any = resp.data;
  const rawProductImg: string | undefined = product?.variants?.[0]?.images?.[0]?.url;
  const productImg =
    rawProductImg && /^https?:\/\//i.test(rawProductImg)
      ? rawProductImg
      : rawProductImg
      ? await getSignedViewUrl(rawProductImg)
      : "https://placehold.co/400x300";

  const vendorId: string | undefined = product?.vendorId?._id;

  return (
    <div className="h-full w-full p-6">
      <AddToCartForm
        product={{ ...product, _signedImage: productImg }}
        vendorId={vendorId}
        productType={"Sunglass"}
      />
    </div>
  );
};
