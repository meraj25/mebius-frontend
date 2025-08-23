
import { useGetAllCategoriesQuery, useGetAllProductsQuery } from "@/lib/api";
import { useParams } from "react-router";
import ProductSearchForm from "@/components/ProductSearchForm";

function ShopPage() {
  const {data: categories} = useGetAllCategoriesQuery();

  console.log(categories);

  return (
    <main className="px-4 lg:px-16 min-h-screen py-8">
      <h2 className="text-4xl font-bold">Shop</h2>
      <div className="mt-4"></div>
    </main>
  );
}

export default ShopPage;



//68a8b3413582d04f8ab34549







/*import SimpleProductCard from "@/components/SimpleProductCard";
;
import { useGetProductsByCategoryQuery } from "@/lib/api";
import { useGetAllCategoriesQuery } from "@/lib/api";
import { useParams } from "react-router";


function ShopPage() {


  const { category } = useParams();

  const { data: categories = [] } = useGetAllCategoriesQuery();

  const selectedCategory = categories.find((c) => c.name === category);
  const categoryId = selectedCategory?.id;

  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetProductsByCategoryQuery(categoryId, { skip: !categoryId });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  //console.log(products);
  

  return (
    <main>
      <h1>Shop Page</h1>
       <p>{category}</p> 
      <div>{isLoading ? "Loading" : "Done"}</div>
      <div>{error}</div>
      <div>
        {products.map((product) => (
          <SimpleProductCard key={product.id} product={product} />
        ))}
      </div>
      <div>{JSON.stringify(products)}</div>
    </main>
  );
}

export default ShopPage;*/
