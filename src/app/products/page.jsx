import ProductCard from "@/components/ProductCard";
import { mysql } from "@/libs/mysql";

async function loadProducts() {
  const products = await mysql.query("SELECT * FROM products");
  return products;
}

export default async function page() {
  const products = await loadProducts();
  console.log(products);

  return (
    <section className="grid gap-4 lg:grid-cols-4">
      {products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </section>
  );
}
