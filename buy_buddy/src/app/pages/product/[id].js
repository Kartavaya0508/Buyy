import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Image, Star } from "lucide-react";

const products = [
  { id: 1, name: "HP Omen G6 6GB RAM 526GM ROM", price: 20000, rating: 4.5, image: "/placeholder.svg", specs: { RAM: '6GB', ROM: '526GB' } },
  // Add other products similarly...
];

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query;
  const product = products.find(p => p.id === parseInt(id));

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-bold">{product.name}</h1>
      <div className="mt-4 flex items-center">
        <Image src={product.image} alt={product.name} className="w-48 h-48 object-cover" />
        <div className="ml-4">
          <p className="text-xl font-semibold">${product.price}</p>
          <p className="text-sm text-gray-600 flex items-center">
            <Star className="h-4 w-4 text-yellow-500" />
            {product.rating}
          </p>
        </div>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold">Specifications</h2>
        <ul>
          {Object.entries(product.specs).map(([key, value]) => (
            <li key={key} className="flex justify-between py-1">
              <span className="font-medium">{key}:</span>
              <span>{value}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex gap-2">
        <Button variant="outline">Watch Review</Button>
        <Button variant="primary">Buy Now</Button>
        <Button variant="ghost">Visit Website</Button>
      </div>
    </div>
  );
}
