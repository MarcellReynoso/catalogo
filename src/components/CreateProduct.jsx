"use client";

import { useRouter } from "next/navigation";

function CreateProduct() {
  const route = useRouter();
  return (
    <button
      onClick={() => {
        route.push("/new");
      }}
      className="text-white bg-green-700 
        hover:bg-green-800 hover:cursor-pointer
        focus:outline-none focus:ring-4 focus:ring-green-300 
        font-medium rounded-full 
        text-base px-5 py-2.5 text-center me-2 mb-2 
        dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
    >
      Crear
    </button>
  );
}

export default CreateProduct;
