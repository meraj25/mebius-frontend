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
  const filteredProducts = selectedColor
    ? products.filter((p) => p.color === selectedColor)
    : products;

 
  return (
    <div>
      <h2>Filter By: </h2>
   
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



     <div>{filteredProducts.map((product) => (
        <SimpleProductCard key={product._id} product={product} />
      ))}
      </div>

    </div>
    
  );
}

export default Shopping;

