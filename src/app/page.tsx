/**
 * Copyright (c) 2025 Universal Insights. All rights reserved.
 * Licensed under the MIT License.
 */

'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { ToolCard } from '@/components/ToolCard';
import { motion } from 'framer-motion';
import { FiArrowRight, FiZap, FiShield, FiGlobe } from 'react-icons/fi';
import Link from 'next/link';

// Mock data - will be replaced with API call
const featuredTools = [
  {
    id: '1',
    name: 'Prompt Writer',
    slug: 'prompt-writer',
    description: 'Generate and optimize AI prompts with templates and best practices',
    category: 'Writing',
    isFeatured: true,
  },
  {
    id: '2',
    name: 'Image Upscaler',
    slug: 'image-upscaler',
    description: 'Upscale and enhance your images with AI-powered technology',
    category: 'AI Image',
    isFeatured: true,
  },
  {
    id: '3',
    name: 'Text to Speech',
    slug: 'text-to-speech',
    description: 'Convert text to natural-sounding speech with multiple voices',
    category: 'TTS',
    isFeatured: true,
  },
  {
    id: '4',
    name: 'Thumbnail Maker',
    slug: 'thumbnail-maker',
    description: 'Create stunning thumbnails for YouTube, social media, and more',
    category: 'Design',
    isFeatured: true,
  },
  {
    id: '5',
    name: 'Video Captioner',
    slug: 'video-captioner',
    description: 'Add captions and subtitles to your videos automatically',
    category: 'AI Video',
    isFeatured: false,
  },
  {
    id: '6',
    name: 'AI Tool Library',
    slug: 'ai-tool-library',
    description: 'Browse and access hundreds of AI tools in one place',
    category: 'Tools',
    isFeatured: true,
  },
];

const features = [
  {
    icon: FiZap,
    title: 'One-Click Access',
    description: 'Sign in once with Google and access all tools instantly',
  },
  {
    icon: FiShield,
    title: 'Secure & Private',
    description: 'Your data is encrypted and never shared with third parties',
  },
  {
    icon: FiGlobe,
    title: 'Always Free',
    description: 'Core features are completely free, no hidden charges',
  },
];

export default function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 overflow-x-hidden">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center"
              >
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  All AI Tools in One Place
                </h1>
                <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                  Use top AI tools inside one site. Sign in with Google once — no extra accounts needed.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/auth/signin"
                    className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center gap-2"
                  >
                    Get Started Free
                    <FiArrowRight />
                  </Link>
                  <Link
                    href="#tools"
                    className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
                  >
                    Explore Tools
                  </Link>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Features Section */}
          <section className="py-16 px-4 bg-white dark:bg-gray-800">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-3 gap-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="text-center p-6"
                    >
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                        <Icon className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* Featured Tools Section */}
          <section id="tools" className="py-16 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Featured Tools
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400">
                    Start using these popular AI tools right now
                  </p>
                </div>
                <Link
                  href="/tools"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  View All →
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredTools.map((tool, index) => (
                  <ToolCard key={tool.id} tool={tool} index={index} />
                ))}
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-xl mb-8 text-blue-100">
                Join thousands of users already using Universal Insights Tools
              </p>
              <Link
                href="/auth/signin"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Sign In with Google
                <FiArrowRight />
              </Link>
            </div>
          </section>

          {/* Footer */}
          <footer className="bg-gray-900 text-gray-400 py-12 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid md:grid-cols-4 gap-8 mb-8">
                <div>
                  <h3 className="text-white font-semibold mb-4">Universal Insights Tools</h3>
                  <p className="text-sm">
                    All AI tools in one place. Simple, secure, and always free.
                  </p>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Product</h4>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/tools" className="hover:text-white">All Tools</Link></li>
                    <li><Link href="/pricing" className="hover:text-white">Pricing</Link></li>
                    <li><Link href="/about" className="hover:text-white">About</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Legal</h4>
                  <ul className="space-y-2 text-sm">
                    <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                    <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-4">Contact</h4>
                  <p className="text-sm">
                    <a href="mailto:contact@universalinsights.tools" className="hover:text-white">
                      contact@universalinsights.tools
                    </a>
                  </p>
                </div>
              </div>
              <div className="border-t border-gray-800 pt-8 text-center text-sm">
                <p>© 2025 Universal Insights. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
