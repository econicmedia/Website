/**
 * Accessibility Checker Utility
 * 
 * This utility helps identify and fix common accessibility issues according to WCAG standards.
 * It can be used during development or in production to ensure compliance.
 */

// Type declaration for global window object
declare global {
  interface Window {
    checkAccessibility?: {
      runChecks: () => void;
      checkHeadingHierarchy: () => AccessibilityIssue[];
      checkImagesAltText: () => AccessibilityIssue[];
      checkColorContrast: () => AccessibilityIssue[];
      checkKeyboardAccess: () => AccessibilityIssue[];
      checkFormLabels: () => AccessibilityIssue[];
    };
  }
}

export interface AccessibilityIssue {
  element: string;
  description: string;
  wcagCriteria: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  suggestion: string;
}

/**
 * Checks for common heading hierarchy issues
 * (WCAG 1.3.1: Info and Relationships)
 */
export function checkHeadingHierarchy(): AccessibilityIssue[] {
  const issues: AccessibilityIssue[] = [];
  
  if (typeof document === 'undefined') return issues;

  // Get all headings
  const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
  let prevLevel = 0;
  
  headings.forEach((heading) => {
    const level = parseInt(heading.tagName.substring(1), 10);
    
    // Check for skipped heading levels
    if (prevLevel > 0 && level > prevLevel + 1) {
      issues.push({
        element: heading.outerHTML,
        description: `Skipped heading level: ${heading.tagName} after ${prevLevel > 0 ? 'h' + prevLevel : 'no heading'}`,
        wcagCriteria: '1.3.1 Info and Relationships (Level A)',
        severity: 'medium',
        suggestion: `Consider using h${prevLevel + 1} instead of ${heading.tagName}, or add missing heading levels.`
      });
    }
    
    prevLevel = level;
  });
  
  return issues;
}

/**
 * Checks for images without alt text
 * (WCAG 1.1.1: Non-text Content)
 */
export function checkImagesAltText(): AccessibilityIssue[] {
  const issues: AccessibilityIssue[] = [];
  
  if (typeof document === 'undefined') return issues;
  
  const images = Array.from(document.querySelectorAll('img'));
  
  images.forEach((img) => {
    const alt = img.getAttribute('alt');
    
    if (alt === null) {
      issues.push({
        element: img.outerHTML,
        description: 'Image missing alt attribute',
        wcagCriteria: '1.1.1 Non-text Content (Level A)',
        severity: 'critical',
        suggestion: 'Add descriptive alt text to the image, or empty alt if decorative.'
      });
    } else if (alt === '') {
      // Empty alt is valid for decorative images, but let's flag it for review
      issues.push({
        element: img.outerHTML,
        description: 'Image has empty alt text (may be ok if decorative)',
        wcagCriteria: '1.1.1 Non-text Content (Level A)',
        severity: 'low',
        suggestion: 'Confirm this image is decorative. If not, add descriptive alt text.'
      });
    }
  });
  
  return issues;
}

/**
 * Checks for sufficient color contrast
 * (WCAG 1.4.3: Contrast)
 * Note: This is a simplified check and may not catch all contrast issues
 */
