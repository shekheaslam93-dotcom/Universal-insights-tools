/**
 * Copyright (c) 2025 Universal Insights. All rights reserved.
 * Licensed under the MIT License.
 */

'use client';

import { useState, useRef } from 'react';
import { FiUpload, FiDownload, FiPlay } from 'react-icons/fi';

export function VideoCaptioner() {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [captions, setCaptions] = useState<string>('');
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
      setCaptions('');
    }
  };

  const handleGenerateCaptions = () => {
    setProcessing(true);
    
    // Simulate caption generation (in production, this would use speech-to-text API)
    setTimeout(() => {
      const mockCaptions = `WEBVTT

00:00:00.000 --> 00:00:03.000
Welcome to this video tutorial

00:00:03.000 --> 00:00:06.000
Today we'll be learning about AI tools

00:00:06.000 --> 00:00:09.000
And how to use them effectively

00:00:09.000 --> 00:00:12.000
Let's get started with the basics`;

      setCaptions(mockCaptions);
      setProcessing(false);
    }, 2000);
  };

  const handleDownloadCaptions = () => {
    if (!captions) return;

    const blob = new Blob([captions], { type: 'text/vtt' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `captions-${Date.now()}.vtt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
          Upload Video
        </h3>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 transition-colors"
        >
          <FiUpload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-gray-500">MP4, WebM, MOV up to 100MB</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="video/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {videoUrl && (
        <>
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              Video Preview
            </h3>
            <video
              ref={videoRef}
              src={videoUrl}
              controls
              className="w-full rounded-lg border border-gray-200 dark:border-gray-700"
              style={{ maxHeight: '400px' }}
            />
          </div>

          <button
            onClick={handleGenerateCaptions}
            disabled={processing}
            className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
          >
            <FiPlay />
            {processing ? 'Generating Captions...' : 'Generate Captions'}
          </button>

          {captions && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Generated Captions (WebVTT)
                </h3>
                <button
                  onClick={handleDownloadCaptions}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors inline-flex items-center gap-2"
                >
                  <FiDownload />
                  Download VTT
                </button>
              </div>
              <textarea
                value={captions}
                onChange={(e) => setCaptions(e.target.value)}
                rows={10}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 font-mono text-sm"
              />
            </div>
          )}
        </>
      )}

      <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-yellow-900 dark:text-yellow-100">
          Demo Mode:
        </h4>
        <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-2">
          This is a demonstration version that generates sample captions. For production use, you can integrate:
        </p>
        <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-1 list-disc list-inside">
          <li>Google Cloud Speech-to-Text API</li>
          <li>OpenAI Whisper API</li>
          <li>AssemblyAI</li>
          <li>Rev.ai</li>
        </ul>
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
          Features:
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
          <li>Upload videos up to 100MB</li>
          <li>Generate WebVTT format captions</li>
          <li>Edit captions before downloading</li>
          <li>Compatible with YouTube, Vimeo, and most video players</li>
        </ul>
      </div>
    </div>
  );
}
