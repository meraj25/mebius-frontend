import SimpleProductCard from "@/components/SimpleProductCard";
import { useGetAllProductsQuery, useGetAllCategoriesQuery } from "@/lib/api";
import { useParams } from "react-router";

function ShopPage() {
  const { category: categorySlug } = useParams(); // now this is the slug from URL

  const { data: categories = [] } = useGetAllCategoriesQuery();

  // find category by slug instead of name
  const selectedCategory = categories.find((c) => c.slug === categorySlug);
  console.log(selectedCategory);
  const categoryId = selectedCategory?._id; // use _id if that's what MongoDB returns

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
      <h1>Shop Page</h1>
      <p>Category: {selectedCategory?.name || categorySlug}</p>
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