export function checkColorContrast(): AccessibilityIssue[] {
  const issues: AccessibilityIssue[] = [];
  
  // In a real implementation, this would use something like the WCAG contrast algorithm
  // For demonstration purposes, this is a simplified version
  
  if (typeof document === 'undefined') return issues;
  
  const textElements = Array.from(document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, a, button, label'));
  
  // This is just a placeholder as actual contrast checking requires computed styles and color calculations
  const suspiciousClasses = [
    'text-gray-400', 'text-gray-300', 'text-gray-200', 
    'text-white bg-gray-100', 'text-white bg-gray-200', 
    'text-gray-700 bg-gray-600'
  ];
  
  textElements.forEach((el) => {
    const classList = Array.from(el.classList);
    
    suspiciousClasses.forEach(className => {
      if (classList.includes(className)) {
        issues.push({
          element: el.outerHTML,
          description: `Potentially insufficient color contrast with class: ${className}`,
          wcagCriteria: '1.4.3 Contrast (Minimum) (Level AA)',
          severity: 'high',
          suggestion: 'Ensure text has a contrast ratio of at least 4.5:1 against its background.'
        });
      }
    });
  });
  
  return issues;
}

/**
 * Checks for interactive elements without keyboard access
 * (WCAG 2.1.1: Keyboard)
 */
export function checkKeyboardAccess(): AccessibilityIssue[] {
  const issues: AccessibilityIssue[] = [];
  
  if (typeof document === 'undefined') return issues;
  
  // Check for divs or spans with click handlers but no keyboard event handlers
  const elements = Array.from(document.querySelectorAll('div[onclick], span[onclick], div[role="button"], span[role="button"]'));
  
  elements.forEach((el) => {
    const hasTabIndex = el.hasAttribute('tabindex');
    const hasKeydownHandler = el.hasAttribute('onkeydown') || el.hasAttribute('onkeypress');
    
    if (!hasTabIndex || !hasKeydownHandler) {
      issues.push({
        element: el.outerHTML,
        description: 'Interactive element not fully keyboard accessible',
        wcagCriteria: '2.1.1 Keyboard (Level A)',
        severity: 'critical',
        suggestion: `Add tabindex="0" and a keydown event handler to ensure keyboard accessibility.`
      });
    }
  });
  
  return issues;
}

/**
 * Checks form fields for missing labels
 * (WCAG 3.3.2: Labels or Instructions)
 */
export function checkFormLabels(): AccessibilityIssue[] {
  const issues: AccessibilityIssue[] = [];
  
  if (typeof document === 'undefined') return issues;
  
  const formFields = Array.from(document.querySelectorAll('input, textarea, select'));
  
  formFields.forEach((field) => {
    if (field.getAttribute('type') === 'hidden') return;
    
    const id = field.getAttribute('id');
    let hasLabel = false;
    
    if (id) {
      // Check for associated label
      const associatedLabel = document.querySelector(`label[for="${id}"]`);
      hasLabel = !!associatedLabel;
    } else {
      // Check for wrapping label
      hasLabel = field.closest('label') !== null;
    }
    
    // Check for aria-label as an alternative
    const ariaLabel = field.getAttribute('aria-label');
    const ariaLabelledBy = field.getAttribute('aria-labelledby');
    
    if (!hasLabel && !ariaLabel && !ariaLabelledBy) {
      issues.push({
        element: field.outerHTML,
        description: 'Form field missing associated label',
        wcagCriteria: '3.3.2 Labels or Instructions (Level A)',
        severity: 'high',
        suggestion: `Add a label with a matching 'for' attribute, or an aria-label attribute.`
      });
    }
  });
  
  return issues;
}

/**
 * Run all accessibility checks
 */
export function runAllChecks(): AccessibilityIssue[] {
  return [
    ...checkHeadingHierarchy(),
    ...checkImagesAltText(),
    ...checkColorContrast(),
    ...checkKeyboardAccess(),
    ...checkFormLabels()
  ];
}

/**
 * Helper function to run checks in client-side code and log results
 */
export function logAccessibilityIssues(): void {
  if (typeof document === 'undefined') return;
  
  const issues = runAllChecks();
  
  if (issues.length === 0) {
    console.log('✅ No accessibility issues detected.');
    return;
  }
  
  console.group(`🔍 Found ${issues.length} potential accessibility issues:`);
  
  // Group by severity
  const criticalIssues = issues.filter(issue => issue.severity === 'critical');
  const highIssues = issues.filter(issue => issue.severity === 'high');
  const mediumIssues = issues.filter(issue => issue.severity === 'medium');
  const lowIssues = issues.filter(issue => issue.severity === 'low');
  
  if (criticalIssues.length > 0) {
    console.group(`❌ Critical (${criticalIssues.length}):`);
    criticalIssues.forEach(issue => {
      console.log(`- ${issue.description} (${issue.wcagCriteria})`);
      console.log(`  Element: ${issue.element}`);
      console.log(`  Suggestion: ${issue.suggestion}`);
    });
    console.groupEnd();
  }
  
  if (highIssues.length > 0) {
    console.group(`⚠️ High (${highIssues.length}):`);
    highIssues.forEach(issue => {
      console.log(`- ${issue.description} (${issue.wcagCriteria})`);
      console.log(`  Element: ${issue.element}`);
      console.log(`  Suggestion: ${issue.suggestion}`);
    });
    console.groupEnd();
  }
  
  if (mediumIssues.length > 0) {
    console.group(`⚠️ Medium (${mediumIssues.length}):`);
    mediumIssues.forEach(issue => {
      console.log(`- ${issue.description} (${issue.wcagCriteria})`);
      console.log(`  Element: ${issue.element}`);
      console.log(`  Suggestion: ${issue.suggestion}`);
    });
    console.groupEnd();
  }
  
  if (lowIssues.length > 0) {
    console.group(`ℹ️ Low (${lowIssues.length}):`);
    lowIssues.forEach(issue => {
      console.log(`- ${issue.description} (${issue.wcagCriteria})`);
      console.log(`  Element: ${issue.element}`);
      console.log(`  Suggestion: ${issue.suggestion}`);
    });
    console.groupEnd();
  }
  
  console.groupEnd();
}

/**
 * Run accessibility checks on page load 
 * (only in development mode)
 */
export function initAccessibilityChecker(): void {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') return;
  
  window.addEventListener('DOMContentLoaded', () => {
    // Give the page a moment to fully render, especially for client-side rendered apps
    setTimeout(() => {
      logAccessibilityIssues();
    }, 1000);
  });

  // Also expose the utility globally in development
  (window as Window).checkAccessibility = {
    runChecks: logAccessibilityIssues,
    checkHeadingHierarchy,
    checkImagesAltText,
    checkColorContrast,
    checkKeyboardAccess,
    checkFormLabels
  };
}
