import { useState } from "react";
import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/lib/api";
import SimpleProductCard from "@/components/SimpleProductCard";
import { useGetAllColorsQuery } from "@/lib/api";

function Shopping() {

const { selectedColor, setSelectedColor } = useState("Color");
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

  const filteredProducts = selectedColor
    ? products.filter((p) => p.color === selectedColor)
    : products;

  const onClick = () => {
    return(
        <div>{filteredProducts.map((product) => (
        <SimpleProductCard key={product._id} product={product} />
      ))}</div>
    )
  };

  return (
    <div>
      <h2>Filter By: </h2>
      <div>
      <Select>
        value={selectedColor}
        onValueChange={(value) => setSelectedColor(value)}
        <SelectTrigger>
          <SelectValue placeholder="Select a color" />
        </SelectTrigger>
        <SelectContent>
          {colors.map((color) => (
            <SelectItem key={color.id} value={color.id}>
              {color.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      </div>

      <div><Button onClick={onClick}>Apply</Button></div>

  

    </div>


    

    
  );
}

export default Shopping;

