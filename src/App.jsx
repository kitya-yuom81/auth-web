import "./App.css";

import { Link } from "react-router";

function App() {
  return (
    <>
      
      <main className="max-w-screen-xl mx-auto px-4 py-20">
        <div className="flex flex-col-reverse md:flex-row items-center gap-12">
          {/* Text section */}
          <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Welcome to <span className="text-blue-600">QuickShop</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Discover quality products at great prices. Browse our latest collection and enjoy smooth shopping.
            </p>
            <Link
              to="/products"
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
            >
              🛍️ Shop Now
            </Link>
          </div>

          {/* Image section */}
          <div className="w-full md:w-1/2">
            <img
              src="https://img.freepik.com/free-vector/ecommerce-concept-illustration_114360-832.jpg?w=826"
              alt="Shop illustration"
              className="w-full max-w-md mx-auto md:mx-0"
            />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
