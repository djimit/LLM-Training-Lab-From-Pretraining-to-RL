/**
 * HTML Sanitization Utilities
 * Prevents XSS attacks by sanitizing user-generated and API response content
 */

/**
 * Escapes HTML special characters to prevent XSS
 * @param text - The text to sanitize
 * @returns Sanitized text safe for rendering
 */
export function escapeHtml(text: string): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  const htmlEscapes: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  };

  return text.replace(/[&<>"'`=/]/g, (char) => htmlEscapes[char] ?? char);
}

/**
 * Sanitizes text for safe display, preserving line breaks
 * @param text - The text to sanitize
 * @returns Array of sanitized paragraphs
 */
export function sanitizeForDisplay(text: string): string[] {
  if (!text || typeof text !== 'string') {
    return [];
  }

  return text
    .split('\n')
    .map(line => escapeHtml(line.trim()))
    .filter(line => line.length > 0);
}

/**
 * Validates and sanitizes a URL
 * Only allows http, https protocols
 * @param url - The URL to validate
 * @returns Sanitized URL or empty string if invalid
 */
export function sanitizeUrl(url: string): string {
  if (!url || typeof url !== 'string') {
    return '';
  }

  try {
    const parsed = new URL(url);
    if (!['http:', 'https:'].includes(parsed.protocol)) {
      return '';
    }
    return parsed.href;
  } catch {
    return '';
  }
}

/**
 * Truncates text to a maximum length with ellipsis
 * @param text - The text to truncate
 * @param maxLength - Maximum length (default 500)
 * @returns Truncated text
 */
export function truncateText(text: string, maxLength = 500): string {
  if (!text || typeof text !== 'string') {
    return '';
  }

  if (text.length <= maxLength) {
    return text;
  }

  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Checks if a string contains potentially dangerous content
 * @param text - The text to check
 * @returns True if potentially dangerous
 */
export function containsDangerousContent(text: string): boolean {
  if (!text || typeof text !== 'string') {
    return false;
  }

  const dangerousPatterns = [
    /<script/i,
    /javascript:/i,
    /on\w+\s*=/i, // onclick=, onerror=, etc.
    /data:\s*text\/html/i,
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /<form/i,
  ];

  return dangerousPatterns.some(pattern => pattern.test(text));
}
