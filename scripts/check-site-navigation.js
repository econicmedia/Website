/**
 * BenFresh Website Navigation Checker
 * 
 * This script analyzes the website's navigation structure to ensure 
 * all pages are properly linked and accessible.
 * 
 * Usage: node check-site-navigation.js
 */

const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Configuration
const config = {
  // Root directories to scan
  rootDirs: ['src/app', 'src/components'],
  
  // File extensions to analyze
  fileExtensions: ['.tsx', '.jsx', '.js', '.ts'],
  
  // Expected pages/routes that should exist
  expectedRoutes: [
    '/', // Home
    '/impressum',
    '/datenschutz',
    '/agb',
    '/widerruf',
    // Add more expected routes as needed
  ],
  
  // Main navigation links that should be present
  expectedNavItems: [
    'Leistungen',
    'Warum BenFresh',
    'Kontakt',
    'Impressum',
    'Datenschutz',
    'AGB',
  ],
  
  // Page sections that should have navigation/links to them
  expectedSections: [
    'hero',
    'services',
    'why-benfresh',
    'kontakt',
  ],
};

/**
 * Find all relevant files to analyze
 */
function findFilesToAnalyze(rootDir) {
  const files = [];
  
  for (const dir of config.rootDirs) {
    const dirPath = path.join(rootDir, dir);
    if (!fs.existsSync(dirPath)) {
      console.warn(`Directory not found: ${dirPath}`);
      continue;
    }
    
    const dirFiles = findFilesInDir(dirPath);
    files.push(...dirFiles);
  }
  
  return files;
}

/**
 * Recursively find files in a directory
 */
function findFilesInDir(dirPath) {
  const files = [];
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });
  
  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);
    
    if (entry.isDirectory()) {
      // Skip node_modules and other unwanted dirs
      if (
        !entry.name.startsWith('.') && 
        entry.name !== 'node_modules' &&
        entry.name !== 'build' &&
        entry.name !== 'dist'
      ) {
        const subDirFiles = findFilesInDir(entryPath);
        files.push(...subDirFiles);
      }
    } else if (entry.isFile()) {
      // Check if file has desired extension
      const ext = path.extname(entry.name);
      if (config.fileExtensions.includes(ext)) {
        files.push(entryPath);
      }
    }
  }
  
  return files;
}

/**
 * Extract routes from Next.js app directory
 */
function extractRoutes(rootDir) {
  const appDir = path.join(rootDir, 'src/app');
  const routes = ['/'];  // Always include home route
  
  if (!fs.existsSync(appDir)) {
    return routes;
  }
  
  function scanDirForRoutes(dirPath, parentRoute = '') {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      // Skip special Next.js files and directories
      if (
        entry.name.startsWith('_') ||
        entry.name.startsWith('.') ||
        entry.name === 'api' ||
        entry.name === 'components'
      ) {
        continue;
      }
      
      const entryPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        let routeName = entry.name;
        
        // Check if it's a dynamic route
        if (routeName.startsWith('[') && routeName.endsWith(']')) {
          routeName = `:${routeName.substring(1, routeName.length - 1)}`;
        }
        
        const newRoute = parentRoute + '/' + routeName;
        
        // Check if this is a route (has page.tsx)
        if (
          fs.existsSync(path.join(entryPath, 'page.tsx')) ||
          fs.existsSync(path.join(entryPath, 'page.jsx')) ||
          fs.existsSync(path.join(entryPath, 'page.js'))
        ) {
          routes.push(newRoute);
        }
        
        // Recursively scan for nested routes
        scanDirForRoutes(entryPath, newRoute);
      } else if (
        entry.name === 'page.tsx' ||
        entry.name === 'page.jsx' ||
        entry.name === 'page.js'
      ) {
        // If we're directly looking at a page file and it's not the root
        if (parentRoute && !routes.includes(parentRoute)) {
          routes.push(parentRoute);
        }
      }
    }
  }
  
  scanDirForRoutes(appDir);
  return routes;
}

/**
 * Extract links from files
 */
function extractLinks(files) {
  const links = new Set();
  const internalLinks = new Set();
  const sectionLinks = new Set();
  const navItems = new Set();
  
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    
    // Extract navigation items (look for navigation component)
    if (content.includes('navigation') || content.includes('navbar') || content.includes('menu') || 
        file.includes('header') || file.includes('nav') || file.includes('footer')) {
      // Look for navigation items in JSX
      const navItemRegex = /<[a-zA-Z]+[^>]*>([^<]+)<\/[a-zA-Z]+>/g;
      let match;
      while ((match = navItemRegex.exec(content)) !== null) {
        const text = match[1].trim();
        if (text.length > 0 && !text.includes('{')) {
          navItems.add(text);
        }
      }
    }
    
    // Extract href links
    const hrefRegex = /href=["']([^"']+)["']/g;
    let hrefMatch;
    while ((hrefMatch = hrefRegex.exec(content)) !== null) {
      const href = hrefMatch[1].trim();
      
      links.add(href);
      
      // Identify internal links vs section links
      if (href.startsWith('/')) {
        internalLinks.add(href);
      } else if (href.startsWith('#')) {
        sectionLinks.add(href.substring(1));
      }
    }
    
    // Extract id attributes (for section targets)
    const idRegex = /id=["']([^"']+)["']/g;
    let idMatch;
    while ((idMatch = idRegex.exec(content)) !== null) {
      const id = idMatch[1].trim();
      // Only add non-dynamic IDs
      if (!id.includes('{') && !id.includes('$')) {
        sectionLinks.add(id);
      }
    }
  }
  
  return {
    allLinks: Array.from(links),
    internalLinks: Array.from(internalLinks),
    sectionLinks: Array.from(sectionLinks),
    navItems: Array.from(navItems)
  };
}

