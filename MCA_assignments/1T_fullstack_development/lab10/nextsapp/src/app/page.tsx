import Navbar from "../components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-950 text-purple-200">
      <Navbar />
      <main className="flex flex-col items-center justify-center py-16">
        <h1 className="text-4xl font-bold mb-6 text-purple-400">
          Welcome to E-Shop
        </h1>
        <Image
          src="/globe.svg"
          alt="Ecommerce"
          width={120}
          height={120}
          className="mb-6"
        />
        <div className="flex gap-6 mb-8 flex-wrap justify-center">
          <Image
            src="https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80"
            alt="Shopping Bags"
            width={180}
            height={120}
            className="rounded-lg shadow-lg object-cover"
          />
          <Image
            src="https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=400&q=80"
            alt="Online Shopping"
            width={180}
            height={120}
            className="rounded-lg shadow-lg object-cover"
          />
          <Image
            src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80"
            alt="Ecommerce Products"
            width={180}
            height={120}
            className="rounded-lg shadow-lg object-cover"
          />
        </div>
        <p className="text-lg max-w-xl text-center mb-8">
          Your one-stop shop for the best products. Explore our collection and
          enjoy a seamless shopping experience!
        </p>
        <a
          href="/products"
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded shadow transition"
        >
          Shop Now
        </a>
      </main>
    </div>
  );
}
