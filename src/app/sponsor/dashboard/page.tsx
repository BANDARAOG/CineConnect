'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Film, Bell, Settings, LogOut, BarChart3, FileText, MessageSquare } from 'lucide-react';

export default function SponsorDashboard() {
  const [activeTab, setActiveTab] = useState('projects');

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Navigation Bar */}
      <nav className="border-b border-slate-700 bg-slate-900/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Film className="w-8 h-8 text-red-500" />
              <span className="text-2xl font-bold text-white">CineConnect LK</span>
            </div>
            <div className="flex items-center space-x-6">
              <button className="relative">
                <Bell className="w-6 h-6 text-slate-300 hover:text-white transition" />
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-red-500 rounded-full text-xs text-white flex items-center justify-center">
                  3
                </span>
              </button>
              <button className="w-10 h-10 bg-blue-600 rounded-full text-white font-bold">
                S
              </button>
              <Link href="/" className="text-slate-300 hover:text-white transition">
                <LogOut className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Welcome, TechCorp Inc.</h1>
          <p className="text-slate-300">Manage your film sponsorships and track ROI</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="text-slate-400 text-sm mb-2">Active Sponsorships</div>
            <div className="text-4xl font-bold text-white">8</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="text-slate-400 text-sm mb-2">Total Invested</div>
            <div className="text-4xl font-bold text-red-500">₨ 12.5M</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="text-slate-400 text-sm mb-2">Brand Reach</div>
            <div className="text-4xl font-bold text-blue-400">45.2K</div>
          </div>
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <div className="text-slate-400 text-sm mb-2">Engagement Rate</div>
            <div className="text-4xl font-bold text-green-400">8.3%</div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-slate-800 border border-slate-700 rounded-lg">
          <div className="flex border-b border-slate-700">
            <button
              onClick={() => setActiveTab('projects')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'projects'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Available Projects
            </button>
            <button
              onClick={() => setActiveTab('active')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'active'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              My Sponsorships
            </button>
            <button
              onClick={() => setActiveTab('messages')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'messages'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Messages
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`flex-1 px-6 py-4 font-semibold transition ${
                activeTab === 'analytics'
                  ? 'text-red-500 border-b-2 border-red-500'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Analytics
            </button>
          </div>

          <div className="p-8">
            {/* Available Projects Tab */}
            {activeTab === 'projects' && (
              <div className="space-y-6">
                {/* Project Card */}
                {[
                  {
                    title: 'The Last Kingdom',
                    genre: 'Drama',
                    budget: '₨50M',
                    needed: '₨15M',
                    director: 'Ravi Kumara',
                  },
                  {
                    title: 'Urban Dreams',
                    genre: 'Action',
                    budget: '₨80M',
                    needed: '₨30M',
                    director: 'Priya Sharma',
                  },
                ].map((project, idx) => (
                  <div key={idx} className="border border-slate-700 rounded-lg p-6 hover:border-red-500 transition">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white mb-2">{project.title}</h3>
                        <p className="text-slate-400">by {project.director}</p>
                      </div>
                      <span className="px-4 py-2 bg-red-600/20 text-red-400 rounded-full text-sm font-semibold">
                        {project.genre}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div>
                        <p className="text-slate-400 text-sm">Total Budget</p>
                        <p className="text-xl font-bold text-white">{project.budget}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Sponsorship Needed</p>
                        <p className="text-xl font-bold text-red-500">{project.needed}</p>
                      </div>
                      <div>
                        <p className="text-slate-400 text-sm">Funding Progress</p>
                        <p className="text-xl font-bold text-blue-400">65%</p>
                      </div>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-6">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: '65%' }}></div>
                    </div>
                    <div className="flex space-x-4">
                      <button className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition">
                        View Details
                      </button>
                      <button className="flex-1 px-4 py-2 border border-red-600 text-red-400 hover:bg-red-600/20 font-semibold rounded-lg transition">
                        Contact Director
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* My Sponsorships Tab */}
            {activeTab === 'active' && (
              <div className="space-y-6">
                {[
                  {
                    title: 'Midnight Echoes',
                    status: 'In Production',
                    amount: '₨2M',
                    level: 'Gold',
                    progress: 75,
                  },
                  {
                    title: 'Coastal Winds',
                    status: 'Completed',
                    amount: '₨1.5M',
                    level: 'Silver',
                    progress: 100,
                  },
                ].map((sponsor, idx) => (
                  <div key={idx} className="border border-slate-700 rounded-lg p-6">
                    <div className="flex justify-between items-center mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-white">{sponsor.title}</h3>
                        <p className="text-slate-400">{sponsor.level} Sponsorship</p>
                      </div>
                      <span
                        className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          sponsor.status === 'In Production'
                            ? 'bg-blue-600/20 text-blue-400'
                            : 'bg-green-600/20 text-green-400'
                        }`}
                      >
                        {sponsor.status}
                      </span>
                    </div>
                    <p className="text-xl font-bold text-red-500 mb-4">{sponsor.amount}</p>
                    <div className="w-full bg-slate-700 rounded-full h-2 mb-4">
                      <div
                        className="bg-red-600 h-2 rounded-full transition-all"
                        style={{ width: `${sponsor.progress}%` }}
                      ></div>
                    </div>
                    <div className="flex space-x-4">
                      <button className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition">
                        View Project
                      </button>
                      <button className="flex-1 px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold rounded-lg transition">
                        Download Agreement
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div>
                <div className="text-center py-12">
                  <MessageSquare className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Your Messages</h3>
                  <p className="text-slate-400 mb-6">You have 5 unread messages</p>
                  <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition">
                    Open Inbox
                  </button>
                </div>
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <div>
                <div className="text-center py-12">
                  <BarChart3 className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">Analytics Dashboard</h3>
                  <p className="text-slate-400 mb-6">
                    Track your brand exposure and ROI metrics
                  </p>
                  <button className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition">
                    View Full Analytics
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
