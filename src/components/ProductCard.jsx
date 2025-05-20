import Link from "next/link";
import React from "react";

function ProductCard({ product }) {
  return (
    <Link
      className="bg-gray-50 hover:bg-gray-100 hover:cursor-pointer rounded-lg border-gray-800 mb-3"
      href={`/products/${product.id}`}
    >
      {product.image && (
        <img src={product.image} alt={product.name} className="w-full h-70  rounded-t-lg" />
      )}
      <div className="p-4">
        <h1 className="text-lg font-bold">{product.name}</h1>
        <h2 className="text-2xl text-slate-600">{product.price}</h2>
        <p>{product.description}</p>
      </div>
    </Link>
  );
}

export default ProductCard;
