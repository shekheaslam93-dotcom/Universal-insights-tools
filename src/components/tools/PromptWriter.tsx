/**
 * Copyright (c) 2025 Universal Insights. All rights reserved.
 * Licensed under the MIT License.
 */

'use client';

import { useState } from 'react';
import { FiCopy, FiRefreshCw } from 'react-icons/fi';

const promptTemplates = [
  {
    name: 'Blog Post',
    template: 'Write a comprehensive blog post about [TOPIC]. Include an engaging introduction, 3-5 main points with examples, and a compelling conclusion. Target audience: [AUDIENCE]. Tone: [TONE].',
  },
  {
    name: 'Social Media',
    template: 'Create an engaging social media post about [TOPIC] for [PLATFORM]. Include relevant hashtags and a call-to-action. Keep it concise and attention-grabbing.',
  },
  {
    name: 'Product Description',
    template: 'Write a compelling product description for [PRODUCT]. Highlight key features, benefits, and unique selling points. Target customer: [CUSTOMER]. Word count: [COUNT].',
  },
  {
    name: 'Email Marketing',
    template: 'Compose a marketing email for [PRODUCT/SERVICE]. Include a catchy subject line, personalized greeting, value proposition, and clear call-to-action. Tone: [TONE].',
  },
  {
    name: 'Code Generation',
    template: 'Write [LANGUAGE] code to [TASK]. Include comments explaining the logic, error handling, and follow best practices. Make it production-ready.',
  },
];

export function PromptWriter() {
  const [selectedTemplate, setSelectedTemplate] = useState(promptTemplates[0]);
  const [customPrompt, setCustomPrompt] = useState(promptTemplates[0].template);
  const [optimizedPrompt, setOptimizedPrompt] = useState('');

  const handleOptimize = () => {
    // Simple optimization logic (client-side)
    let optimized = customPrompt;
    
    // Add clarity improvements
    if (!optimized.includes('specific')) {
      optimized = 'Be specific and detailed. ' + optimized;
    }
    
    // Add structure
    if (!optimized.includes('step by step')) {
      optimized += '\n\nProvide your response in a clear, step-by-step format.';
    }
    
    // Add quality control
    optimized += '\n\nEnsure the output is well-structured, accurate, and professional.';
    
    setOptimizedPrompt(optimized);
  };

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
          Choose a Template
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {promptTemplates.map((template) => (
            <button
              key={template.name}
              onClick={() => {
                setSelectedTemplate(template);
                setCustomPrompt(template.template);
                setOptimizedPrompt('');
              }}
              className={`p-3 rounded-lg border-2 transition-all ${
                selectedTemplate.name === template.name
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                  : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
              }`}
            >
              <span className="text-sm font-medium">{template.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
          Your Prompt
        </label>
        <textarea
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          rows={6}
          className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Enter your prompt here..."
        />
      </div>

      <button
        onClick={handleOptimize}
        className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
      >
        <FiRefreshCw />
        Optimize Prompt
      </button>

      {optimizedPrompt && (
        <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-semibold text-green-900 dark:text-green-100">
              Optimized Prompt
            </h4>
            <button
              onClick={() => handleCopy(optimizedPrompt)}
              className="p-2 hover:bg-green-100 dark:hover:bg-green-900/40 rounded-lg transition-colors"
              title="Copy to clipboard"
            >
              <FiCopy className="w-5 h-5 text-green-700 dark:text-green-300" />
            </button>
          </div>
          <p className="text-sm text-green-800 dark:text-green-200 whitespace-pre-wrap">
            {optimizedPrompt}
          </p>
        </div>
      )}

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
          Tips for Better Prompts:
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
          <li>Be specific about what you want</li>
          <li>Provide context and examples</li>
          <li>Specify the format and length</li>
          <li>Define the tone and style</li>
          <li>Include constraints or requirements</li>
        </ul>
      </div>
    </div>
  );
}
