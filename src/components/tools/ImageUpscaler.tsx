/**
 * Copyright (c) 2025 Universal Insights. All rights reserved.
 * Licensed under the MIT License.
 */

'use client';

import { useState, useRef } from 'react';
import { FiUpload, FiDownload } from 'react-icons/fi';

export function ImageUpscaler() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [upscaledImage, setUpscaledImage] = useState<string | null>(null);
  const [scale, setScale] = useState(2);
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOriginalImage(event.target?.result as string);
        setUpscaledImage(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpscale = () => {
    if (!originalImage || !canvasRef.current) return;

    setProcessing(true);

    const img = new Image();
    img.onload = () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d')!;

      // Set canvas size to upscaled dimensions
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      // Use imageSmoothingEnabled for better quality
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';

      // Draw upscaled image
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convert to data URL
      const upscaled = canvas.toDataURL('image/png');
      setUpscaledImage(upscaled);
      setProcessing(false);
    };

    img.src = originalImage;
  };

  const handleDownload = () => {
    if (!upscaledImage) return;

    const link = document.createElement('a');
    link.href = upscaledImage;
    link.download = `upscaled-${scale}x-${Date.now()}.png`;
    link.click();
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
          Upload Image
        </h3>
        <div
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 transition-colors"
        >
          <FiUpload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Click to upload or drag and drop
          </p>
          <p className="text-sm text-gray-500">PNG, JPG, WEBP up to 10MB</p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>

      {originalImage && (
        <>
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
              Upscale Factor: {scale}x
            </label>
            <input
              type="range"
              min="2"
              max="4"
              step="1"
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>2x</span>
              <span>3x</span>
              <span>4x</span>
            </div>
          </div>

          <button
            onClick={handleUpscale}
            disabled={processing}
            className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition-colors"
          >
            {processing ? 'Processing...' : 'Upscale Image'}
          </button>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">
                Original
              </h4>
              <img
                src={originalImage}
                alt="Original"
                className="w-full rounded-lg border border-gray-200 dark:border-gray-700"
              />
            </div>

            {upscaledImage && (
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900 dark:text-white">
                    Upscaled ({scale}x)
                  </h4>
                  <button
                    onClick={handleDownload}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                    title="Download"
                  >
                    <FiDownload className="w-5 h-5" />
                  </button>
                </div>
                <img
                  src={upscaledImage}
                  alt="Upscaled"
                  className="w-full rounded-lg border border-gray-200 dark:border-gray-700"
                />
              </div>
            )}
          </div>
        </>
      )}

      <canvas ref={canvasRef} className="hidden" />

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
          Note:
        </h4>
        <p className="text-sm text-blue-800 dark:text-blue-200">
          This is a client-side upscaler using browser canvas API. For AI-powered upscaling with better quality, 
          you can integrate services like Real-ESRGAN or waifu2x in the future.
        </p>
      </div>
    </div>
  );
}
