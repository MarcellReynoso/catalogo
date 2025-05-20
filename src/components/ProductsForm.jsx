"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

function ProductsForm() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    description: "",
  });

  const [file, setFile] = useState(null);
  const form = useRef(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    if (params.id) {
      axios.get("/api/products/" + params.id).then((res) => {
        console.log(res.data[0]);
        setProduct({
          name: res.data[0].name,
          price: res.data[0].price,
          description: res.data[0].description,
        });
      });
    }
  }, []);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(product);

    if (!params.id) {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("price", product.price);
      formData.append("description", product.description);

      if (file) {
        formData.append("image", file);
      }

      const res = await axios.post("/api/products", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(res);
      form.current.reset();
    } else {
      const res = await axios.put("/api/products/" + params.id, product);
      console.log(res);
      console.log("Editandingggg");
    }
    router.refresh();
    router.push("/products");
  };

  return (
    <div className="flex">
      <form
        className="bg-gray-300 shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
        ref={form}
      >
        <label htmlFor="name" className="block text-gray-700 text-md font-bold">
          Nombre
        </label>
        <input
          name="name"
          type="text"
          placeholder="Nombre del producto ... "
          autoComplete="off"
          autoFocus
          className="shadow bg-white appearance-none border rounded w-full py-2 px-3 mb-3"
          onChange={handleChange}
          value={product.name}
        />

        <label
          htmlFor="price"
          className="block text-gray-700 text-md font-bold"
        >
          Precio
        </label>
        <input
          name="price"
          type="number"
          placeholder="S/. 0.00"
          autoComplete="off"
          className="shadow bg-white appearance-none border rounded w-full py-2 px-3 mb-3"
          onChange={handleChange}
          value={product.price}
        />

        <label
          htmlFor="description"
          className="block text-gray-700 text-md font-bold mb-2"
        >
          Descripción
        </label>
        <textarea
          name="description"
          type="text"
          placeholder="Ingrese la descripción ... "
          className="shadow bg-white appearance-none border rounded w-full py-2 px-3 mb-1"
          rows={3}
          onChange={handleChange}
          value={product.description}
        />

        <label
          htmlFor="image"
          className="block text-gray-700 text-md font-bold mb-2"
        >
          Imagen del producto
        </label>
        <input
          name="image"
          type="file"
          className="block mb-3"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {/* <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 mb-3">
          <div className="text-center items-center">
            <div className="w-full flex justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-8 text-gray-500"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                />
              </svg>
            </div>
          </div>
        </div> */}

        {file && (
          <img
            src={URL.createObjectURL(file)}
            alt="Nueva imagen"
            className="w-full h-40 object-contain mx-auto my-3"
          />
        )}

        <button
          className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-lg"
          type="submit"
        >
          {params.id ? "Editar producto" : "Crear producto"}
        </button>
      </form>
    </div>
  );
}

export default ProductsForm;
