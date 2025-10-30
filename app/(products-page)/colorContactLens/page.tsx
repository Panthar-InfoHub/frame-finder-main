import { getAllColorContactLens } from "@/actions/products";

export default async function ColorContactLens() {

  const response = await getAllColorContactLens();

  if (!response.success){
    return <p>Error : failed to load the page</p>
  }
  console.log(response.data);
  return (
    <main className="min-h-screen">
        <pre>{JSON.stringify(response, null, 2)}</pre>
    </main>
  )
}