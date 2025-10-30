import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/products-page/product-card";
import { FilterSidebar } from "@/components/products-page/filter-sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { SlidersHorizontal } from "lucide-react";
import { categories } from "@/lib/data";
import { getAllContactLens } from "@/actions/products";

export default async function AllContactlens() {

  const response = await getAllContactLens();

  if (!response.success){
    return <p>Error : failed to load the page</p>
  }
  const data = response.data;

  const FilterContent = () => <FilterSidebar />;


  return (
    <main className="min-h-screen"> 
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </main>
  )
}