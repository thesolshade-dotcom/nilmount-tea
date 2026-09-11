'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">🍵</span>
              </div>
              <h3 className="text-white font-bold text-lg">Nilmount Tea</h3>
            </div>
            <p className="text-sm text-gray-400">
              Premium quality tea sourced directly from the finest gardens across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-green-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-green-400 transition">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-green-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-green-400 transition">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shipping" className="hover:text-green-400 transition">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="hover:text-green-400 transition">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-green-400 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-green-400 transition">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-green-400" />
                <a href="tel:+919876543210" className="hover:text-green-400 transition">
                  +91 98765 43210
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-green-400" />
                <a href="mailto:support@nilmounttea.com" className="hover:text-green-400 transition">
                  support@nilmounttea.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-green-400 mt-1" />
                <span>Darjeeling, West Bengal, India</span>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        {/* Social Links */}
        <div className="flex justify-center gap-6 mb-8">
          <a href="#" className="hover:text-green-400 transition">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-green-400 transition">
            <Instagram className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-green-400 transition">
            <Twitter className="w-5 h-5" />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Nilmount Tea. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
