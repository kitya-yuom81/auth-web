import React from "react";
import CardProduct from "../../components/card/card-product";
import { useGetProductsQuery } from "../../features/product/productSlice2";

export default function Product() {
  const { data, isLoading, isError } = useGetProductsQuery();

  return (
    <main className="max-w-screen-xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold text-gray-900">🛍️ Explore Our Products</h1>
        <span className="text-sm text-gray-500">
          Total: {data?.length || 0} items
        </span>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {/* Error */}
      {isError && (
        <div className="text-center py-20">
          <p className="text-xl text-red-600 font-medium">❌ Could not fetch products. Please try again.</p>
        </div>
      )}

      {/* Product Grid */}
      {!isLoading && !isError && data?.length > 0 && (
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {data.map((p) => (
            <CardProduct
              key={p.id}
              id={p.id}
              thumbnail={p.images?.[0]}
              title={p.title}
              price={p.price}
              category={p.category?.name}
              images={p.images}
            />
          ))}
        </section>
      )}

      {/* Empty state */}
      {!isLoading && !isError && data?.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">No products found.</p>
        </div>
      )}
    </main>
  );
}