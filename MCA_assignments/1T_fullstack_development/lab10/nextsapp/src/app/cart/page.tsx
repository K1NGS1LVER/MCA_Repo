import Navbar from '../../components/Navbar';
import Image from 'next/image';

export default function Cart() {
  return (
    <div className="min-h-screen bg-gray-950 text-purple-200">
      <Navbar />
      <main className="max-w-2xl mx-auto py-12">
        <h2 className="text-3xl font-bold mb-8 text-purple-400">Your Cart</h2>
        <div className="bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col items-center">
          <Image src="/file.svg" alt="Cart" width={80} height={80} className="mb-4" />
          <p className="text-lg text-purple-300 mb-2">Your cart is empty.</p>
          <a href="/products" className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition">Browse Products</a>
        </div>
      </main>
    </div>
  );
}
