/**
 * Copyright (c) 2025 Universal Insights. All rights reserved.
 * Licensed under the MIT License.
 */

'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FiHome, 
  FiVideo, 
  FiImage, 
  FiEdit, 
  FiMic, 
  FiTool, 
  FiBookOpen,
  FiChevronDown,
  FiChevronRight
} from 'react-icons/fi';

const categories = [
  { name: 'Home', icon: FiHome, href: '/', color: 'text-blue-500' },
  { name: 'AI Video', icon: FiVideo, href: '/category/ai-video', color: 'text-purple-500' },
  { name: 'AI Image', icon: FiImage, href: '/category/ai-image', color: 'text-pink-500' },
  { name: 'Writing', icon: FiEdit, href: '/category/writing', color: 'text-green-500' },
  { name: 'TTS', icon: FiMic, href: '/category/tts', color: 'text-orange-500' },
  { name: 'Tools', icon: FiTool, href: '/category/tools', color: 'text-cyan-500' },
  { name: 'Learning', icon: FiBookOpen, href: '/category/learning', color: 'text-indigo-500' },
];

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname();
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Home']);

  const toggleCategory = (name: string) => {
    setExpandedCategories((prev) =>
      prev.includes(name) ? prev.filter((c) => c !== name) : [...prev, name]
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 
          bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700
          transform transition-transform duration-300 ease-in-out z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto scrollbar-hide
        `}
      >
        <nav className="p-4 space-y-2">
          {categories.map((category) => {
            const Icon = category.icon;
            const isActive = pathname === category.href;
            const isExpanded = expandedCategories.includes(category.name);

            return (
              <div key={category.name}>
                <Link
                  href={category.href}
                  onClick={() => {
                    toggleCategory(category.name);
                    if (window.innerWidth < 1024) onClose();
                  }}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-lg transition-all
                    ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                    }
                  `}
                >
                  <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600 dark:text-blue-400' : category.color}`} />
                  <span className="flex-1 font-medium">{category.name}</span>
                  {category.name !== 'Home' && (
                    <span className="text-xs">
                      {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
                    </span>
                  )}
                </Link>
              </div>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <Link href="/about" className="block hover:text-blue-600 dark:hover:text-blue-400">
              About
            </Link>
            <Link href="/privacy" className="block hover:text-blue-600 dark:hover:text-blue-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="block hover:text-blue-600 dark:hover:text-blue-400">
              Terms of Service
            </Link>
            <p className="pt-2">© 2025 Universal Insights</p>
          </div>
        </div>
      </aside>
    </>
  );
}
