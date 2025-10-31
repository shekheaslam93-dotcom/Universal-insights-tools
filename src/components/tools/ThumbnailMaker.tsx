/**
 * Copyright (c) 2025 Universal Insights. All rights reserved.
 * Licensed under the MIT License.
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { FiUpload, FiDownload, FiType } from 'react-icons/fi';

export function ThumbnailMaker() {
  const [backgroundImage, setBackgroundImage] = useState<string | null>(null);
  const [text, setText] = useState('Your Title Here');
  const [fontSize, setFontSize] = useState(48);
  const [textColor, setTextColor] = useState('#ffffff');
  const [backgroundColor, setBackgroundColor] = useState('#3b82f6');
  const [textPosition, setTextPosition] = useState({ x: 50, y: 50 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    drawThumbnail();
  }, [backgroundImage, text, fontSize, textColor, backgroundColor, textPosition]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackgroundImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const drawThumbnail = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size (YouTube thumbnail size)
    canvas.width = 1280;
    canvas.height = 720;

    // Draw background
    if (backgroundImage) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        drawText(ctx);
      };
      img.src = backgroundImage;
    } else {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      drawText(ctx);
    }
  };

  const drawText = (ctx: CanvasRenderingContext2D) => {
    // Draw text with shadow
    ctx.font = `bold ${fontSize}px Arial`;
    ctx.fillStyle = textColor;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    // Add text shadow for better visibility
    ctx.shadowColor = 'rgba(0, 0, 0, 0.8)';
    ctx.shadowBlur = 10;
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;

    const x = (canvas.width * textPosition.x) / 100;
    const y = (canvas.height * textPosition.y) / 100;

    // Draw text with stroke for better visibility
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    ctx.strokeText(text, x, y);
    ctx.fillText(text, x, y);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `thumbnail-${Date.now()}.png`;
        link.click();
        URL.revokeObjectURL(url);
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Canvas Preview */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
            Preview
          </h3>
          <div className="border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              className="w-full h-auto"
              style={{ maxHeight: '400px' }}
            />
          </div>
          <button
            onClick={handleDownload}
            className="w-full mt-4 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors inline-flex items-center justify-center gap-2"
          >
            <FiDownload />
            Download Thumbnail (1280x720)
          </button>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
              Customize
            </h3>
            
            <div className="space-y-4">
              {/* Background Image */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  Background Image
                </label>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors inline-flex items-center justify-center gap-2"
                >
                  <FiUpload />
                  {backgroundImage ? 'Change Image' : 'Upload Image'}
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Background Color */}
              {!backgroundImage && (
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                    Background Color
                  </label>
                  <input
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-full h-12 rounded-lg cursor-pointer"
                  />
                </div>
              )}

              {/* Text */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  <FiType className="inline mr-1" />
                  Text
                </label>
                <input
                  type="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  Font Size: {fontSize}px
                </label>
                <input
                  type="range"
                  min="24"
                  max="120"
                  value={fontSize}
                  onChange={(e) => setFontSize(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              {/* Text Color */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  Text Color
                </label>
                <input
                  type="color"
                  value={textColor}
                  onChange={(e) => setTextColor(e.target.value)}
                  className="w-full h-12 rounded-lg cursor-pointer"
                />
              </div>

              {/* Text Position */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  Horizontal Position: {textPosition.x}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={textPosition.x}
                  onChange={(e) =>
                    setTextPosition({ ...textPosition, x: Number(e.target.value) })
                  }
                  className="w-full"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                  Vertical Position: {textPosition.y}%
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={textPosition.y}
                  onChange={(e) =>
                    setTextPosition({ ...textPosition, y: Number(e.target.value) })
                  }
                  className="w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
        <h4 className="font-semibold mb-2 text-blue-900 dark:text-blue-100">
          Tips:
        </h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
          <li>Use high-contrast colors for better readability</li>
          <li>Keep text short and impactful</li>
          <li>Standard YouTube thumbnail size is 1280x720 pixels</li>
          <li>Upload a background image for more professional results</li>
        </ul>
      </div>
    </div>
  );
}
