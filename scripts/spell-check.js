/**
 * BenFresh Website Content Spell Checker
 * 
 * This script checks the content of the website for spelling errors using a German dictionary.
 * It scans all React component files and extracts text content for checking.
 * 
 * Usage: node spell-check.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Check if spellchecker is installed
try {
  require.resolve('spellchecker');
} catch (error) {
  console.log('Installing required dependencies...');
  execSync('npm install spellchecker --save-dev');
  console.log('Dependencies installed successfully.');
}

const SpellChecker = require('spellchecker');

// Configuration
const config = {
  // Directories to scan for content
  contentDirs: [
    'src/app/components',
    'src/components',
    'src/app'
  ],
  // File extensions to check
  fileExtensions: ['.tsx', '.jsx', '.ts', '.js', '.md'],
  // Words to ignore (e.g., brand names, technical terms)
  ignoreWords: [
    'BenFresh',
    'React',
    'Next',
    'TypeScript',
    'JavaScript',
    'Tailwind',
    'CSS',
    'HTML',
    'SEO',
    'DSGVO',
    'WhatsApp',
    'Cookie',
    'WCAG',
    'Analytics',
    'ARIA'
  ],
  // Additional German words to consider correct
  additionalWords: [
    'Reinigung',
    'Reinigungsdienstleistungen',
    'Gebäudereinigung',
    'Fensterreinigung',
    'Teppichreinigung',
    'Bodenreinigung',
    'Reinigungsfirma',
    'Haushaltsreinigung',
    'Büroreinigung',
    'Unterhaltsreinigung',
    'Grundreinigung',
    'Sonderreinigung',
    'Reinigungsservice',
    'Reinigungsmittel',
    'Köln',
    'Datenschutzerklärung',
    'Impressum',
    'Kontaktformular',
    'Terminvereinbarung',
    'Dienstleistungen',
    'Angebot',
    'Preise',
    'Kundenservice',
    'Qualitätsgarantie',
    'Kundenzufriedenheit',
    'Anfahrt',
    'Beratung',
    'Erfahrung',
    'Zuverlässigkeit',
    'Pünktlichkeit',
    'Teamarbeit',
    'Vertragsbedingungen',
    'Zahlungsbedingungen',
    'Servicezeiten',
    'Zufriedenheitsgarantie',
    'Rückruf',
    'kostenlos',
    'unverbindlich',
    'professionell'
  ]
};

/**
 * Extract text content from TSX/JSX files
 * This is a simplified parser and may not catch all text
 */
function extractTextFromReactFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const textContent = [];
  
  // Extract text from JSX components
  // Look for text within quotes in attributes like title, alt, placeholder
  const attrRegex = /(title|alt|aria-label|placeholder|label)=["']([^"']+)["']/g;
  let attrMatch;
  while ((attrMatch = attrRegex.exec(content)) !== null) {
    textContent.push(attrMatch[2]);
  }
  
  // Look for text directly in JSX
  // This is a simplified approach and may include some code
  const jsxTextRegex = />(.*?)</g;
  let textMatch;
  while ((textMatch = jsxTextRegex.exec(content)) !== null) {
    const text = textMatch[1].trim();
    if (text.length > 0 && !text.startsWith('{') && !text.includes('function(')) {
      textContent.push(text);
    }
  }
  
  // Extract text from string variables
  // Look for string assignments
  const strVarRegex = /["']([^"']+)["']/g;
  let strMatch;
  while ((strMatch = strVarRegex.exec(content)) !== null) {
    // Filter out things that are likely not display text (e.g., imports, paths)
    const text = strMatch[1].trim();
    if (
      text.length > 3 && 
      !text.includes('./') && 
      !text.includes('../') && 
      !text.includes('http') && 
      !text.includes('import ') && 
      !text.includes('from ')
    ) {
      textContent.push(text);
    }
  }
  
  return textContent;
}

/**
 * Find all files to check
 */
