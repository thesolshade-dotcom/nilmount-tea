'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/lib/stores/cartStore';
import { ShoppingCart, Menu, X, LogOut } from 'lucide-react';
import { useAuthStore } from '@/lib/stores/authStore';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCartStore();
  const { user, logout } = useAuthStore();
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🍵</span>
            </div>
            <span className="font-bold text-xl text-gray-800 hidden sm:inline">Nilmount Tea</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-gray-700 hover:text-green-600 transition">
              Home
            </Link>
            <Link href="/products" className="text-gray-700 hover:text-green-600 transition">
              Products
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-green-600 transition">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-green-600 transition">
              Contact
            </Link>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link href="/cart" className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-green-600 transition" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>

            {/* Auth Links */}
            {user ? (
              <div className="hidden md:flex items-center gap-2">
                <span className="text-sm text-gray-700">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="text-gray-700 hover:text-red-600 transition"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="hidden md:flex gap-2">
                <Link href="/login" className="px-3 py-2 text-gray-700 hover:text-green-600">
                  Login
                </Link>
                <Link href="/register" className="px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-gray-700"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t">
            <Link href="/" className="block py-2 text-gray-700 hover:text-green-600">
              Home
            </Link>
            <Link href="/products" className="block py-2 text-gray-700 hover:text-green-600">
              Products
            </Link>
            <Link href="/about" className="block py-2 text-gray-700 hover:text-green-600">
              About
            </Link>
            <Link href="/contact" className="block py-2 text-gray-700 hover:text-green-600">
              Contact
            </Link>
            <hr className="my-2" />
            {user ? (
              <>
                <div className="py-2 text-gray-700">{user.name}</div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left py-2 text-red-600 hover:text-red-700"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="block py-2 text-gray-700">
                  Login
                </Link>
                <Link href="/register" className="block py-2 text-gray-700">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};
