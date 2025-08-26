import { useState } from "react";
import { useGetAllProductsQuery } from "@/lib/api";
import SimpleProductCard from "@/components/SimpleProductCard";
import { useGetAllColorsQuery } from "@/lib/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Shopping() {

const [ selectedColor, setSelectedColor ] = useState("");
 const [sortOrder, setSortOrder] = useState("");

  const {data : colors = []} = useGetAllColorsQuery();
  const {data : products = [],
    isLoading,
    isError,
    error
  } = useGetAllProductsQuery();
  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message || "Something went wrong"}</p>;
  }
  console.log(selectedColor);
  let filteredProducts = selectedColor
    ? products.filter((p) => p.color === selectedColor)
    : products;

     if (sortOrder === "asc") {
    filteredProducts = [...filteredProducts].sort((a, b) => a.price - b.price);
  } else if (sortOrder === "desc") {
    filteredProducts = [...filteredProducts].sort((a, b) => b.price - a.price);
  }

 
  return (
    <div>
      <div className="flex items-end gap-6 mb-6">
        <div>
          <h2>Filter By:</h2>
          <Select
            value={selectedColor}
            onValueChange={(value) => setSelectedColor(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a color" />
            </SelectTrigger>
            <SelectContent>
              {colors.map((color) => (
                <SelectItem key={color._id} value={color._id}>
                  {color.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <h2>Sort By Price:</h2>
          <Select
            value={sortOrder}
            onValueChange={(value) => setSortOrder(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Price: Low to High</SelectItem>
              <SelectItem value="desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <SimpleProductCard key={product._id} product={product} />
        ))}
      </div>


     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <SimpleProductCard key={product._id} product={product} />
      ))}
      </div>

    </div>
    
  );
}

export default Shopping;

