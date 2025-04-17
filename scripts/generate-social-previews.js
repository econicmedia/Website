/**
 * BenFresh Social Media Preview Image Generator
 * 
 * This script generates preview images for social media platforms like Facebook, Twitter,
 * LinkedIn, and Instagram based on the website's branding.
 * 
 * Requires node-canvas and fs-extra, will install them if not present.
 * 
 * Usage: node generate-social-previews.js
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check for dependencies and install if needed
try {
  require.resolve('canvas');
  require.resolve('fs-extra');
} catch (error) {
  console.log('Installing required dependencies...');
  execSync('npm install canvas fs-extra --save-dev');
  console.log('Dependencies installed successfully.');
}

const { createCanvas, loadImage, registerFont } = require('canvas');
const fsExtra = require('fs-extra');

// Configuration 
const config = {
  // Output directory for preview images
  outputDir: '../public/social-previews',
  
  // BenFresh brand colors
  brandColors: {
    teal: '#0097A7',
    tealDark: '#00838F',
    tealLight: '#B2EBF2',
    grayDark: '#1F2937',
    gray: '#6B7280',
    white: '#FFFFFF',
  },
  
  // Company information
  company: {
    name: 'BenFresh',
    tagline: 'Professionelle Reinigung für Ihren perfekten Eindruck',
    website: 'benfresh.de',
    location: 'Köln',
  },
  
  // Supported platforms and their dimensions
  platforms: {
    facebook: {
      width: 1200,
      height: 630,
      filename: 'facebook-preview.png',
    },
    twitter: {
      width: 1200,
      height: 675,
      filename: 'twitter-preview.png',
    },
    linkedin: {
      width: 1200,
      height: 627,
      filename: 'linkedin-preview.png',
    },
    instagram: {
      width: 1080,
      height: 1080,
      filename: 'instagram-preview.png',
    },
  },
  
  // Image assets
  assets: {
    logo: '../public/logo.png', // Will use fallback if not found
    backgroundImage: '../public/bg-pattern.png', // Will use fallback if not found
  },
};

/**
 * Create output directory
 */
function createOutputDirectory() {
  const outputPath = path.resolve(__dirname, config.outputDir);
  fsExtra.ensureDirSync(outputPath);
  return outputPath;
}

/**
 * Draw gradient background
 */
