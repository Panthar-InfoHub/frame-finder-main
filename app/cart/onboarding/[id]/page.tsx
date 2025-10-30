import { getPkgFromProductId } from "@/actions/cart";
import { getSignedViewUrl } from "@/actions/cloud-storage";
import AddToCartForm from "@/components/cart/cart-form";
import { Suspense } from "react";

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
  const resp = await getPkgFromProductId(id);
  if (!resp?.success || !resp.data) {
    return <p className="text-red-500 font-semibold text-lg">Oops! No Details Found</p>;
  }
  const { product, packages } = resp.data as any;
  const rawProductImg: string | undefined = product?.variants?.[0]?.images?.[0]?.url;
  const productImg = rawProductImg && /^https?:\/\//i.test(rawProductImg)
    ? rawProductImg
    : rawProductImg
    ? await getSignedViewUrl(rawProductImg)
    : "https://placehold.co/400x300";

  // Pre-sign any package image URLs that are paths
  const lensPackages = await Promise.all((packages?.lensPackages || []).map(async (pkg: any) => {
    const raw = pkg?.images?.[0]?.url;
    const img = raw && /^https?:\/\//i.test(raw) ? raw : raw ? await getSignedViewUrl(raw) : "https://placehold.co/120x80";
    return { ...pkg, _signedImage: img };
  }));
  return (
    <div className="h-full w-full p-6">
      <AddToCartForm product={{ ...product, _signedImage: productImg }} packages={lensPackages} />
    </div>
  );
};
