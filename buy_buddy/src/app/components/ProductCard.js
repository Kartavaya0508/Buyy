import Image from 'next/image';
import { Star } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="bg-white p-4 border rounded-lg shadow-sm">
      <Image src={product.image} alt={product.name} width={200} height={150} />
      <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
      <p className="text-sm text-gray-600">${product.price}</p>
      <p className="text-sm text-gray-600 flex items-center">
        <Star className="h-4 w-4 text-yellow-500" />
        {product.rating}
      </p>
    </div>
  );
}
