import { ProductForm } from "@/components/admin/product-form";
import { getAllCategoriesForForm } from "@/lib/actions/admin-products";

export const revalidate = 0;

export default async function NewProductPage() {
  const categories = await getAllCategoriesForForm();

  return (
    <div className=" max-w-4xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Add New Product
        </h1>
        <p className="mt-2 text-sm text-muted-foreground sm:text-base">
          Create a new product for your catalog
        </p>
      </div>

      <ProductForm categories={categories} mode="create" />
    </div>
  );
}
