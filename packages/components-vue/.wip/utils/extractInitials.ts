/**
 * Extract initials from a name string
 *
 * @param name - Full name or username
 * @param maxLength - Maximum number of initials (default: 2)
 * @returns Uppercase initials
 *
 * @example
 * extractInitials('John Doe') // 'JD'
 * extractInitials('Alice') // 'A'
 * extractInitials('Mary Jane Watson', 2) // 'MW'
 * extractInitials('') // '?'
 */
export function extractInitials(name: string, maxLength = 2): string {
  if (!name || typeof name !== 'string') {
    return '?'
  }

  const trimmed = name.trim()

  if (trimmed.length === 0) {
    return '?'
  }

  // Split by spaces and filter empty strings
  const words = trimmed.split(/\s+/).filter(Boolean)

  if (words.length === 0) {
    return '?'
  }

  // If single word, take first 1-2 characters
  if (words.length === 1) {
    const word = words[0]!
    return word.substring(0, Math.min(maxLength, word.length)).toUpperCase()
  }

  // Multiple words: take first character of first N words
  const initials = words
    .slice(0, maxLength)
    .map((word) => word[0])
    .filter(Boolean)
    .join('')
    .toUpperCase()

  return initials || '?'
}
