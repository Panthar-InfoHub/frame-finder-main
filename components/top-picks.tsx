import { topPicks } from "@/lib/data";
import { ProductCard } from "./product-card";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Lexend_Deca } from "next/font/google";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  weight: "400",
});

export function TopPicks() {
  return (
    <section className={`${lexendDeca.className} py-12 bg-gray-50`}>
      <div className="container mx-auto px-4">
        <Tabs defaultValue="new-arrival">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl    text-gray-900 mb-6">
              TOP OUR PICKS
            </h2>

            <div className="w-full mb-8">
              <div className="grid grid-cols-[1fr_auto_auto] items-center gap-4">
                <div className="justify-self-center p-0.5 rounded-full border border-[#00AA78]">
                  <TabsList className="rounded-full bg-transparent p-1 gap-3">
                    <TabsTrigger
                      value="new-arrival"
                      className="rounded-full px-12 py-3 text-[16px] font-medium
                              bg-white text-foreground shadow-sm
                              data-[state=active]:bg-[#00AA78] data-[state=active]:text-white data-[state=active]:shadow-none
                              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00AA78]/40
                              transition-colors"
                    >
                      <p>NewArrivals</p>
                    </TabsTrigger>
                    <TabsTrigger
                      value="best-seller"
                      className=" rounded-full px-12 py-3 text-[16px] font-medium
                                bg-white text-foreground shadow-sm
                                data-[state=active]:bg-[#00AA78] data-[state=active]:text-white data-[state=active]:shadow-none
                                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00AA78]/40
                                transition-colors"
                    >
                      <p>Best Seller</p>
                    </TabsTrigger>
                  </TabsList>
                </div>
                <div>
                  <Button variant="link" className="text-emerald-500 justify-self-start">
                    See More
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <TabsContent value="new-arrival">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topPicks.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="best-seller">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {topPicks.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
