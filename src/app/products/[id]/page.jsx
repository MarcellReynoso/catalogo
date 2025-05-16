import axios from "axios";

async function loadSingleProduct(productId) {
  const singleProduct = await axios.get(
    "http://localhost:3000/api/products/" + productId
  );
  return singleProduct;
}

async function page({ params }) {
  let productParams = await params;
  let singleProduct = await loadSingleProduct(productParams.id);
  return (
    <section className="flex justify-center items-center ">
      <div className="p-6 bg-gray-50 rounded-lg">
        <h1 className="text-lg font-bold">{singleProduct.data[0].name}</h1>
        <h2 className="text-2xl text-slate-600">
          {singleProduct.data[0].price}
        </h2>
        <p>{singleProduct.data[0].description}</p>
        <div className="flex gap-x-2 mt-4">
          <button
            className="
        bg-yellow-500 text-white
        hover:bg-yellow-700 hover:font-semibold hover:cursor-pointer
        py-3 px-3 rounded-lg"
          >
            Edit
          </button>
          <button
            className="
        bg-red-500 text-white 
        hover:bg-red-700 hover:font-semibold hover:cursor-pointer
        py-3 px-3 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </section>
  );
}

export default page;