function drawGradientBackground(ctx, width, height, colors) {
  // Create gradient
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, colors.teal);
  gradient.addColorStop(1, colors.tealDark);
  
  // Fill background
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  // Add subtle pattern
  ctx.fillStyle = colors.tealLight;
  ctx.globalAlpha = 0.05;
  
  // Create a pattern of dots
  const dotSize = 3;
  const spacing = 20;
  for (let x = 0; x < width; x += spacing) {
    for (let y = 0; y < height; y += spacing) {
      ctx.beginPath();
      ctx.arc(x, y, dotSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  
  ctx.globalAlpha = 1;
}

/**
 * Draw text elements
 */
function drawText(ctx, width, height, company, colors) {
  // Set text styles
  ctx.textAlign = 'center';
  ctx.fillStyle = colors.white;
  
  // Draw company name
  const nameSize = Math.floor(width * 0.08); // 8% of width
  ctx.font = `bold ${nameSize}px 'Arial'`;
  ctx.fillText(company.name, width / 2, height * 0.4);
  
  // Draw tagline
  const taglineSize = Math.floor(width * 0.035); // 3.5% of width
  ctx.font = `${taglineSize}px 'Arial'`;
  ctx.fillText(company.tagline, width / 2, height * 0.5);
  
  // Draw location
  const locationSize = Math.floor(width * 0.025); // 2.5% of width
  ctx.font = `${locationSize}px 'Arial'`;
  ctx.fillText(company.location, width / 2, height * 0.65);
  
  // Draw website
  const websiteSize = Math.floor(width * 0.025); // 2.5% of width
  ctx.font = `${websiteSize}px 'Arial'`;
  ctx.fillText(company.website, width / 2, height * 0.88);
}

/**
 * Draw decorative elements
 */
function drawDecoration(ctx, width, height, colors) {
  // Draw horizontal line
  const lineY = height * 0.55;
  const lineWidth = width * 0.5;
  
  ctx.beginPath();
  ctx.moveTo((width - lineWidth) / 2, lineY);
  ctx.lineTo((width + lineWidth) / 2, lineY);
  ctx.strokeStyle = colors.white;
  ctx.lineWidth = 3;
  ctx.stroke();
  
  // Draw circle elements
  ctx.fillStyle = colors.white;
  ctx.globalAlpha = 0.1;
  
  // Large circle in background
  ctx.beginPath();
  ctx.arc(width * 0.8, height * 0.2, width * 0.15, 0, Math.PI * 2);
  ctx.fill();
  
  // Small circle
  ctx.beginPath();
  ctx.arc(width * 0.2, height * 0.75, width * 0.08, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.globalAlpha = 1;
}

/**
 * Generate preview for a specific platform
 */
async function generatePreview(platform, outputPath) {
  const { width, height, filename } = platform;
  
  // Create canvas
  const canvas = createCanvas(width, height);
  const ctx = canvas.getContext('2d');
  
  // Draw background
  drawGradientBackground(ctx, width, height, config.brandColors);
  
  // Try to load and draw logo if available
  try {
    const logoPath = path.resolve(__dirname, config.assets.logo);
    if (fs.existsSync(logoPath)) {
      const logo = await loadImage(logoPath);
      // Calculate logo size (20% of canvas width)
      const logoSize = Math.min(width, height) * 0.2;
      const logoX = (width - logoSize) / 2;
      const logoY = height * 0.2 - logoSize / 2;
      ctx.drawImage(logo, logoX, logoY, logoSize, logoSize);
    } else {
      // Fallback: draw a placeholder logo
      ctx.fillStyle = config.brandColors.white;
      ctx.font = `bold ${Math.floor(width * 0.12)}px 'Arial'`;
      ctx.textAlign = 'center';
      ctx.fillText(config.company.name.slice(0, 1), width / 2, height * 0.22);
    }
  } catch (error) {
    console.warn('Could not load logo, using fallback:', error.message);
  }
  
  // Draw decorative elements
  drawDecoration(ctx, width, height, config.brandColors);
  
  // Draw text elements
  drawText(ctx, width, height, config.company, config.brandColors);
  
  // Save image
  const outputFilePath = path.join(outputPath, filename);
  const out = fs.createWriteStream(outputFilePath);
  const stream = canvas.createPNGStream();
  stream.pipe(out);
  
  return new Promise((resolve, reject) => {
    out.on('finish', () => resolve(outputFilePath));
    out.on('error', reject);
  });
}

/**
 * Main function
 */
async function main() {
  console.log('=== BenFresh Social Media Preview Generator ===');
  
  try {
    // Create output directory
    const outputPath = createOutputDirectory();
    console.log(`Output directory: ${outputPath}`);
    
    // Generate preview for each platform
    for (const [platformName, platformConfig] of Object.entries(config.platforms)) {
      console.log(`Generating ${platformName} preview...`);
      const filePath = await generatePreview(platformConfig, outputPath);
      console.log(`Created: ${path.basename(filePath)}`);
    }
    
    console.log('\nAll social media previews generated successfully!');
    console.log('Make sure to update your metadata tags to reference these images.');
    console.log('\nExample for Facebook/Open Graph:');
    console.log('<meta property="og:image" content="https://benfresh.de/social-previews/facebook-preview.png" />');
    console.log('\nExample for Twitter:');
    console.log('<meta name="twitter:image" content="https://benfresh.de/social-previews/twitter-preview.png" />');
  } catch (error) {
    console.error('Error generating social media previews:', error);
  }
}

// Run the main function
main();
