/**
 * Shared validation helpers for contact/request forms.
 * Used on both client (inline errors) and server (action-side guard).
 */

/**
 * Validates email format only — does NOT check if the mailbox exists.
 * Requires: local@domain.tld where tld is at least 2 chars.
 * Rejects: test@, @gmail.com, test, test@gmail
 */
export function isValidEmail(email: string): boolean {
  // Must have local part, @, domain with dot, and tld of 2+ chars
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

/**
 * Validates phone number format.
 * Accepts:
 *   - E.164 from PhoneInputField: +919876543210
 *   - Legacy formats: +1 234 567 8900, (555) 123-4567, etc.
 * Requires at least 6 digits total.
 * Empty / whitespace-only is treated as valid (optional field).
 */
export function isValidPhone(phone: string): boolean {
  const trimmed = phone.trim();
  if (!trimmed) return true; // optional field — empty is fine
  // Must contain only: digits, +, spaces, hyphens, parentheses, dots
  if (!/^[+\d\s\-().]+$/.test(trimmed)) return false;
  // Must have at least 6 digits
  const digits = trimmed.replace(/\D/g, '');
  return digits.length >= 6;
}

/**
 * Strips any character not valid in a phone field as the user types.
 * Allows: digits, +, spaces, hyphens, parentheses.
 * + is only allowed as the very first character.
 */
export function sanitizePhoneInput(value: string): string {
  // Allow + only at start, then only digits/spaces/hyphens/parens
  let result = '';
  for (let i = 0; i < value.length; i++) {
    const ch = value[i];
    if (i === 0 && ch === '+') {
      result += ch;
    } else if (/[\d\s\-().]/.test(ch)) {
      result += ch;
    }
    // Drop anything else silently
  }
  return result;
}
