import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-purple-400 px-6 py-4 flex justify-between items-center shadow-lg">
      <div className="text-2xl font-bold text-purple-500">E-Shop</div>
      <ul className="flex space-x-6">
        <li>
          <Link href="/" className="hover:text-purple-300 transition">Home</Link>
        </li>
        <li>
          <Link href="/products" className="hover:text-purple-300 transition">Products</Link>
        </li>
        <li>
          <Link href="/cart" className="hover:text-purple-300 transition">Cart</Link>
        </li>
        <li>
          <Link href="/about" className="hover:text-purple-300 transition">About</Link>
        </li>
      </ul>
    </nav>
  );
}
