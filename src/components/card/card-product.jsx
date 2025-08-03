import React from "react";
import { Link } from "react-router";

export default function CardProduct({ id, thumbnail, title, price, category, images }) {
  // Fake rating just for display
  const fakeRating = (Math.random() * 2 + 3).toFixed(1); // 3.0 to 5.0
  const imageCount = images?.length || 0;

  return (
    <Link
      to={`/products/${id}`}
      className="overflow-hidden rounded-xl bg-white text-slate-700 shadow-md shadow-slate-200 hover:shadow-lg transition duration-200"
    >
      {/* Image */}
      <figure>
        <img
          src={thumbnail || "https://placehold.co/300x200?text=No+Image"}
          alt={title}
          className="aspect-video w-full object-cover h-[280px]"
        />
      </figure>

      {/* Body */}
      <div className="p-4 space-y-2">
        <h3 className="text-lg font-semibold truncate">{title}</h3>

        {/* Category Tag */}
        <p className="inline-block bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded">
          📦 {category}
        </p>

        {/* Price */}
        <p className="text-base font-bold text-green-600">${price}</p>

        {/* Visual Enhancer Row */}
        <div className="flex justify-between text-sm text-gray-500">
          {/* Fake rating for UI */}
          <span>⭐ {fakeRating}</span>

          {/* Show number of images */}
          <span>📷 {imageCount} image{imageCount > 1 ? "s" : ""}</span>
        </div>
      </div>
    </Link>
  );
}
