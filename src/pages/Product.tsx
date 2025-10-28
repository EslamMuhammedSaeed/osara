import { useAppDispatch, useAppSelector } from "@/store/hooks";
import ProductDetails from "@components/productComponents/ProductDetails";
import ProductDetailsSkeleton from "@components/skeletons/ProductDetailsSkeleton";
import type { ProductData } from "@components/productComponents/types";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
// import { productData } from "@utils/consts";
import { fetchProducts } from "@/store/slices/productsSlice";

function Product() {
  const { products, loading } = useAppSelector((state) => state.products);

  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("products", products);
    if (products.length === 0) {
      dispatch(fetchProducts({ page: 1, limit: 10 }));
    }
  }, [dispatch, products]);

  const { id } = useParams();
  const product = products.find(
    (product) => product.id === parseInt(id as string)
  );
  const relatedProducts = products.filter(
    (product) => product.id !== parseInt(id as string)
  );

  // Show skeleton while loading or if product not found yet
  if (loading || !product) {
    return <ProductDetailsSkeleton />;
  }

  return (
    <div className="bg-gray-50">
      <ProductDetails
        relatedProducts={relatedProducts}
        product={product as ProductData}
      />
    </div>
  );
}

export default Product;
