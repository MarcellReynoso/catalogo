import Link from "next/link";
import React from "react";

function ProductCard({product}) {
  return (
    <Link
      className="bg-gray-50 hover:bg-gray-100 hover:cursor-pointer rounded-lg border-gray-800 mb-3 p-4"
      href={`/products/${product.id}`}
    >
      <h1 className="text-lg font-bold">{product.name}</h1>
      <h2 className="text-2xl text-slate-600">{product.price}</h2>
      <p>{product.description}</p>
    </Link>
  );
}

export default ProductCard;
