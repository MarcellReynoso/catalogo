"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

function ProductsForm() {
  const [product, setProduct] = useState({
    name: "",
    price: 0,
    description: "",
  });

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
      const res = await axios.post("/api/products", product);
      console.log(res);
      form.current.reset();
    } else {
      const res = await axios.put("/api/products/" + params.id, product)
      console.log(res);
      console.log('Editandingggg');
    }
    router.refresh();
    router.push("/products");
  };

  return (
    <form
      className="bg-gray-300 shadow-md rounded-md px-8 pt-6 pb-8 mb-4"
      onSubmit={handleSubmit}
      ref={form}
    >
      <label
        htmlFor="name"
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Nombre
      </label>
      <input
        name="name"
        type="text"
        placeholder="name"
        autoComplete="off"
        autoFocus
        className="shadow bg-white appearance-none border rounded w-full py-2 px-3 mb-3"
        onChange={handleChange}
        value={product.name}
      />

      <label
        htmlFor="price"
        className="block text-gray-700 text-sm font-bold mb-2"
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
        className="block text-gray-700 text-sm font-bold mb-2"
      >
        Descripción
      </label>
      <textarea
        name="description"
        type="text"
        placeholder="Ingrese la descripción ... "
        className="shadow bg-white appearance-none border rounded w-full py-2 px-3 mb-3"
        rows={3}
        onChange={handleChange}
        value={product.description}
      />

      <button
        className="bg-blue-500 hover:bg-blue-700 hover:cursor-pointer text-white font-bold py-2 px-4 rounded-lg"
        type="submit"
      >
        {params.id ? "Editar producto" : "Crear producto"}
      </button>
    </form>
  );
}

export default ProductsForm;
