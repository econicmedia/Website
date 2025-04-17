/**
 * BenFresh Website Backup Script
 * 
 * This script creates a backup of the BenFresh website, including:
 * - Source code
 * - Public assets
 * - Environment configuration
 * - Package dependencies list
 * 
 * Usage: 
 * node backup.js [destination]
 * 
 * If destination is not provided, the backup will be created in the "backups" directory
 */

const fs = require('fs-extra');
const path = require('path');
const archiver = require('archiver');
const { execSync } = require('child_process');

// Configuration
const config = {
  // Directories to include in the backup
  includeDirs: [
    'src',
    'public',
    '.github',
    'scripts'
  ],
  // Files to include in the backup
  includeFiles: [
    'package.json',
    'package-lock.json',
    'next.config.ts',
    'tailwind.config.js',
    'postcss.config.mjs',
    'tsconfig.json',
    'README.md',
    'DOCUMENTATION.md',
    '.env.example' // Not .env.local to avoid backing up sensitive data
  ],
  // Directories to exclude
  excludeDirs: [
    'node_modules',
    '.next',
    'out',
    'backups'
  ],
  // Default backup directory
  defaultBackupDir: 'backups'
};

/**
 * Create a backup of the website
 */
async function createBackup() {
  try {
    // Get destination directory from command line args or use default
    const destDir = process.argv[2] || config.defaultBackupDir;
    
    // Create backup directory if it doesn't exist
    const rootDir = path.resolve(__dirname, '..');
    const backupDir = path.resolve(rootDir, destDir);
    
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
      console.log(`Created backup directory: ${backupDir}`);
    }
    
    // Create timestamp for the backup filename
    const now = new Date();
    const timestamp = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}_${now.getHours().toString().padStart(2, '0')}-${now.getMinutes().toString().padStart(2, '0')}`;
    const backupFilename = `benfresh-backup_${timestamp}.zip`;
    const backupPath = path.join(backupDir, backupFilename);
    
    // Create a file to stream archive data to
    const output = fs.createWriteStream(backupPath);
    const archive = archiver('zip', {
      zlib: { level: 9 } // Maximum compression
    });
    
    // Listen for warnings
    archive.on('warning', (err) => {
      if (err.code === 'ENOENT') {
        console.warn('Warning during backup:', err);
      } else {
        throw err;
      }
    });
    
    // Listen for errors
    archive.on('error', (err) => {
      throw err;
    });
    
    // Pipe archive data to the file
    archive.pipe(output);
    
    // Add directories to the archive
    for (const dir of config.includeDirs) {
      const dirPath = path.join(rootDir, dir);
      if (fs.existsSync(dirPath)) {
        archive.directory(dirPath, dir);
        console.log(`Added directory: ${dir}`);
      } else {
        console.warn(`Directory not found: ${dir}`);
      }
    }
    
    // Add individual files to the archive
    for (const file of config.includeFiles) {
      const filePath = path.join(rootDir, file);
      if (fs.existsSync(filePath)) {
        archive.file(filePath, { name: file });
        console.log(`Added file: ${file}`);
      } else {
        console.warn(`File not found: ${file}`);
      }
    }
    
    // Create and add package list
    try {
      const packageList = execSync('npm list --depth=0', { cwd: rootDir }).toString();
      archive.append(packageList, { name: 'package-list.txt' });
      console.log('Added package list');
    } catch (err) {
      console.warn('Could not generate package list:', err.message);
    }
    
    // Finalize the archive
    await archive.finalize();
    
    // Wait for the output stream to finish
    await new Promise((resolve) => {
      output.on('close', () => {
        console.log(`\nBackup created successfully: ${backupPath}`);
        console.log(`Total size: ${(archive.pointer() / 1024 / 1024).toFixed(2)} MB`);
        resolve();
      });
    });
    
    return backupPath;
  } catch (err) {
    console.error('Error creating backup:', err);
    throw err;
  }
}

/**
 * Main function
 */
async function main() {
  try {
    console.log('=== BenFresh Website Backup ===');
    console.log(`Starting backup process at ${new Date().toLocaleString()}`);
    
    const backupPath = await createBackup();
    
    console.log('\nBackup Summary:');
    console.log('---------------');
    console.log(`Backup file: ${path.basename(backupPath)}`);
    console.log(`Location: ${path.dirname(backupPath)}`);
    console.log(`Time: ${new Date().toLocaleString()}`);
    console.log('\nBackup completed successfully!');
  } catch (err) {
    console.error('\nBackup failed!', err);
    process.exit(1);
  }
}

// Run the main function
main();
