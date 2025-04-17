/**
 * BenFresh Website SSL Certificate Setup Helper
 * 
 * This script helps set up SSL certificates for the BenFresh website,
 * providing instructions for various hosting platforms including:
 * - Vercel
 * - Netlify
 * - Custom server with Let's Encrypt
 * 
 * Usage: node setup-ssl.js [domain] [hosting]
 * 
 * Example: node setup-ssl.js benfresh.de vercel
 */

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');
const os = require('os');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Configuration
const config = {
  // Supported hosting platforms
  hostingPlatforms: ['vercel', 'netlify', 'custom'],
  
  // Default domain if not provided
  defaultDomain: 'benfresh.de',
  
  // SSL certificate configuration
  certificates: {
    // Path to store certificates locally
    localPath: path.join(os.homedir(), '.ssl', 'benfresh'),
    
    // Let's Encrypt settings
    letsEncrypt: {
      email: 'info@benfresh.de',
      stagingFlag: '--staging', // Remove for production
    },
  },
};

/**
 * Ask user for input
 */
function askQuestion(question) {
  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      resolve(answer);
    });
  });
}

/**
 * Show instructions for Vercel hosting
 */
function showVercelInstructions(domain) {
  console.log(`\n=== SSL Setup Instructions for Vercel ===\n`);
  console.log(`Vercel automatically provisions SSL certificates for all domains.`);
  console.log(`Follow these steps to set up your domain and SSL on Vercel:\n`);
  
  console.log(`1. Log in to your Vercel account`);
  console.log(`2. Select your BenFresh project`);
  console.log(`3. Go to "Settings" > "Domains"`);
  console.log(`4. Add your domain: ${domain}`);
  console.log(`5. Follow Vercel's instructions to verify domain ownership`);
  console.log(`   - This usually involves adding DNS records to your domain provider`);
  console.log(`6. Once verified, Vercel will automatically provision an SSL certificate`);
  console.log(`7. SSL certificate will be automatically renewed by Vercel\n`);
  
  console.log(`Additional tips:`);
  console.log(`- Add both "www.${domain}" and "${domain}" for complete coverage`);
  console.log(`- Vercel provides automated redirects between domains`);
  console.log(`- You can enforce HTTPS in your Next.js config\n`);
  
  console.log(`For more information, visit: https://vercel.com/docs/projects/domains/add-a-domain`);
}

/**
 * Show instructions for Netlify hosting
 */
function showNetlifyInstructions(domain) {
  console.log(`\n=== SSL Setup Instructions for Netlify ===\n`);
  console.log(`Netlify automatically provisions SSL certificates for all domains.`);
  console.log(`Follow these steps to set up your domain and SSL on Netlify:\n`);
  
  console.log(`1. Log in to your Netlify account`);
  console.log(`2. Select your BenFresh project`);
  console.log(`3. Go to "Settings" > "Domain management"`);
  console.log(`4. Click "Add custom domain" and enter: ${domain}`);
  console.log(`5. Follow Netlify's instructions to verify domain ownership`);
  console.log(`   - This usually involves adding DNS records or using Netlify DNS`);
  console.log(`6. Once verified, Netlify will automatically provision an SSL certificate`);
  console.log(`7. SSL certificate will be automatically renewed by Netlify\n`);
  
  console.log(`Additional tips:`);
  console.log(`- Netlify provides free managed DNS if you want to transfer your domain`);
  console.log(`- You can enable "Force HTTPS" in the domain settings`);
  console.log(`- For the best performance, use Netlify DNS\n`);
  
  console.log(`For more information, visit: https://docs.netlify.com/domains-https/custom-domains/`);
}

/**
 * Check if Certbot is installed
 */
