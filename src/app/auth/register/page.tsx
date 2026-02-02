'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Film, Mail, Lock, User, Building2, Phone } from 'lucide-react';

export default function Register() {
  const [userType, setUserType] = useState<'sponsor' | 'filmmaker' | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    companyName: '',
    businessRegNo: '',
    phone: '',
    industryCategory: '',
    nicNumber: '',
    studentId: '',
    filmmakerRole: 'director',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    console.log('Registration data:', { userType, ...formData });
    alert('Registration feature coming soon!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <Link href="/" className="flex items-center space-x-2">
            <Film className="w-8 h-8 text-red-500" />
            <span className="text-2xl font-bold text-white">CineConnect LK</span>
          </Link>
          <p className="text-slate-300">
            Already have an account?{' '}
            <Link href="/auth/login" className="text-red-500 hover:text-red-400">
              Login
            </Link>
          </p>
        </div>

        {/* User Type Selection */}
        {!userType ? (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold text-white mb-4">Join CineConnect</h1>
              <p className="text-xl text-slate-300">
                Choose your role to get started
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Filmmaker Card */}
              <div
                onClick={() => setUserType('filmmaker')}
                className="bg-slate-800 border-2 border-slate-700 rounded-lg p-8 cursor-pointer hover:border-red-500 transition transform hover:scale-105"
              >
                <Film className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white text-center mb-4">
                  🎬 Filmmaker
                </h2>
                <p className="text-slate-300 text-center mb-6">
                  Director, Producer, Student, or Indie Creator
                </p>
                <ul className="text-slate-400 space-y-2 mb-6">
                  <li>✓ Create film projects</li>
                  <li>✓ Define sponsorship needs</li>
                  <li>✓ Receive sponsorship offers</li>
                  <li>✓ Track funding progress</li>
                </ul>
                <button className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg transition">
                  Continue as Filmmaker
                </button>
              </div>

              {/* Sponsor Card */}
              <div
                onClick={() => setUserType('sponsor')}
                className="bg-slate-800 border-2 border-slate-700 rounded-lg p-8 cursor-pointer hover:border-red-500 transition transform hover:scale-105"
              >
                <Building2 className="w-16 h-16 text-blue-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-white text-center mb-4">
                  🏢 Sponsor
                </h2>
                <p className="text-slate-300 text-center mb-6">
                  Company, Brand, or Investor
                </p>
                <ul className="text-slate-400 space-y-2 mb-6">
                  <li>✓ Browse film projects</li>
                  <li>✓ Choose sponsorship levels</li>
                  <li>✓ Track ROI & exposure</li>
                  <li>✓ Connect with filmmakers</li>
                </ul>
                <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition">
                  Continue as Sponsor
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Registration Form
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-white mb-2">
                {userType === 'filmmaker' ? '🎬 Filmmaker Registration' : '🏢 Sponsor Registration'}
              </h1>
              <p className="text-slate-300">
                <button
                  onClick={() => setUserType(null)}
                  className="text-red-500 hover:text-red-400"
                >
                  Change role
                </button>
              </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-slate-800 border border-slate-700 rounded-lg p-8">
              {/* Email & Password */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Email Address *</label>
                  <div className="flex items-center border border-slate-600 rounded-lg px-4 py-3 bg-slate-700">
                    <Mail className="w-5 h-5 text-slate-400 mr-2" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-transparent text-white outline-none flex-1"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Phone Number *</label>
                  <div className="flex items-center border border-slate-600 rounded-lg px-4 py-3 bg-slate-700">
                    <Phone className="w-5 h-5 text-slate-400 mr-2" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-transparent text-white outline-none flex-1"
                      placeholder="+94 XX XXX XXXX"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Password Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-white font-semibold mb-2">Password *</label>
                  <div className="flex items-center border border-slate-600 rounded-lg px-4 py-3 bg-slate-700">
                    <Lock className="w-5 h-5 text-slate-400 mr-2" />
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="bg-transparent text-white outline-none flex-1"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-semibold mb-2">Confirm Password *</label>
                  <div className="flex items-center border border-slate-600 rounded-lg px-4 py-3 bg-slate-700">
                    <Lock className="w-5 h-5 text-slate-400 mr-2" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="bg-transparent text-white outline-none flex-1"
                      placeholder="••••••••"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Filmmaker Specific Fields */}
              {userType === 'filmmaker' && (
                <>
                  <div className="mb-6">
                    <label className="block text-white font-semibold mb-2">Full Name *</label>
                    <div className="flex items-center border border-slate-600 rounded-lg px-4 py-3 bg-slate-700">
                      <User className="w-5 h-5 text-slate-400 mr-2" />
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className="bg-transparent text-white outline-none flex-1"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">Role *</label>
                      <select
                        name="filmmakerRole"
                        value={formData.filmmakerRole}
                        onChange={handleChange}
                        className="w-full border border-slate-600 rounded-lg px-4 py-3 bg-slate-700 text-white outline-none"
                      >
                        <option value="director">Director</option>
                        <option value="producer">Producer</option>
                        <option value="student">Student</option>
                        <option value="independent">Independent Creator</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">NIC Number (Optional)</label>
                      <input
                        type="text"
                        name="nicNumber"
                        value={formData.nicNumber}
                        onChange={handleChange}
                        className="w-full border border-slate-600 rounded-lg px-4 py-3 bg-slate-700 text-white outline-none"
                        placeholder="XXXXXX-XXXXXXX-X"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-white font-semibold mb-2">Portfolio Links (Optional)</label>
                    <p className="text-slate-400 text-sm mb-2">Paste links to your works (YouTube, Vimeo, etc) - one per line</p>
                    <textarea
                      className="w-full border border-slate-600 rounded-lg px-4 py-3 bg-slate-700 text-white outline-none"
                      rows={3}
                      placeholder="https://youtube.com/your-work&#10;https://vimeo.com/your-work"
                    />
                  </div>
                </>
              )}

              {/* Sponsor Specific Fields */}
              {userType === 'sponsor' && (
                <>
                  <div className="mb-6">
                    <label className="block text-white font-semibold mb-2">Company Name *</label>
                    <div className="flex items-center border border-slate-600 rounded-lg px-4 py-3 bg-slate-700">
                      <Building2 className="w-5 h-5 text-slate-400 mr-2" />
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="bg-transparent text-white outline-none flex-1"
                        placeholder="Company Name"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-white font-semibold mb-2">Business Registration No. (Optional)</label>
                      <input
                        type="text"
                        name="businessRegNo"
                        value={formData.businessRegNo}
                        onChange={handleChange}
                        className="w-full border border-slate-600 rounded-lg px-4 py-3 bg-slate-700 text-white outline-none"
                        placeholder="REG-XXXXXXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-semibold mb-2">Industry Category *</label>
                      <select
                        name="industryCategory"
                        value={formData.industryCategory}
                        onChange={handleChange}
                        className="w-full border border-slate-600 rounded-lg px-4 py-3 bg-slate-700 text-white outline-none"
                        required
                      >
                        <option value="">Select Industry</option>
                        <option value="fmcg">FMCG</option>
                        <option value="telecom">Telecom</option>
                        <option value="banking">Banking</option>
                        <option value="technology">Technology</option>
                        <option value="automotive">Automotive</option>
                        <option value="fashion">Fashion</option>
                        <option value="entertainment">Entertainment</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                </>
              )}

              {/* Terms & Conditions */}
              <div className="mb-8">
                <label className="flex items-center text-slate-300">
                  <input type="checkbox" className="w-4 h-4 mr-3" required />
                  I agree to the Terms & Conditions and Privacy Policy
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className={`w-full font-bold py-3 rounded-lg transition ${
                  userType === 'filmmaker'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                Create {userType === 'filmmaker' ? 'Filmmaker' : 'Sponsor'} Account
              </button>

              <p className="text-center text-slate-400 mt-6">
                Already registered?{' '}
                <Link href="/auth/login" className="text-red-500 hover:text-red-400 font-semibold">
                  Login here
                </Link>
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
