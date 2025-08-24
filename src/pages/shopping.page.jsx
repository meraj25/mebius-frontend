import { useState } from "react";
import { Popover,PopoverContent,PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { useGetAllProductsQuery } from "@/lib/api";
import SimpleProductCard from "@/components/SimpleProductCard";

function Shopping() {
  // Local state for filter inputs
  const [colorInput, setColorInput] = useState("");
  const [priceOrderInput, setPriceOrderInput] = useState("asc");

  // State for applied filters
  const [appliedColor, setAppliedColor] = useState("");
  const [appliedPriceOrder, setAppliedPriceOrder] = useState("asc");

  // Query uses applied filters
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useGetAllProductsQuery( {
 color: appliedColor,
 priceOrder: appliedPriceOrder,
 });

if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message || "Something went wrong"}</p>;
  }


  // Handler for Apply Filters button
  const handleApplyFilters = () => {
    setAppliedColor(colorInput);
    setAppliedPriceOrder(priceOrderInput);
  };

  return (
    <div>
      <h1>Shopping Page</h1>
      <Popover>
        <PopoverTrigger>Filter</PopoverTrigger>
        <PopoverContent>
          <div className="flex flex-col gap-4">
            {/* Color Input */}
            <label className="font-medium">
              Product Color:
              <input
                type="text"
                value={colorInput}
                onChange={(e) => setColorInput(e.target.value)}
                placeholder="Enter color"
                className="border rounded px-2 py-1 mt-1 w-full"
              />
            </label>
            {/* Price Order Select */}
            <label className="font-medium">
              Price Order:
              <select
                value={priceOrderInput}
                onChange={(e) => setPriceOrderInput(e.target.value)}
                className="border rounded px-2 py-1 mt-1 w-full"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </label>
            <Button onClick={handleApplyFilters}>Apply Filters</Button>
          </div>
        </PopoverContent>
      </Popover>

      <div>
        {products.map((product) => (
          <SimpleProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Shopping;

