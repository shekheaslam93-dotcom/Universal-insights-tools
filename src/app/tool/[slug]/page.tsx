/**
 * Copyright (c) 2025 Universal Insights. All rights reserved.
 * Licensed under the MIT License.
 */

'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';
import { PromptWriter } from '@/components/tools/PromptWriter';
import { ImageUpscaler } from '@/components/tools/ImageUpscaler';
import { TextToSpeech } from '@/components/tools/TextToSpeech';
import { ThumbnailMaker } from '@/components/tools/ThumbnailMaker';
import { VideoCaptioner } from '@/components/tools/VideoCaptioner';
import { ToolLibrary } from '@/components/tools/ToolLibrary';
import { SignInModal } from '@/components/SignInModal';
import { ToolActions } from '@/components/ToolActions';
import { motion } from 'framer-motion';

const toolComponents: Record<string, React.ComponentType<any>> = {
  'prompt-writer': PromptWriter,
  'image-upscaler': ImageUpscaler,
  'text-to-speech': TextToSpeech,
  'thumbnail-maker': ThumbnailMaker,
  'video-captioner': VideoCaptioner,
  'ai-tool-library': ToolLibrary,
};

export default function ToolPage({ params }: { params: { slug: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [tool, setTool] = useState<any>(null);

  useEffect(() => {
    // Mock tool data - replace with API call
    const mockTools: Record<string, any> = {
      'prompt-writer': {
        name: 'Prompt Writer',
        slug: 'prompt-writer',
        description: 'Generate and optimize AI prompts with templates and best practices',
        category: 'Writing',
        componentType: 'prompt-writer',
        tags: ['AI', 'Writing', 'Prompts', 'Templates'],
      },
      'image-upscaler': {
        name: 'Image Upscaler',
        slug: 'image-upscaler',
        description: 'Upscale and enhance your images with AI-powered technology',
        category: 'AI Image',
        componentType: 'image-upscaler',
        tags: ['AI', 'Image', 'Upscale', 'Enhancement'],
      },
      'text-to-speech': {
        name: 'Text to Speech',
        slug: 'text-to-speech',
        description: 'Convert text to natural-sounding speech with multiple voices',
        category: 'TTS',
        componentType: 'text-to-speech',
        tags: ['TTS', 'Voice', 'Audio', 'Speech'],
      },
      'thumbnail-maker': {
        name: 'Thumbnail Maker',
        slug: 'thumbnail-maker',
        description: 'Create stunning thumbnails for YouTube, social media, and more',
        category: 'Design',
        componentType: 'thumbnail-maker',
        tags: ['Design', 'Thumbnail', 'Graphics', 'Social Media'],
      },
      'video-captioner': {
        name: 'Video Captioner',
        slug: 'video-captioner',
        description: 'Add captions and subtitles to your videos automatically',
        category: 'AI Video',
        componentType: 'video-captioner',
        tags: ['Video', 'Captions', 'Subtitles', 'Accessibility'],
      },
      'ai-tool-library': {
        name: 'AI Tool Library',
        slug: 'ai-tool-library',
        description: 'Browse and access hundreds of AI tools in one place',
        category: 'Tools',
        componentType: 'tool-library',
        tags: ['AI', 'Tools', 'Directory', 'Resources'],
      },
    };

    setTool(mockTools[params.slug]);
  }, [params.slug]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      setShowSignInModal(true);
    }
  }, [status]);

  if (!tool) {
    return <div>Loading...</div>;
  }

  const ToolComponent = toolComponents[tool.componentType];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <main className="flex-1 overflow-x-hidden">
          <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Tool Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                    {tool.name}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-gray-400">
                    {tool.description}
                  </p>
                </div>
                <ToolActions toolSlug={tool.slug} />
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {tool.tags?.map((tag: string) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Tool Component */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              id="tool-output"
              className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 shadow-sm"
            >
              {status === 'authenticated' && ToolComponent ? (
                <ToolComponent />
              ) : status === 'loading' ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                  <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Please sign in to use this tool
                  </p>
                  <button
                    onClick={() => setShowSignInModal(true)}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
                  >
                    Sign In with Google
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>

      {showSignInModal && (
        <SignInModal onClose={() => setShowSignInModal(false)} />
      )}
    </div>
  );
}
