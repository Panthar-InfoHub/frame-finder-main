import { getAllFrames } from "@/actions/products";

export default async function Frames() {

  const response = await getAllFrames();

  if (!response.success){
    return <p>Error : failed to load the page</p>
  }
  console.log(response.data);

  const data = response.data.products
  return (
    <main className="min-h-screen">
       <pre>{JSON.stringify(response, null, 2)}</pre>
    </main>
  )
}