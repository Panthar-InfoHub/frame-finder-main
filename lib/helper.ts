import { getSignedViewUrl } from "@/actions/cloud-storage";

export async function getImageUrl(url: string): Promise<string> {
  if (!url) return "/placeholder.png";

  // Check if it's already a complete URL
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  // Otherwise, get signed URL from cloud storage
  return await getSignedViewUrl(url);
}

export async function getImageUrls(urls: string[]): Promise<string[]> {
  if (!urls || urls.length === 0) return ["/placeholder.png"];

  return await Promise.all(urls.map((url) => getImageUrl(url)));
}

export const transformImages = async (products: any[]) => {
  return await Promise.all(products.map(async (product: any) => {
    const rawUrl: string | undefined = product?.variants?.[0]?.images?.[0]?.url
    const isHttp = rawUrl && /^https?:\/\//i.test(rawUrl)
    const signedUrl = rawUrl ? (isHttp ? rawUrl : await getSignedViewUrl(rawUrl)) : ""
    return { ...product, _image: signedUrl }
  }))
}

export const transformReviewImages = async (reviewResponse: any) => {
  let all_reviews = [...reviewResponse.data.user_reviews, ...reviewResponse.data.reviews]
  all_reviews = await Promise.all(
    all_reviews?.map(async (review: any) => {
      const imageUrls = await getImageUrls(review.images.map((i) => i.url));
      return { ...review, _images: imageUrls };
    })
  )
  return all_reviews;
}

export const getProductUrlType = (product_type: string): string => {
  switch (product_type.toLowerCase()) {
    case "product":
      return "frames";
    case "sunglass":
      return "sunglasses";
    case "reader":
      return "readingGlasses";
    case "contactlens":
      return "contactLens";
    case "colorcontactlens":
      return "colorContactLens";
    case "accessories":
      return "accessories";
    case "lenssolution":
      return "contactLensSolution";
    default:
      return "frames";
  }
}