'use client';

import React, { useEffect, useState } from 'react';
import { Product, ProductSize } from '@/lib/types';
import { productAPI } from '@/lib/api/products';
import { useCartStore } from '@/lib/stores/cartStore';
import { useWishlistStore } from '@/lib/stores/wishlistStore';
import { formatPrice } from '@/lib/utils/formatters';
import { Heart, ShoppingCart, ChevronDown } from 'lucide-react';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState<ProductSize | null>(null);
  const [activeTab, setActiveTab] = useState('description');

  const { addItem } = useCartStore();
  const { isInWishlist, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await productAPI.getProductById(params.id);
        setProduct(data);
        if (data.sizes && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (error) {
        console.error('Failed to fetch product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600">Product not found</p>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    if (selectedSize) {
      addItem({
        id: `${product.id}-${selectedSize.id}`,
        product_id: product.id,
        name: product.name,
        image: product.image,
        size: selectedSize,
        quantity,
      });
      alert('Added to cart!');
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
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Product Image */}
          <div>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{product.name}</h1>
            
            {product.rating && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, i) => (
                      <span
                        key={i}
                        className={i < Math.floor(product.rating!) ? 'text-yellow-400' : 'text-gray-300'}
                      >
                        ★
                      </span>
                    ))}
                </div>
                <span className="text-gray-600">({product.rating} out of 5)</span>
              </div>
            )}

            <p className="text-gray-600 mb-6">{product.description}</p>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl font-bold text-gray-900">
                  {selectedSize ? formatPrice(selectedSize.price) : 'N/A'}
                </span>
                {selectedSize?.original_price && (
                  <span className="text-lg text-gray-500 line-through">
                    {formatPrice(selectedSize.original_price)}
                  </span>
                )}
              </div>
              {product.discount && (
                <p className="text-red-600 font-semibold mt-2">Save {product.discount}%</p>
              )}
            </div>

            {/* Size Selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-900 mb-3">
                  Select Size
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {product.sizes.map((size) => (
                    <button
                      key={size.id}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-4 rounded-lg border-2 transition ${
                        selectedSize?.id === size.id
                          ? 'border-green-600 bg-green-50 text-green-700 font-bold'
                          : 'border-gray-300 text-gray-700 hover:border-green-600'
                      }`}
                    >
                      {size.size}
                      <div className="text-xs mt-1">{formatPrice(size.price)}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  −
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-center"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition flex items-center justify-center gap-2 font-bold"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
              <button
                onClick={handleWishlistToggle}
                className={`px-6 py-3 rounded-lg border-2 transition flex items-center justify-center ${
                  inWishlist
                    ? 'border-red-600 bg-red-50 text-red-600'
                    : 'border-gray-300 text-gray-700 hover:border-red-600'
                }`}
              >
                <Heart className={`w-5 h-5 ${inWishlist ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Stock Status */}
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-700 font-semibold">✓ In Stock - Free Shipping on orders above ₹500</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b flex">
            {['description', 'reviews', 'shipping'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-semibold capitalize transition ${
                  activeTab === tab
                    ? 'text-green-600 border-b-2 border-green-600'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'description' && (
              <div>
                <h3 className="text-xl font-bold mb-4">Product Description</h3>
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
                <div className="mt-4 space-y-2 text-gray-700">
                  <p><strong>Origin:</strong> {product.origin || 'India'}</p>
                  <p><strong>Type:</strong> {product.category || 'Premium Tea'}</p>
                  <p><strong>Flavor Profile:</strong> {product.flavor_profile || 'Rich and aromatic'}</p>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-xl font-bold mb-4">Customer Reviews</h3>
                <p className="text-gray-600">No reviews yet. Be the first to review this product!</p>
              </div>
            )}

            {activeTab === 'shipping' && (
              <div>
                <h3 className="text-xl font-bold mb-4">Shipping Information</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Free shipping on orders above ₹500</li>
                  <li>• Standard delivery: 3-5 business days</li>
                  <li>• Express delivery available</li>
                  <li>• Cash on delivery available</li>
                  <li>• 100% authentic products</li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
