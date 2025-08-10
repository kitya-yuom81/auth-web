import React, { useState } from "react";

export default function DeleteProduct() {
  const [productId, setProductId] = useState("");
  const [message, setMessage] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!productId) {
      setMessage("Please enter a product ID.");
      return;
    }

    setIsDeleting(true);
    setMessage("");

    try {
      const response = await fetch(`https://api.escuelajs.co/api/v1/products/${productId}`, {
        method: "DELETE"
      });

      if (!response.ok) {
        throw new Error("Failed to delete product");
      }

      const data = await response.json();
      setMessage(`✅ Product ID ${data.id} deleted successfully.`);
    } catch (error) {
      setMessage(`❌ Error: ${error.message}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded shadow">
      <h1 className="text-2xl font-bold mb-4">🗑️ Delete Product</h1>

      <label htmlFor="productId" className="block mb-2 font-medium">Product ID</label>
      <input
        type="number"
        id="productId"
        className="w-full border p-2 rounded mb-4"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        placeholder="Enter product ID to delete"
      />

      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        {isDeleting ? "Deleting..." : "Delete Product"}
      </button>

      {message && (
        <p className="mt-4 text-sm font-semibold">{message}</p>
      )}
    </div>
  );
}
