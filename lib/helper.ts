"use server"
import { getSignedViewUrl } from "@/actions/cloud-storage";
import { auth } from "@/lib/auth";

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

export const checkIfSameUser = async (loggedID  : string) => {
  const session = await auth();
  const userid = session.user.id;
  
  if(!userid) return false;
  return loggedID === userid;
}