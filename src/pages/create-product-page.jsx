import CreateProductForm from "@/components/CreateProductForm";
import { useGetAllCategoriesQuery } from "@/lib/api";
function CreateProductPage() {

    const { data: categories } = useGetAllCategoriesQuery();

    console.log(categories);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <h2 className="text-4xl font-bold mb-8">Create Product</h2>
      <br />
      <br />
      <br />

      <CreateProductForm categories={categories} />
    </main>
  );
}

export default CreateProductPage;
