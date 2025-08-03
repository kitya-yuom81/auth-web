import React, { useState, useEffect } from "react";

export default function CreateProduct() {
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    categoryId: "",
    image: ""
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = "your_token_here"; 

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("https://api.escuelajs.co/api/v1/categories");
        const data = await res.json();
        setCategories(data.slice(0, 5)); 
      } catch (err) {
        console.error("❌ Failed to load categories", err);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage("");

    try {
      const res = await fetch("https://api.escuelajs.co/api/v1/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          title: formData.title,
          price: Number(formData.price),
          description: formData.description,
          categoryId: Number(formData.categoryId),
          images: [formData.image]
        })
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "❌ Failed to create product.");

      setMessage("✅ Product created successfully!");
      setFormData({ title: "", price: "", description: "", categoryId: "", image: "" });
    } catch (err) {
      setMessage(`❌ ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">🛠️ Create New Product</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-2xl shadow-lg border"
      >
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Title</label>
          <input
            type="text"
            name="title"
            placeholder="e.g., Samsung Galaxy S22"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Price ($)</label>
          <input
            type="number"
            name="price"
            placeholder="e.g., 499"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Description</label>
          <textarea
            name="description"
            rows={4}
            placeholder="Write product description..."
            className="w-full border border-gray-300 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        {/* Category Dropdown */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Category</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">-- Select a Category --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-semibold mb-1 text-gray-700">Image URL</label>
          <input
            type="text"
            name="image"
            placeholder="https://example.com/image.jpg"
            className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={formData.image}
            onChange={handleChange}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-blue-600 text-white text-center font-semibold py-3 rounded-lg transition duration-200 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:bg-blue-700"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Create Product"}
        </button>

        {/* Message */}
        {message && (
          <p
            className={`text-center text-sm font-medium ${
              message.includes("✅") ? "text-green-600" : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </main>
  );
}
