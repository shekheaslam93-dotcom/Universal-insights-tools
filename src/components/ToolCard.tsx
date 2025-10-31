/**
 * Copyright (c) 2025 Universal Insights. All rights reserved.
 * Licensed under the MIT License.
 */

'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiExternalLink, FiStar } from 'react-icons/fi';

interface ToolCardProps {
  tool: {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    icon?: string;
    isFeatured?: boolean;
  };
  index?: number;
}

export function ToolCard({ tool, index = 0 }: ToolCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group"
    >
      <Link href={`/tool/${tool.slug}`}>
        <div className="relative h-full bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-lg overflow-hidden">
          {/* Featured Badge */}
          {tool.isFeatured && (
            <div className="absolute top-3 right-3 z-10">
              <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500 text-white text-xs font-semibold rounded-full">
                <FiStar className="w-3 h-3" />
                Featured
              </div>
            </div>
          )}

          {/* Icon/Image */}
          <div className="relative h-40 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            {tool.icon ? (
              <img src={tool.icon} alt={tool.name} className="w-16 h-16 object-contain" />
            ) : (
              <div className="text-6xl text-white opacity-80">
                {tool.name.charAt(0)}
              </div>
            )}
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
              <FiExternalLink className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                {tool.name}
              </h3>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
              {tool.description}
            </p>

            <div className="flex items-center justify-between">
              <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full">
                {tool.category}
              </span>
              
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                Open Tool →
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
