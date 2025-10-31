/**
 * Copyright (c) 2025 Universal Insights. All rights reserved.
 * Licensed under the MIT License.
 */

'use client';

import { useState } from 'react';
import { FiSearch, FiExternalLink, FiStar } from 'react-icons/fi';

const externalTools = [
  {
    name: 'ChatGPT',
    category: 'AI Chat',
    description: 'Advanced AI chatbot for conversations and tasks',
    url: 'https://chat.openai.com',
    featured: true,
  },
  {
    name: 'Midjourney',
    category: 'AI Image',
    description: 'Create stunning AI-generated artwork',
    url: 'https://www.midjourney.com',
    featured: true,
  },
  {
    name: 'Canva',
    category: 'Design',
    description: 'Design graphics, presentations, and more',
    url: 'https://www.canva.com',
    featured: true,
  },
  {
    name: 'ElevenLabs',
    category: 'TTS',
    description: 'AI voice generation and cloning',
    url: 'https://elevenlabs.io',
    featured: true,
  },
  {
    name: 'Runway',
    category: 'AI Video',
    description: 'AI-powered video editing and generation',
    url: 'https://runwayml.com',
    featured: true,
  },
  {
    name: 'Perplexity',
    category: 'AI Search',
    description: 'AI-powered search engine',
    url: 'https://www.perplexity.ai',
    featured: false,
  },
  {
    name: 'Claude',
    category: 'AI Chat',
    description: 'Anthropic\'s AI assistant',
    url: 'https://claude.ai',
    featured: true,
  },
  {
    name: 'Gemini',
    category: 'AI Chat',
    description: 'Google\'s multimodal AI',
    url: 'https://gemini.google.com',
    featured: true,
  },
  {
    name: 'Suno AI',
    category: 'Music',
    description: 'Generate music with AI',
    url: 'https://suno.ai',
    featured: false,
  },
  {
    name: 'HeyGen',
    category: 'AI Avatar',
    description: 'Create AI avatar videos',
    url: 'https://www.heygen.com',
    featured: false,
  },
];

export function ToolLibrary() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', ...Array.from(new Set(externalTools.map((t) => t.category)))];

  const filteredTools = externalTools.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
          Browse AI Tools
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Discover and access hundreds of AI tools from across the web
        </p>

        {/* Search */}
        <div className="relative mb-4">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search tools..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Tools Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool) => (
          <a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 hover:shadow-lg transition-all group"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {tool.name}
              </h4>
              <div className="flex items-center gap-2">
                {tool.featured && (
                  <FiStar className="w-4 h-4 text-yellow-500" />
                )}
                <FiExternalLink className="w-4 h-4 text-gray-400 group-hover:text-blue-600" />
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
              {tool.description}
            </p>
            <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-xs rounded-full">
              {tool.category}
            </span>
          </a>
        ))}
      </div>

      {filteredTools.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-600 dark:text-gray-400">
            No tools found matching your search.
          </p>
        </div>
      )}

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
          Note:
        </h4>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          External tools will open in a new tab. Some tools may require separate accounts or subscriptions.
          We're constantly adding new tools to the library.
        </p>
      </div>
    </div>
  );
}
