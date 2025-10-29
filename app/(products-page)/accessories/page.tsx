import { getAllAccessories } from "@/actions/products";


export default async function Accessories() {

  const response = await getAllAccessories();

  if (!response.success){
    return <p>Error : failed to load the page</p>
  }
  const data = response.data.accessories
  return (
    <main className="min-h-screen">
        <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}



