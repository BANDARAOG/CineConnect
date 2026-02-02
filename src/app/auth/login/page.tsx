'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Film, Mail, Lock } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Handle login logic here
    console.log('Login attempt:', { email, password });
    alert('Login feature coming soon!');
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="inline-flex items-center space-x-2 mb-6">
            <Film className="w-8 h-8 text-red-500" />
            <span className="text-2xl font-bold text-white">CineConnect LK</span>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-slate-300">Login to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-lg p-8">
          {/* Email Field */}
          <div className="mb-6">
            <label className="block text-white font-semibold mb-2">Email Address</label>
            <div className="flex items-center border border-slate-600 rounded-lg px-4 py-3 bg-slate-700">
              <Mail className="w-5 h-5 text-slate-400 mr-2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-white outline-none flex-1"
                placeholder="your@email.com"
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="mb-2">
            <label className="block text-white font-semibold mb-2">Password</label>
            <div className="flex items-center border border-slate-600 rounded-lg px-4 py-3 bg-slate-700">
              <Lock className="w-5 h-5 text-slate-400 mr-2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-transparent text-white outline-none flex-1"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {/* Forgot Password */}
          <div className="mb-6 text-right">
            <Link href="/auth/forgot-password" className="text-red-500 hover:text-red-400 text-sm">
              Forgot password?
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-bold py-3 rounded-lg transition"
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>

          {/* Google OAuth */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-600"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-slate-800 text-slate-400">Or continue with</span>
            </div>
          </div>

          <button
            type="button"
            className="w-full border border-slate-600 text-white py-3 rounded-lg hover:bg-slate-700 transition flex items-center justify-center"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                fill="white"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="white"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="white"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="white"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>

          {/* Register Link */}
          <p className="text-center text-slate-400 mt-8">
            Don't have an account?{' '}
            <Link href="/auth/register" className="text-red-500 hover:text-red-400 font-semibold">
              Register here
            </Link>
          </p>
        </form>

        {/* Footer */}
        <p className="text-center text-slate-500 text-sm mt-6">
          By logging in, you agree to our Terms & Conditions
        </p>
      </div>
    </div>
  );
}
