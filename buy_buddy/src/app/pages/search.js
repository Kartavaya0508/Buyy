import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown } from "lucide-react";
import ProductCard from '@/components/ProductCard';

const products = [
  { id: 1, name: "HP Omen G6 6GB RAM 526GM ROM", price: 20000, rating: 4.5, image: "/placeholder.svg" },
  { id: 2, name: "HP Omen G6 8GB RAM 1TB ROM", price: 22000, rating: 4.7, image: "/placeholder.svg" },
  { id: 3, name: "HP Omen G6 16GB RAM 1TB ROM", price: 25000, rating: 4.8, image: "/placeholder.svg" },
  { id: 4, name: "HP Omen G7 8GB RAM 526GM ROM", price: 23000, rating: 4.6, image: "/placeholder.svg" },
  { id: 5, name: "HP Omen G7 16GB RAM 1TB ROM", price: 27000, rating: 4.9, image: "/placeholder.svg" },
  { id: 6, name: "HP Pavilion 8GB RAM 526GM ROM", price: 18000, rating: 4.3, image: "/placeholder.svg" },
  { id: 7, name: "HP Pavilion 16GB RAM 1TB ROM", price: 21000, rating: 4.5, image: "/placeholder.svg" },
  { id: 8, name: "HP Envy 8GB RAM 526GM ROM", price: 19000, rating: 4.4, image: "/placeholder.svg" },
  { id: 9, name: "HP Envy 16GB RAM 1TB ROM", price: 24000, rating: 4.7, image: "/placeholder.svg" },
  { id: 10, name: "HP Spectre 16GB RAM 1TB ROM", price: 28000, rating: 4.9, image: "/placeholder.svg" },
];

export default function SearchResults() {
  const router = useRouter();
  const { q } = router.query;
  const [searchQuery, setSearchQuery] = useState(q || '');
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (q) {
      const filtered = products.filter(product =>
        product.name.toLowerCase().includes(q.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [q]);

  const handleSearch = (e) => {
    e.preventDefault();
    router.push(`/search?q=${searchQuery}`);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <form onSubmit={handleSearch} className="relative">
            <Input 
              className="w-full pl-10 pr-10 py-2 rounded-full bg-gray-100" 
              placeholder="Search for your Product"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Button type="submit" variant="ghost" className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Search className="h-5 w-5 text-gray-400" />
            </Button>
          </form>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Top Results</h1>
          <div className="flex items-center">
            <span className="mr-2">SORT</span>
            <Button variant="outline" size="sm">
              Lowest to Highest <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map(product => (
            <Link key={product.id} href={`/product/${product.id}`}>
              <a>
                <ProductCard product={product} />
              </a>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
