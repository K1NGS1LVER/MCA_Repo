import Navbar from '../../components/Navbar';
import Image from 'next/image';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-950 text-purple-200">
      <Navbar />
      <main className="max-w-2xl mx-auto py-12">
        <h2 className="text-3xl font-bold mb-8 text-purple-400">About E-Shop</h2>
        <Image src="/next.svg" alt="About" width={80} height={80} className="mb-4" />
        <p className="text-lg text-purple-300 mb-2">E-Shop is your trusted online store for quality products and a seamless shopping experience. We love dark themes and purple vibes!</p>
      </main>
    </div>
  );
}
