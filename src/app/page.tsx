'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-linear-to-b from-black via-red-950 to-black text-white">
      {/* Navigation */}
      <nav className="border-b border-red-700/30 bg-black/50 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-transparent bg-clip-text bg-linear-to-r from-red-600 from-red-600">
            🎬 CineConnect
          </div>
          <div className="hidden md:flex gap-8">
            <a href="#how-it-works" className="hover:text-red-500 transition">
              How It Works
            </a>
            <a href="#benefits" className="hover:text-red-500 transition">
              Benefits
            </a>
          </div>
          <div className="flex gap-4">
            <Link
              href="/auth/login"
              className="px-6 py-2 border border-red-600 rounded-lg hover:bg-red-600/10 transition"
            >
              Login
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              ☰
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-black/80 border-b border-red-700/30 px-4 py-4 flex flex-col gap-4">
          <a href="#how-it-works" className="hover:text-red-500 transition">
            How It Works
          </a>
          <a href="#benefits" className="hover:text-red-500 transition">
            Benefits
          </a>
        </div>
      )}

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Connect Filmmakers with
          <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 via-red-500 via-red-500">
            {' '}Sponsorship Opportunities
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          The premier platform connecting Sri Lankan filmmakers with brands ready to invest in compelling stories
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/register?role=filmmaker"
            className="px-8 py-4 bg-linear-to-r from-red-600 to-red-700 rounded-lg font-bold hover:shadow-lg hover:shadow-red-600/50 transition"
          >
            Register as Filmmaker
          </Link>
          <Link
            href="/auth/register?role=sponsor"
            className="px-8 py-4 border-2 border-red-600 rounded-lg font-bold hover:bg-red-600/10 transition"
          >
            Register as Sponsor
          </Link>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="bg-red-950/30 border border-red-700/50 rounded-lg p-6 text-center">
          <div className="text-4xl font-bold text-red-500 mb-2">50+</div>
          <div className="text-gray-300">Active Projects</div>
        </div>
        <div className="bg-red-950/30 border border-red-700/50 rounded-lg p-6 text-center">
          <div className="text-4xl font-bold text-yellow-500 mb-2">200+</div>
          <div className="text-gray-300">Filmmakers</div>
        </div>
        <div className="bg-red-950/30 border border-red-700/50 rounded-lg p-6 text-center">
          <div className="text-4xl font-bold text-red-500 mb-2">100+</div>
          <div className="text-gray-300">Sponsors</div>
        </div>
        <div className="bg-red-950/30 border border-red-700/50 rounded-lg p-6 text-center">
          <div className="text-4xl font-bold text-yellow-500 mb-2">$500K+</div>
          <div className="text-gray-300">Funded</div>
        </div>
      </section>

      {/* Why Sponsor Films Section */}
      <section id="benefits" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">
          Why Sponsor Films?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-red-950/20 border border-red-700/30 rounded-lg p-8">
            <div className="text-4xl mb-4">🎯</div>
            <h3 className="text-2xl font-bold mb-3">Brand Visibility</h3>
            <p className="text-gray-300">
              Reach millions of viewers and build brand awareness through authentic storytelling and creative content partnerships.
            </p>
          </div>
          <div className="bg-red-950/20 border border-red-700/30 rounded-lg p-8">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-2xl font-bold mb-3">Innovation & Creativity</h3>
            <p className="text-gray-300">
              Be part of groundbreaking filmmaking projects that push creative boundaries and tell impactful stories.
            </p>
          </div>
          <div className="bg-red-950/20 border border-red-700/30 rounded-lg p-8">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-2xl font-bold mb-3">ROI & Analytics</h3>
            <p className="text-gray-300">
              Track your investment with detailed analytics, audience insights, and measurable brand impact metrics.
            </p>
          </div>
          <div className="bg-red-950/20 border border-red-700/30 rounded-lg p-8">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="text-2xl font-bold mb-3">Community Impact</h3>
            <p className="text-gray-300">
              Support local Sri Lankan talent and contribute to the growth of the creative industry while building your brand legacy.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <h2 className="text-4xl font-bold text-center mb-16">
          How It Works
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-linear-to-r from-red-600 to-red-700 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              1
            </div>
            <h3 className="text-xl font-bold mb-2">Sign Up</h3>
            <p className="text-gray-400">
              Create an account as filmmaker or sponsor
            </p>
          </div>
          <div className="text-center">
            <div className="bg-linear-to-r from-red-600 to-red-700 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              2
            </div>
            <h3 className="text-xl font-bold mb-2">Explore</h3>
            <p className="text-gray-400">
              Browse projects or sponsorship opportunities
            </p>
          </div>
          <div className="text-center">
            <div className="bg-linear-to-r from-red-600 to-red-700 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              3
            </div>
            <h3 className="text-xl font-bold mb-2">Connect</h3>
            <p className="text-gray-400">
              Apply or sponsor projects that match your interests
            </p>
          </div>
          <div className="text-center">
            <div className="bg-linear-to-r from-red-600 to-red-700 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4 text-xl font-bold">
              4
            </div>
            <h3 className="text-xl font-bold mb-2">Grow</h3>
            <p className="text-gray-400">
              Track progress and measure success together
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center bg-linear-to-r from-red-950/40 to-red-900/40 rounded-2xl border border-red-700/30">
        <h2 className="text-4xl font-bold mb-6">
          Ready to Create Your Film Legacy?
        </h2>
        <p className="text-xl text-gray-300 mb-8">
          Join the thriving community of Sri Lankan filmmakers and sponsors
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/auth/register?role=filmmaker"
            className="px-8 py-4 bg-linear-to-r from-red-600 to-red-700 rounded-lg font-bold hover:shadow-lg hover:shadow-red-600/50 transition"
          >
            Get Started Now
          </Link>
          <Link
            href="/auth/login"
            className="px-8 py-4 border-2 border-red-600 rounded-lg font-bold hover:bg-red-600/10 transition"
          >
            Already a Member?
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-red-700/30 bg-black/50 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-xl font-bold text-transparent bg-clip-text bg-linear-to-r from-red-600 from-red-600 mb-4">
                🎬 CineConnect
              </div>
              <p className="text-gray-400">Connecting Sri Lankan filmmakers with sponsorship opportunities</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-red-500 transition">Browse Projects</a></li>
                <li><a href="#" className="hover:text-red-500 transition">For Sponsors</a></li>
                <li><a href="#" className="hover:text-red-500 transition">For Filmmakers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-red-500 transition">About</a></li>
                <li><a href="#" className="hover:text-red-500 transition">Contact</a></li>
                <li><a href="#" className="hover:text-red-500 transition">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-red-500 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-red-500 transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-red-700/30 pt-8 text-center text-gray-400">
            <p>&copy; 2026 CineConnect. All rights reserved. | Sri Lanka</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
