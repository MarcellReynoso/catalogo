import CreateProduct from "@/components/CreateProduct";
import ProductCard from "@/components/ProductCard";
import { mysql } from "@/libs/mysql";

async function loadProducts() {
  const products = await mysql.query("SELECT * FROM products");
  return products;
}

export default async function page() {
  const products = await loadProducts();
  return (
    <section className="">
      <div className="grid gap-4 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <div className="flex mt-4">
        <CreateProduct />
      </div>
    </section>
  );
}
