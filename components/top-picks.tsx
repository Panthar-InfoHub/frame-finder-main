import { topPicks } from "@/lib/data";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  weight: "400",
});

export function TopPicks() {
  return (
    <section className={`${lexendDeca.className} py-12 bg-gray-50`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl    text-gray-900 mb-6">
            TOP OUR PICKS
          </h2>
          <div className="flex justify-end items-center space-x-4 mb-8">
            <div className="flex justify-between items-cente">
              <div className="border border-[#00AA78] p-1.5 rounded-full mr-[430px]">
              <Button className="bg-[#00AA78] hover:bg-emerald-600 text-[16px] text-white px-12 py-6 mr-10 rounded-full">
                New Arrivals
              </Button>
              <Button
                variant="outline"
                className="px-12 py-6 border-none shadow-none rounded-full bg-transparent"
              >
                Best Seller
              </Button>
            </div>
            <div>
              <Button variant="link" className="text-emerald-500">
                See More
              </Button>
            </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topPicks.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
