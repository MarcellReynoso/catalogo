"use client";

import axios from "axios";
import { useRouter } from "next/navigation";

function Buttons({ productId }) {
  const router = useRouter();
  return (
    <div className="flex gap-x-2 mt-4">
      <button
        className="
            bg-yellow-500 text-white
            hover:bg-yellow-700 hover:font-semibold hover:cursor-pointer
            py-3 px-3 rounded-lg"
        onClick={() => {
          router.push("/products/edit/" + productId);
        }}
      >
        Edit
      </button>
      <button
        className="
          bg-red-500 text-white 
          hover:bg-red-700 hover:font-semibold hover:cursor-pointer
            py-3 px-3 rounded-lg"
        onClick={async () => {
          if (confirm("¿Estás segura que quieres borrar el producto?")) {
            const res = await axios.delete("/api/products/" + productId);
            console.log(`Borrando producto: ${productId}`);
            if (res.status === 204) {
              router.push("/products");
              router.refresh();
            }
          }
        }}
      >
        Delete
      </button>
    </div>
  );
}

export default Buttons;