/**
 * Check for missing expected routes
 */
function checkMissingRoutes(foundRoutes) {
  const missingRoutes = [];
  
  for (const route of config.expectedRoutes) {
    if (!foundRoutes.some(r => r === route)) {
      missingRoutes.push(route);
    }
  }
  
  return missingRoutes;
}

/**
 * Check for missing navigation items
 */
function checkNavItems(navItems) {
  const missingItems = [];
  
  for (const item of config.expectedNavItems) {
    if (!navItems.some(nav => 
      nav.includes(item) || 
      item.includes(nav) || 
      nav.toLowerCase() === item.toLowerCase()
    )) {
      missingItems.push(item);
    }
  }
  
  return missingItems;
}

/**
 * Check for missing section links
 */
function checkSectionLinks(sectionLinks) {
  const missingSections = [];
  
  for (const section of config.expectedSections) {
    if (!sectionLinks.some(s => s === section || s.includes(section) || section.includes(s))) {
      missingSections.push(section);
    }
  }
  
  return missingSections;
}

/**
 * Run sitemap generation command if available
 */
function generateSitemap(rootDir) {
  return new Promise((resolve) => {
    // Check if next-sitemap is installed
    const packageJsonPath = path.join(rootDir, 'package.json');
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
      
      if (
        (packageJson.dependencies && packageJson.dependencies['next-sitemap']) ||
        (packageJson.devDependencies && packageJson.devDependencies['next-sitemap'])
      ) {
        console.log('Generating sitemap using next-sitemap...');
        
        exec('npm run postbuild', { cwd: rootDir }, (error, stdout, stderr) => {
          if (error) {
            console.warn('Could not generate sitemap:', error.message);
            console.log('You may need to run: npm run build && npm run postbuild');
          } else {
            console.log('Sitemap generated successfully.');
          }
          resolve();
        });
      } else {
        console.log('next-sitemap not found in dependencies. Skipping sitemap generation.');
        resolve();
      }
    } else {
      console.warn('package.json not found. Skipping sitemap generation.');
      resolve();
    }
  });
}

/**
 * Main function
 */
async function main() {
  console.log('=== BenFresh Website Navigation Checker ===');
  
  try {
    const rootDir = path.resolve(__dirname, '..');
    console.log('Analyzing website navigation structure...');
    
    // Extract routes from Next.js app directory
    const routes = extractRoutes(rootDir);
    console.log(`\nFound ${routes.length} routes in the Next.js app directory:`);
    routes.forEach(route => console.log(`- ${route}`));
    
    // Check for missing expected routes
    const missingRoutes = checkMissingRoutes(routes);
    if (missingRoutes.length > 0) {
      console.log('\n⚠️ Missing expected routes:');
      missingRoutes.forEach(route => console.log(`- ${route}`));
    } else {
      console.log('\n✅ All expected routes are present.');
    }
    
    // Find files to analyze
    const files = findFilesToAnalyze(rootDir);
    console.log(`\nAnalyzing ${files.length} files for links and navigation items...`);
    
    // Extract links from files
    const { allLinks, internalLinks, sectionLinks, navItems } = extractLinks(files);
    
    // Check navigation items
    console.log(`\nFound ${navItems.length} navigation items:`);
    navItems.forEach(item => console.log(`- ${item}`));
    
    const missingNavItems = checkNavItems(navItems);
    if (missingNavItems.length > 0) {
      console.log('\n⚠️ Missing expected navigation items:');
      missingNavItems.forEach(item => console.log(`- ${item}`));
    } else {
      console.log('\n✅ All expected navigation items are present.');
    }
    
    // Check section links
    console.log(`\nFound ${sectionLinks.length} section links/targets:`);
    sectionLinks.forEach(section => console.log(`- ${section}`));
    
    const missingSections = checkSectionLinks(sectionLinks);
    if (missingSections.length > 0) {
      console.log('\n⚠️ Missing expected section links:');
      missingSections.forEach(section => console.log(`- ${section}`));
    } else {
      console.log('\n✅ All expected section links are present.');
    }
    
    // Check for orphaned internal links (links to pages that don't exist)
    const orphanedLinks = internalLinks.filter(link => {
      const cleanLink = link.split('?')[0]; // Remove query parameters
      return !routes.some(route => route === cleanLink || route === cleanLink + '/');
    });
    
    if (orphanedLinks.length > 0) {
      console.log('\n⚠️ Found orphaned internal links (pointing to non-existent pages):');
      orphanedLinks.forEach(link => console.log(`- ${link}`));
    } else {
      console.log('\n✅ No orphaned internal links found.');
    }
    
    // Generate sitemap
    await generateSitemap(rootDir);
    
    console.log('\n=== Navigation Check Summary ===');
    if (missingRoutes.length === 0 && missingNavItems.length === 0 && 
        missingSections.length === 0 && orphanedLinks.length === 0) {
      console.log('✅ All navigation checks passed successfully!');
    } else {
      console.log('⚠️ Some navigation issues were found. Please review the report above.');
    }
    
  } catch (error) {
    console.error('Error analyzing navigation:', error);
  }
}

// Run the main function
main();
