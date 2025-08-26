import Navbar from '../../components/Navbar';
import Image from 'next/image';

const products = [
  { id: 1, name: 'Purple Hoodie', price: '$49', image: '/vercel.svg' },
  { id: 2, name: 'Dark Grey Sneakers', price: '$89', image: '/next.svg' },
  { id: 3, name: 'E-Shop Mug', price: '$19', image: '/window.svg' },
];

export default function Products() {
  return (
    <div className="min-h-screen bg-gray-950 text-purple-200">
      <Navbar />
      <main className="max-w-4xl mx-auto py-12">
        <h2 className="text-3xl font-bold mb-8 text-purple-400">Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="bg-gray-900 rounded-lg shadow-lg p-6 flex flex-col items-center">
              <Image src={product.image} alt={product.name} width={80} height={80} className="mb-4" />
              <h3 className="text-xl font-semibold text-purple-300 mb-2">{product.name}</h3>
              <span className="text-lg text-purple-500 mb-2">{product.price}</span>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded transition">Add to Cart</button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
