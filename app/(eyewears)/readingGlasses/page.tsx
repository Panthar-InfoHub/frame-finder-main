import { getAllReader } from "@/actions/products";

export default async function Accessories() {

  const response = await getAllReader();

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