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
