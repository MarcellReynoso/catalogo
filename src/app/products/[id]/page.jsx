import axios from "axios";
import Buttons from "./Buttons";

async function loadSingleProduct(productId) {
  const singleProduct = await axios.get(
    `${process.env.HOSTNAME}/api/products/${productId}`
  );
  return singleProduct;
}

async function page({ params }) {
  let productParams = await params;
  let productArray = await loadSingleProduct(productParams.id);
  let product = productArray.data[0];
  return (
    <section className="flex justify-center items-center h-[calc(100vh-10rem)] ">
      <div className="flex w-4/6 h-2/5 justify-center">
        <div className="p-6 bg-gray-50 rounded-lg">
          <h1 className="text-lg font-bold">{product.name}</h1>
          <h2 className="text-2xl text-slate-600">{product.price}</h2>
          <p>{product.description}</p>
          <Buttons productId={product.id} />
        </div>
        <img src={product.image} className="w-1/3" alt="Imagen" />
      </div>
    </section>
  );
}

export default page;

// TypeError: Cannot read properties of undefined (reading 'name')
//     at Object.loadSingleProduct (page.jsx:8:1)