function findFilesToCheck(rootDir) {
  const files = [];
  
  for (const dir of config.contentDirs) {
    const dirPath = path.join(rootDir, dir);
    if (!fs.existsSync(dirPath)) {
      console.warn(`Directory not found: ${dirPath}`);
      continue;
    }
    
    // Get all files in the directory
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
      // Recursively search subdirectories, but skip node_modules and other unwanted dirs
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
 * Set up the spell checker
 */
function setupSpellChecker() {
  // Add ignore words to dictionary
  for (const word of config.ignoreWords) {
    SpellChecker.add(word);
  }
  
  // Add additional domain-specific words
  for (const word of config.additionalWords) {
    SpellChecker.add(word);
  }
  
  return SpellChecker;
}

/**
 * Check spelling in a text
 */
function checkSpelling(text, spellChecker, fileName) {
  let misspelledWords = [];
  
  // Split text into words
  // This captures German umlauts and most punctuation
  const words = text.split(/[ \t\n,.!?;:()\[\]"'«»–—]/g)
    .map(word => word.trim())
    .filter(word => word.length > 0);
  
  for (const word of words) {
    // Skip words that are likely code or non-words
    if (
      word.length <= 1 ||
      word.startsWith('{') ||
      word.includes('}') ||
      word.startsWith('<') ||
      word.includes('/>') ||
      word.includes('=') ||
      word === 'true' ||
      word === 'false' ||
      word === 'null' ||
      word === 'undefined' ||
      /^\d+$/.test(word) || // Numbers
      /^[A-Z0-9_]+$/.test(word) // Constants like MAX_VALUE
    ) {
      continue;
    }
    
    // Check if word is misspelled
    if (spellChecker.isMisspelled(word)) {
      const suggestions = spellChecker.getCorrectionsForMisspelling(word).slice(0, 3);
      misspelledWords.push({
        word,
        suggestions,
        fileName
      });
    }
  }
  
  return misspelledWords;
}

/**
 * Check spelling in all files
 */
function checkAllFiles() {
  const rootDir = path.resolve(__dirname, '..');
  const files = findFilesToCheck(rootDir);
  
  console.log(`Found ${files.length} files to check.`);
  
  const spellChecker = setupSpellChecker();
  let allMisspelledWords = [];
  
  for (const file of files) {
    const relativeFile = path.relative(rootDir, file);
    console.log(`Checking file: ${relativeFile}`);
    
    const textContent = extractTextFromReactFile(file);
    
    for (const text of textContent) {
      const misspelled = checkSpelling(text, spellChecker, relativeFile);
      allMisspelledWords.push(...misspelled);
    }
  }
  
  return allMisspelledWords;
}

/**
 * Main function
 */
function main() {
  console.log('=== BenFresh Website Content Spell Checker ===');
  console.log('Checking website content for spelling errors...');
  
  try {
    const misspelledWords = checkAllFiles();
    
    // Group by file
    const byFile = {};
    for (const entry of misspelledWords) {
      if (!byFile[entry.fileName]) {
        byFile[entry.fileName] = [];
      }
      byFile[entry.fileName].push(entry);
    }
    
    console.log('\n=== Spell Check Results ===');
    
    if (misspelledWords.length === 0) {
      console.log('No spelling errors found. All content looks correct!');
    } else {
      console.log(`Found ${misspelledWords.length} potential spelling errors:`);
      
      // Print results by file
      for (const [file, words] of Object.entries(byFile)) {
        console.log(`\nFile: ${file}`);
        console.log('-'.repeat(file.length + 6));
        
        // Print unique words for this file
        const uniqueWords = {};
        for (const entry of words) {
          if (!uniqueWords[entry.word]) {
            uniqueWords[entry.word] = entry.suggestions;
          }
        }
        
        for (const [word, suggestions] of Object.entries(uniqueWords)) {
          console.log(`- "${word}" (Suggestions: ${suggestions.join(', ') || 'None'})`);
        }
      }
      
      console.log('\nNote: Some technical terms and brand names may be incorrectly flagged.');
      console.log('You can add domain-specific words to the ignoreWords list in the script config.');
    }
  } catch (error) {
    console.error('Error checking spelling:', error);
  }
}

// Run the main function
main();
