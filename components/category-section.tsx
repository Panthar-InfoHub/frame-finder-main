import Image from "next/image";
import { Lexend_Deca } from "next/font/google";

const lexendDeca = Lexend_Deca({
  subsets: ["latin"],
  weight: "400",
});

interface CategorySectionProps {
  title: string;
  categories: Array<{
    name: string;
    image: string;
  }>;
  showSeeMore?: boolean;
}

export function CategorySection({
  title,
  categories,
  showSeeMore = false,
}: CategorySectionProps) {
  return (
    <section className={` ${lexendDeca.className} py-12`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-end">
          <div className="flex justify-between w-210 items-center mb-8">
            <h2 className={` text-2xl md:text-3xl text-gray-900`}>{title}</h2>
            {showSeeMore && (
              <button className="text-emerald-500 hover:text-emerald-600 font-medium">
                See More
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="text-center">
              <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-3 bg-gray-100 rounded-full flex items-center justify-center overflow-hidden">
                <Image
                  src={category.image || "/placeholder.svg"}
                  alt={category.name}
                  width={80}
                  height={80}
                  className="object-cover h-full w-full"
                />
              </div>
              <p className="text-sm text-[#7D7D7D] font-medium">
                {category.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
