/**
 * Copyright (c) 2025 Universal Insights. All rights reserved.
 * Licensed under the MIT License.
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const defaultTools = [
  {
    name: 'Prompt Writer',
    slug: 'prompt-writer',
    description: 'Generate and optimize AI prompts with templates and best practices',
    category: 'Writing',
    componentType: 'prompt-writer',
    isFeatured: true,
    tags: JSON.stringify(['AI', 'Writing', 'Prompts', 'Templates']),
    metaTitle: 'AI Prompt Writer - Universal Insights Tools',
    metaDescription: 'Create powerful AI prompts with our free prompt writer tool',
  },
  {
    name: 'Image Upscaler',
    slug: 'image-upscaler',
    description: 'Upscale and enhance your images with AI-powered technology',
    category: 'AI Image',
    componentType: 'image-upscaler',
    isFeatured: true,
    tags: JSON.stringify(['AI', 'Image', 'Upscale', 'Enhancement']),
    metaTitle: 'Free Image Upscaler - Universal Insights Tools',
    metaDescription: 'Upscale images for free with our AI-powered image upscaler',
  },
  {
    name: 'Text to Speech',
    slug: 'text-to-speech',
    description: 'Convert text to natural-sounding speech with multiple voices',
    category: 'TTS',
    componentType: 'text-to-speech',
    isFeatured: true,
    tags: JSON.stringify(['TTS', 'Voice', 'Audio', 'Speech']),
    metaTitle: 'Free Text to Speech - Universal Insights Tools',
    metaDescription: 'Convert text to speech online for free with natural voices',
  },
  {
    name: 'Thumbnail Maker',
    slug: 'thumbnail-maker',
    description: 'Create stunning thumbnails for YouTube, social media, and more',
    category: 'Design',
    componentType: 'thumbnail-maker',
    isFeatured: true,
    tags: JSON.stringify(['Design', 'Thumbnail', 'Graphics', 'Social Media']),
    metaTitle: 'Free Thumbnail Maker - Universal Insights Tools',
    metaDescription: 'Create professional thumbnails for free with our easy-to-use tool',
  },
  {
    name: 'Video Captioner',
    slug: 'video-captioner',
    description: 'Add captions and subtitles to your videos automatically',
    category: 'AI Video',
    componentType: 'video-captioner',
    isFeatured: false,
    tags: JSON.stringify(['Video', 'Captions', 'Subtitles', 'Accessibility']),
    metaTitle: 'Free Video Captioner - Universal Insights Tools',
    metaDescription: 'Add captions to videos automatically with our free tool',
  },
  {
    name: 'AI Tool Library',
    slug: 'ai-tool-library',
    description: 'Browse and access hundreds of AI tools in one place',
    category: 'Tools',
    componentType: 'tool-library',
    isFeatured: true,
    tags: JSON.stringify(['AI', 'Tools', 'Directory', 'Resources']),
    metaTitle: 'AI Tool Library - Universal Insights Tools',
    metaDescription: 'Discover and use the best AI tools all in one place',
  },
];

async function main() {
  console.log('🌱 Seeding database...');

  // Clear existing tools
  await prisma.tool.deleteMany({});
  console.log('✅ Cleared existing tools');

  // Create default tools
  for (const tool of defaultTools) {
    await prisma.tool.create({
      data: tool,
    });
  }
  console.log(`✅ Created ${defaultTools.length} default tools`);

  console.log('🎉 Seeding completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
