'use client';

import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Product, ProductSize } from '@/lib/types';
import { useCartStore } from '@/lib/stores/cartStore';
import { useWishlistStore } from '@/lib/stores/wishlistStore';
import { formatPrice } from '@/lib/utils/formatters';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCartStore();
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();
  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (product.sizes && product.sizes.length > 0) {
      addItem({
        id: `${product.id}-${product.sizes[0].id}`,
        product_id: product.id,
        name: product.name,
        image: product.image,
        size: product.sizes[0],
        quantity: 1,
      });
    }
  };

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist({
        id: `wishlist-${product.id}`,
        product_id: product.id,
        name: product.name,
        image: product.image,
        added_at: new Date(),
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-64 overflow-hidden bg-gray-100">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover hover:scale-110 transition duration-300"
          />
          {product.discount && (
            <div className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
              -{product.discount}%
            </div>
          )}
        </div>
      </Link>

      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold text-gray-800 hover:text-green-600 transition">
            {product.name}
          </h3>
        </Link>
        <p className="text-sm text-gray-600 mt-1">{product.description}</p>

        <div className="flex items-center justify-between mt-3">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.sizes?.[0]?.price || 0)}
            </span>
            {product.sizes?.[0]?.original_price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.sizes[0].original_price)}
              </span>
            )}
          </div>
        </div>

        {product.rating && (
          <div className="flex items-center gap-1 mt-2">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600">{product.rating}</span>
          </div>
        )}

        <div className="flex gap-2 mt-4">
          <button
            onClick={handleAddToCart}
            className="flex-1 bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition flex items-center justify-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
          <button
            onClick={handleWishlistToggle}
            className={`px-3 py-2 rounded-md transition ${
              inWishlist
                ? 'bg-red-100 text-red-600'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <Heart className={`w-4 h-4 ${inWishlist ? 'fill-current' : ''}`} />
          </button>
        </div>
      </div>
    </div>
  );
};
