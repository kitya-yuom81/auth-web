import React from "react";
import { useParams, Link } from "react-router";
import { useGetProductByIdQuery } from "../../features/product/productSlice2";

export default function ProductDetail() {
  const { id } = useParams();
  const { data, isLoading, isError, error } = useGetProductByIdQuery(id);

  console.log("Product ID:", id);
  console.log("Fetched data:", data);
  console.log("Error info:", error);

  // ✅ Loading spinner
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  // ✅ Error message
  if (isError || !data) {
    return (
      <div className="text-center mt-10">
        <p className="text-red-600 font-semibold text-lg">
          ❌ Failed to load product.
        </p>
        {error?.status && <p className="text-sm text-gray-400">Status: {error.status}</p>}
      </div>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-12">
      {/* Back link */}
      <div className="mb-8">
        <Link
          to="/products"
          className="inline-block px-4 py-2 bg-blue-100 text-blue-700 font-medium rounded hover:bg-blue-200 transition"
        >
          ← Back to Products
        </Link>
      </div>

      {/* Product detail card */}
      <div className="flex flex-col md:flex-row gap-10 bg-white shadow-md rounded-lg p-6">
        {/* Product Image */}
        <div className="w-full md:w-1/2">
          <img
            src={data.images?.[0] || "https://placehold.co/400x400?text=No+Image"}
            alt={data.title}
            className="w-full h-auto max-h-[500px] object-contain rounded-lg border"
          />
        </div>

        {/* Product Info */}
        <div className="w-full md:w-1/2 space-y-5">
          <h1 className="text-3xl font-bold text-gray-800">{data.title}</h1>
          <p className="text-gray-600 text-base">{data.description}</p>

          <p className="text-2xl text-green-600 font-semibold">${data.price}</p>

          <p className="text-sm text-gray-500">
            Category: <span className="capitalize">{data.category?.name || "Unknown"}</span>
          </p>

          <button className="mt-4 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </main>
  );
}
