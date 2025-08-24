import SimpleProductCard from "@/components/SimpleProductCard";
import { useGetAllProductsQuery, useGetAllCategoriesQuery } from "@/lib/api";
import { useParams } from "react-router";

function ShopPage() {
  const { category: categorySlug } = useParams(); 

  const { data: categories = [] } = useGetAllCategoriesQuery();

  
  const selectedCategory = categories.find((c) => c.slug === categorySlug);
  console.log(selectedCategory);
  const categoryId = selectedCategory?._id; 

  console.log(categoryId);

  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useGetAllProductsQuery(categoryId);

  console.log(products);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error?.message || "Something went wrong"}</p>;
  }

  return (
    <main>
      <h1 className="text-2xl font-bold text-center mt-8 mb-4">{selectedCategory?.name || categorySlug}</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <SimpleProductCard key={product._id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </main>
  );
}

export default ShopPage;
