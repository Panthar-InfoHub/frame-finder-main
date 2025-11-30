import { Button } from "../ui/button";

export function CategoryTab({ categories }) {
    return (
        <div className="flex flex-wrap gap-2 mb-6">
              <Button variant="default" className="rounded-full">All</Button>
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="rounded-full bg-transparent"
                >
                  {category.label}
                </Button>
              ))}
            </div>
    )
}