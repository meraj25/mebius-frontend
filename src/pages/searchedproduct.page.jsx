import { useParams } from "react-router";
import { useGetProductsByIdQuery } from "@/lib/api";
import { Button } from "@/components/ui/button";



function SearchedProductPage() {

const {id : productId} = useParams();

const {
    data: product,
    isLoading,
    isError,
    error,
  } = useGetProductsByIdQuery(productId);

  if(isLoading){
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p>Error: {error?.message || "Something went wrong"}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    <div key={product._id}>
      <div className="h-64 sm:h-72 md:h-80 lg:h-96">
        <img
          src={product.image}
          alt={product.name}
          className="rounded-2xl w-full h-full object-cover"
        />
      </div>
      <div className="mt-2">
        <span className="text-lg sm:text-xl md:text-2xl block">
          {product.name}
        </span>
        <span className="text-base sm:text-lg md:text-xl block">
          ${product.price}
        </span>
      </div>
      <div>
        <Button
          className={"w-full mt-2"}
          onClick={() =>
            dispatch(
              addToCart({
                _id: product._id,
                name: product.name,
                price: product.price,
                image: product.image,
              })
            )
          }
        >
          Add To Cart
        </Button>
      </div>
    </div>
    </div>
  );

}
  
  export default SearchedProductPage;