function checkCertbotInstallation() {
  try {
    execSync('certbot --version', { stdio: 'pipe' });
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * Show instructions for custom server with Let's Encrypt
 */
async function showCustomServerInstructions(domain) {
  console.log(`\n=== SSL Setup Instructions for Custom Server ===\n`);
  
  // Check if certbot is installed
  const certbotInstalled = checkCertbotInstallation();
  
  if (!certbotInstalled) {
    console.log(`Certbot not found. You'll need to install Certbot to generate SSL certificates with Let's Encrypt.`);
    console.log(`Installation instructions can be found at: https://certbot.eff.org/\n`);
  }
  
  console.log(`Option 1: Using Let's Encrypt with Certbot`);
  console.log(`-----------------------------------------\n`);
  
  console.log(`1. SSH into your server`);
  console.log(`2. Install Certbot if not already installed`);
  console.log(`   For Ubuntu/Debian: sudo apt-get update && sudo apt-get install certbot`);
  console.log(`   For CentOS/RHEL: sudo yum install certbot`);
  console.log(`3. Generate certificates using one of these methods:\n`);
  
  console.log(`   For Nginx:`);
  console.log(`   sudo certbot --nginx -d ${domain} -d www.${domain}`);
  
  console.log(`   For Apache:`);
  console.log(`   sudo certbot --apache -d ${domain} -d www.${domain}`);
  
  console.log(`   Standalone mode (if you don't have a web server running):`);
  console.log(`   sudo certbot certonly --standalone -d ${domain} -d www.${domain}\n`);
  
  console.log(`4. Follow the prompts to complete the setup`);
  console.log(`5. Certbot will handle automatic renewals via a cron job\n`);
  
  console.log(`Option 2: Manual installation with SSL certificates`);
  console.log(`-------------------------------------------------\n`);
  
  console.log(`If you've purchased SSL certificates, follow these steps:`);
  console.log(`1. Upload your certificate files to your server`);
  console.log(`2. Configure your web server to use the certificates\n`);
  
  console.log(`For Nginx, add the following to your server block:`);
  console.log(`   server {`);
  console.log(`       listen 443 ssl;`);
  console.log(`       server_name ${domain} www.${domain};`);
  console.log(`       ssl_certificate /path/to/certificate.crt;`);
  console.log(`       ssl_certificate_key /path/to/private.key;`);
  console.log(`       # ... rest of your configuration`);
  console.log(`   }`);
  
  console.log(`\nFor Apache, add the following to your virtual host:`);
  console.log(`   <VirtualHost *:443>`);
  console.log(`       ServerName ${domain}`);
  console.log(`       ServerAlias www.${domain}`);
  console.log(`       SSLEngine on`);
  console.log(`       SSLCertificateFile /path/to/certificate.crt`);
  console.log(`       SSLCertificateKeyFile /path/to/private.key`);
  console.log(`       # ... rest of your configuration`);
  console.log(`   </VirtualHost>`);
  
  console.log(`\n3. Test your configuration and restart your web server`);
  console.log(`4. Don't forget to set up automatic renewals if applicable\n`);
  
  console.log(`Important: Make sure ports 80 and 443 are open in your firewall.`);
  
  // Offer to run certbot command
  if (certbotInstalled) {
    const runCertbot = await askQuestion('\nWould you like to run Certbot now to generate certificates? (y/n): ');
    
    if (runCertbot.toLowerCase() === 'y') {
      console.log('\nRunning Certbot in dry-run mode to test the setup...');
      console.log('(This won\'t actually generate certificates, it\'s just a test)\n');
      
      try {
        const certbotOutput = execSync(
          `certbot certonly --standalone --dry-run ${config.certificates.letsEncrypt.stagingFlag} -d ${domain} -d www.${domain} --agree-tos -m ${config.certificates.letsEncrypt.email} --no-eff-email`,
          { stdio: 'pipe' }
        ).toString();
        
        console.log('Certbot dry-run successful!');
        console.log('To generate real certificates, run:');
        console.log(`certbot certonly --standalone -d ${domain} -d www.${domain} --agree-tos -m ${config.certificates.letsEncrypt.email}\n`);
      } catch (error) {
        console.error('Certbot dry-run failed:', error.message);
        console.log('\nThere might be issues with your setup. Please try manually after resolving any issues.');
      }
    }
  }
}

/**
 * Create a sample SSL configuration file
 */
function createSampleSSLConfig(domain, hosting) {
  try {
    const configDir = path.join(__dirname, '..', 'ssl-config');
    if (!fs.existsSync(configDir)) {
      fs.mkdirSync(configDir, { recursive: true });
    }
    
    const nginxConfigPath = path.join(configDir, 'nginx-ssl.conf');
    const nginxConfig = `
server {
    listen 80;
    server_name ${domain} www.${domain};
    return 301 https://$host$request_uri;
}

server {
    listen 443 ssl http2;
    server_name ${domain} www.${domain};
    
    root /var/www/benfresh/public;
    index index.html;
    
    # SSL Configuration
    ssl_certificate /etc/letsencrypt/live/${domain}/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/${domain}/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers on;
    ssl_ciphers ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384:ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:DHE-RSA-AES128-GCM-SHA256:DHE-RSA-AES256-GCM-SHA384;
    
    # HSTS (optional but recommended)
    add_header Strict-Transport-Security "max-age=63072000; includeSubDomains; preload";
    
    # Other security headers
    add_header X-Content-Type-Options nosniff;
    add_header X-Frame-Options SAMEORIGIN;
    add_header X-XSS-Protection "1; mode=block";
    
    # For Next.js
    location /_next/ {
        alias /var/www/benfresh/.next/;
        expires 30d;
        access_log off;
    }
    
    location / {
        try_files $uri $uri/ =404;
    }
}
`;
    
    fs.writeFileSync(nginxConfigPath, nginxConfig);
    
    const apacheConfigPath = path.join(configDir, 'apache-ssl.conf');
    const apacheConfig = `
<VirtualHost *:80>
    ServerName ${domain}
    ServerAlias www.${domain}
    Redirect permanent / https://${domain}/
</VirtualHost>

<VirtualHost *:443>
    ServerName ${domain}
    ServerAlias www.${domain}
    DocumentRoot /var/www/benfresh/public
    
    # SSL Configuration
    SSLEngine on
    SSLCertificateFile /etc/letsencrypt/live/${domain}/fullchain.pem
    SSLCertificateKeyFile /etc/letsencrypt/live/${domain}/privkey.pem
    SSLProtocol all -SSLv2 -SSLv3 -TLSv1 -TLSv1.1
    SSLHonorCipherOrder on
    SSLCompression off
    
    # HSTS (optional but recommended)
    Header always set Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
    
    # Other security headers
    Header always set X-Content-Type-Options nosniff
    Header always set X-Frame-Options SAMEORIGIN
    Header always set X-XSS-Protection "1; mode=block"
    
    <Directory /var/www/benfresh/public>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
    
    # For Next.js static assets
    <Directory /var/www/benfresh/.next>
        Options -Indexes +FollowSymLinks
        AllowOverride None
        Require all granted
    </Directory>
</VirtualHost>
`;
    
    fs.writeFileSync(apacheConfigPath, apacheConfig);
    
    const nextJsConfigPath = path.join(configDir, 'next-config-ssl.js');
    const nextJsConfig = `
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Force all requests to use HTTPS
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          }
        ],
      },
    ]
  },
  // Redirect HTTP to HTTPS
  async redirects() {
    return [
      {
        source: '/(.*)',
        has: [
          {
            type: 'header',
            key: 'x-forwarded-proto',
            value: 'http'
          }
        ],
        permanent: true,
        destination: 'https://${domain}/:1',
      }
    ]
  },
};

module.exports = nextConfig;
`;
    
    fs.writeFileSync(nextJsConfigPath, nextJsConfig);
    
    console.log(`\nSample configuration files created in ${configDir}:`);
    console.log(`- Nginx configuration: nginx-ssl.conf`);
    console.log(`- Apache configuration: apache-ssl.conf`);
    console.log(`- Next.js configuration: next-config-ssl.js`);
  } catch (error) {
    console.error('Error creating sample configuration files:', error.message);
  }
}

/**
 * Main function
 */
async function main() {
  console.log('=== BenFresh Website SSL Certificate Setup Helper ===\n');
  
  try {
    // Get domain from command line args or use default
    let domain = process.argv[2] || config.defaultDomain;
    
    // If domain not provided via args, ask user
    if (!domain) {
      domain = await askQuestion('Enter your domain name (e.g., benfresh.de): ');
      if (!domain) {
        domain = config.defaultDomain;
      }
    }
    
    // Get hosting platform from command line args or ask user
    let hosting = process.argv[3] || '';
    if (!hosting || !config.hostingPlatforms.includes(hosting.toLowerCase())) {
      console.log('\nSupported hosting platforms:');
      
      config.hostingPlatforms.forEach((platform, index) => {
        console.log(`${index + 1}. ${platform}`);
      });
      
      const hostingChoice = await askQuestion('\nSelect your hosting platform (1-3): ');
      const hostingIndex = parseInt(hostingChoice, 10) - 1;
      
      if (hostingIndex >= 0 && hostingIndex < config.hostingPlatforms.length) {
        hosting = config.hostingPlatforms[hostingIndex];
      } else {
        console.log('Invalid choice, defaulting to custom server.');
        hosting = 'custom';
      }
    }
    
    // Display appropriate instructions based on hosting platform
    console.log(`\nSetting up SSL for ${domain} on ${hosting}...`);
    
    switch (hosting.toLowerCase()) {
      case 'vercel':
        showVercelInstructions(domain);
        break;
      case 'netlify':
        showNetlifyInstructions(domain);
        break;
      case 'custom':
      default:
        await showCustomServerInstructions(domain);
        break;
    }
    
    // Create sample configuration files
    createSampleSSLConfig(domain, hosting);
    
    console.log('\n=== SSL Setup Complete ===');
    console.log(`Follow the instructions above to set up SSL for ${domain} on ${hosting}.`);
    console.log('Remember to test your SSL configuration after setup using:');
    console.log(`- https://www.ssllabs.com/ssltest/analyze.html?d=${domain}`);
    console.log('- https://securityheaders.com/?q=' + encodeURIComponent(`https://${domain}`));
  } catch (error) {
    console.error('Error setting up SSL:', error);
  } finally {
    rl.close();
  }
}

// Run the main function
main();
