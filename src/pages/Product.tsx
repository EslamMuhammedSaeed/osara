import ProductDetails from "@components/productComponents/ProductDetails";
import type { ProductData } from "@components/productComponents/types";
import { useParams } from "react-router-dom";
import { productData } from "@utils/consts";

function Product() {
  const { id } = useParams();
  const product = productData.find(
    (product) => product.id === parseInt(id as string)
  );
  return (
    <div className="bg-gray-50">
      <ProductDetails product={product as ProductData} />
    </div>
  );
}

export default Product;
