'use client';

import React, { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { productAPI } from '@/lib/api/products';
import { Product } from '@/lib/types';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const data = await productAPI.getAllProducts(1, 6);
        setFeaturedProducts(data.products || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Premium Tea from the Mountains
          </h1>
          <p className="text-lg md:text-xl mb-8 text-green-100">
            Experience the finest quality tea sourced directly from Nilmount gardens
          </p>
          <div className="flex gap-4 justify-center">
            <a
              href="/products"
              className="px-8 py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-green-50 transition"
            >
              Shop Now
            </a>
            <a
              href="/about"
              className="px-8 py-3 border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-green-600 transition"
            >
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Featured Products
          </h2>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Nilmount Tea?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🌿</div>
              <h3 className="text-xl font-bold mb-2">100% Natural</h3>
              <p className="text-gray-600">
                No artificial additives or preservatives. Pure tea leaves from organic farms.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-bold mb-2">Free Shipping</h3>
              <p className="text-gray-600">
                Free delivery on orders above ₹500 across India within 3-5 business days.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-2">Premium Quality</h3>
              <p className="text-gray-600">
                Hand-selected from the finest tea gardens in Darjeeling and Assam.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Our Customers Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Rajesh Kumar',
                text: 'Best tea I\'ve ever had! The quality is exceptional.',
                rating: 5,
              },
              {
                name: 'Priya Singh',
                text: 'Fast delivery and excellent customer service. Highly recommended!',
                rating: 5,
              },
              {
                name: 'Amit Patel',
                text: 'Love the variety and freshness. Will definitely order again.',
                rating: 5,
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex gap-1 mb-3">
                  {Array(testimonial.rating)
                    .fill(0)
                    .map((_, i) => (
                      <span key={i} className="text-yellow-400">★</span>
                    ))}
                </div>
                <p className="text-gray-700 mb-4">{testimonial.text}</p>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-green-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Taste Excellence?</h2>
          <p className="text-lg mb-8">
            Explore our full collection and find your perfect cup of tea
          </p>
          <a
            href="/products"
            className="px-8 py-3 bg-white text-green-600 font-bold rounded-lg hover:bg-green-50 transition inline-block"
          >
            Browse All Products
          </a>
        </div>
      </section>
    </main>
  );
}
